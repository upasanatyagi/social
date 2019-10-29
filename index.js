const express = require("express");
const app = express();
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

app.use(
    cookieSession({
        secret: `I'm always angry.`,
        maxAge: 1000 * 60 * 60 * 24 * 14 //expiration age,how long cookie to last
    })
);
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
        .then(function() {
            res.json({
                profilePicture: url
            });
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
                    // response.json({ success: true });
                    return result;
                })
                .catch(e => {
                    console.log("index.login.post.bcrypt.error ", e);
                    response.sendStatus(500);
                    // response.render("login", {
                    //     error: true
                    // });
                    // response.redirect("/login");
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
            // response.render("login", {
            //     error: true
            // });
        });
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

app.listen(8080, function() {
    console.log("I'm listening.");
});
