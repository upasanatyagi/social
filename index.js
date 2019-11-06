const express = require("express");

const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server, { origins: "localhost:8080" });

const compression = require("compression");
const db = require("./database");
const cookieSession = require("cookie-session");
const bcrypt = require("./bcrypt");
const csurf = require("csurf");
const multer = require("multer");
const uidSafe = require("uid-safe");
const path = require("path");
const { s3Url } = require("./config");
const s3 = require("./s3");

const diskStorage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    filename: function(req, file, callback) {
        uidSafe(24).then(function(uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    }
});

const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152
    }
});

app.use(express.static("./public"));

app.use(
    express.urlencoded({
        extended: false
    })
);
//REPLACING THE PREVIOUS COOKIE SESSION//
const cookieSessionMiddleware = cookieSession({
    secret: `I'm always angry.`,
    maxAge: 1000 * 60 * 60 * 24 * 90
});

app.use(cookieSessionMiddleware);
io.use(function(socket, next) {
    cookieSessionMiddleware(socket.request, socket.request.res, next);
});
// app.use(
//     cookieSession({
//         secret: `I'm always angry.`,
//         maxAge: 1000 * 60 * 60 * 24 * 14 //expiration age,how long cookie to last
//     })
// );
app.use(csurf());

app.use(function(req, res, next) {
    res.cookie("mytoken", req.csrfToken());
    next();
});

app.use(express.json());
app.use(compression());

if (process.env.NODE_ENV != "production") {
    app.use(
        "/bundle.js",
        require("http-proxy-middleware")({
            target: "http://localhost:8081/"
        })
    );
} else {
    app.use("/bundle.js", (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

app.get("/welcome", function(req, res) {
    if (req.session.userId) {
        res.redirect("/");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

// app.get("/register", (req, res) => {
//     res.render("register");
// });

app.get("/receivefriendswannabes", function(req, res) {
    db.friendsnwannabes(req.session.userId)
        .then(({ rows }) => {
            console.log("index rows", rows);
            res.json(rows);
        })
        .catch(e => {
            console.log("error in friends and wannabes", e);
        });
});
app.get("/findrelation/:id", function(req, res) {
    // console.log("userId", typeof req.session.userId);
    // console.log("userProfileId", Number(req.params.id));
    db.initalStatus(req.session.userId, Number(req.params.id)).then(rows => {
        // console.log("rows:", rows.rows.length);
        if (rows.rows.length == 0) {
            res.json({ relation: false });
        } else {
            res.json(rows.rows[0]);
        }
    });
});
app.post("/sendfriendrequest/:id", function(req, res) {
    // console.log("userId", typeof req.session.userId);
    // console.log("userProfileId", Number(req.params.id));
    db.letsBeFriends(Number(req.params.id), req.session.userId)
        .then(rows => {
            // console.log("makefriends", rows);
            res.json(rows);
        })
        .catch(e => {
            console.log("error in sendfriendrequest", e);
        });
});
app.post("/acceptfriendrequest/:id", function(req, res) {
    // console.log("userId", typeof req.session.userId);
    // console.log("userProfileId", Number(req.params.id));
    db.acceptFriend(req.session.userId, Number(req.params.id))
        .then(rows => {
            console.log("friendaccepted", rows);
            res.json(rows);
        })
        .catch(e => {
            console.log("friendnot accepted", e);
        });
});
app.post("/endfriendship/:id", function(req, res) {
    // console.log("userId", typeof req.session.userId);
    // console.log("userProfileId", Number(req.params.id));
    db.letsNotBeFriends(req.session.userId, Number(req.params.id))
        .then(rows => {
            console.log("friendship ended", rows);
            res.json(rows);
        })
        .catch(e => {
            console.log("friendnot accepted", e);
        });
});

app.get("/api/users", (req, res) => {
    db.latestUsers(req.session.userId).then(result => {
        console.log("latest users:", result.rows);
        res.json(result.rows);
    });
});
app.get("/api/users/:input", (req, res) => {
    db.matches(req.params.input).then(result => {
        console.log("users", result);
        res.json(result.rows);
    });
});

app.get("/user", async (req, res) => {
    try {
        const { rows } = await db.allInfo(req.session.userId);
        res.json(rows[0]);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
    // db.getUserById(req.session.userId).then(
    //     ({rows}) => res.json(rows[0])
    // )
});
app.get("/api/user/:id", (req, res) => {
    console.log("req.session.userId", req.session.userId);
    console.log("req.params.id", req.params.id);
    db.getUser(Number(req.params.id)).then(({ rows }) => {
        if (!rows[0]) {
            console.log("id not found");
            res.json({ redirectMe: true });
        } else if (rows[0].id === req.session.userId) {
            console.log("matchingId");
            res.json({ redirectMe: true });
        } else {
            res.json(rows[0]);
        }
    });
});

app.post("/editBio", (req, res) => {
    const { userId } = req.session;
    let { bio } = req.body;
    console.log("bioText--------->", bio, "----:", userId, req, res);
    db.addBio(userId, bio)
        .then(function() {
            res.json({
                bio: bio
            });
        })
        .catch(e => {
            console.log("edit bio e", e);
        });
});

app.post("/upload", uploader.single("image"), s3.upload, function(req, res) {
    //image coming from file data
    const { userId } = req.session;
    console.log(req.file);
    const url = `${s3Url}${req.file.filename}`; //url on aws
    db.addImage(userId, url)
        .then(function({ rows }) {
            console.log("uploader rows", rows);
            res.json(rows[0]);
        })
        .catch(function(err) {
            console.log(err);
            res.sendStatus(500);
        });
});

app.post("/register", (request, response) => {
    console.log(
        "index.register.post   >>>>>>>>>>>>>>>>>>>>>>>>>>.",
        request.body
    );
    let { first, last, email, password } = request.body;

    console.log("first,last,email,password", first, last, email, password);
    bcrypt
        .hash(password)
        .then(hash => {
            db.registerUser(first, last, email, hash) //password already encrypted as result
                .then(newUser => {
                    console.log("newUser", newUser);
                    request.session.userId = newUser.rows[0].id;
                    response.json({ success: true });
                    // response.redirect("/");
                })
                .catch(e => {
                    console.log(e);
                    // response.sendStatus(500);
                });
        })
        .catch(e => {
            console.log(e);
            response.sendStatus(500);
        });
});

app.post("/login", (request, response) => {
    console.log("................ inside login");
    let userId;
    let { password, email } = request.body;
    db.login(email)
        .then(result => {
            console.log("................ inside login::: first then", result);
            let { id, hash } = result.rows[0];
            userId = id;
            console.log(
                ">>>>.index.login.post userid and passwordhash ",
                userId,
                hash
            );

            return bcrypt
                .compare(password, hash)
                .then(result => {
                    console.log(result);
                    return result;
                })
                .catch(e => {
                    console.log("index.login.post.bcrypt.error ", e);
                    response.sendStatus(500);
                });
        })
        .then(authorised => {
            "................ auth inside login::: 2nd thllllllen";
            if (!authorised) {
                return response.sendStatus(500);
            }
            request.session.loggedIn = "true";
            request.session.userId = userId;
            response.json({ success: true });
        })

        .catch(e => {
            console.log(e);
            response.sendStatus(500);
        });
});
app.get("/logout", function(req, res) {
    req.session = null;
    res.redirect("/");
});

/// DO NOT DELETE///
app.get("*", function(req, res) {
    if (!req.session.userId) {
        res.redirect("/welcome");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});
/// DO NOT DELETE///
io.on("connection", socket => {
    console.log(`A socket with the id ${socket.id} just connected`);
    socket.on("iAmHere", data => {
        console.log(data.message);
        socket.emitt("good to see you", {
            message: "you look marvellous"
        });
    });
    socket.on("disconnect", () => {
        console.log(`A socket with the id ${socket.id} just disconnected`);
    });
});
server.listen(8080, function() {
    console.log("I'm listening.Social Network");
});

///SERVER SIDE SOCKET CODE///

io.on("connection", function(socket) {
    if (!socket.request.session.userId) {
        return socket.disconnect(true);
    }
    const userId = socket.request.session.userId;
    // we want to get 10 lasts messages */
    db.getLastTenMessages().then(data => {
        console.log("socket data", data);
        io.sockets.emit("chatMessages", data.rows);
    });

    socket.on("chat message", newMessage => {
        console.log("index newMessage", newMessage);
        db.addMessages(newMessage, userId)
            .then(() => {
                db.getNewMessage(userId).then(({ rows }) => {
                    io.sockets.emit("chatMessage", rows);
                });
            })
            .catch(e => {
                console.log("index e", e);
            });
        // do stuff in here
        // we want to find out info about user who sent message
        // we want to emit this message object
        // we watnt to store it in the db
    });
});
