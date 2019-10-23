const express = require("express");
const app = express();
const compression = require("compression");
const db = require("./database");
const cookieSession = require("cookie-session");
// const csurf =require('csurf');
const bcrypt = require("./bcrypt");

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
                    response.sendStatus(500);
                    // reponse.json({error: true});
                    // response.render("registration", {
                    //     error: true
                    // });
                });
        })
        .catch(e => {
            console.log(e);
            response.sendStatus(500);
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
