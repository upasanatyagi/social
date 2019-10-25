const spicedPg = require("spiced-pg");
const db = spicedPg(
    process.env.DATABASE_URL ||
        `postgres:postgres:postgres@localhost:5432/social`
);
module.exports.registerUser = function(first, last, email, password) {
    return db.query(
        `INSERT INTO registration (first,last, email, password) VALUES ($1,  $2, $3 ,$4)
        RETURNING id `,
        [first, last, email, password]
    );
};
module.exports.login = function(email) {
    return db.query(
        `SELECT id,password AS hash FROM registration WHERE email=$1
        `,
        [email]
    );
};
module.exports.allInfo = function(id) {
    console.log("in db", id);
    return db.query(
        `SELECT first,last,profilePicture from registration WHERE id=$1
        `,
        [id]
    );
};

module.exports.addImage = function(id, url) {
    console.log("in db", id);
    return db
        .query(
            `UPDATE registration SET profilepicture=$2 WHERE id=$1
            RETURNING url`,
            [id, url]
        )
        .catch(e => console.log(e));
};
