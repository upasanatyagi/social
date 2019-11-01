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
        `SELECT first,last,profilePicture ,bio from registration WHERE id=$1
        `,
        [id]
    );
};

module.exports.addImage = function(id, url) {
    // console.log("in db", id);
    return db
        .query(
            `UPDATE registration SET profilePicture=$2 WHERE id=$1
            RETURNING profilePicture`,
            [id, url]
        )
        .catch(e => console.log(e));
};
module.exports.addBio = function(id, bio) {
    console.log("indbbbbbbbbbb:-", bio);
    return db.query(
        `UPDATE registration SET bio=$2 WHERE id=$1
        RETURNING bio`,
        [id, bio]
    );
};
module.exports.getUser = function(id) {
    return db.query(
        `SELECT  id,first,last,email,profilePicture,bio FROM registration WHERE id=$1`,
        [id]
    );
};
module.exports.matches = function(input) {
    return db.query(
        `SELECT  id,first,last,profilepicture FROM registration WHERE first ILIKE $1 `,
        [input + "%"]
    );
};
module.exports.latestUsers = function(id) {
    return db.query(
        `SELECT  id,first,last,profilepicture
         FROM registration
         WHERE id != $1
         ORDER BY id DESC
         LIMIT 3 `,
        [id]
    );
};
module.exports.initalStatus = function(sender_id, receiver_id) {
    return db.query(
        ` SELECT * FROM friendships
  WHERE (receiver_id = $1 AND sender_id = $2)
  OR (receiver_id = $2 AND sender_id = $1)`,
        [sender_id, receiver_id]
    );
};
module.exports.letsBeFriends = function(receiver_id, sender_id) {
    return db.query(
        ` INSERT INTO  friendships
  (receiver_id, sender_id ) VALUES ($1,$2)`,
        [receiver_id, sender_id]
    );
};
module.exports.acceptFriend = function(receiver_id, sender_id) {
    return db.query(
        `UPDATE friendships SET accepted = true WHERE receiver_id = $1 AND sender_id= $2`,
        [receiver_id, sender_id]
    );
};
module.exports.letsNotBeFriends = function(receiver_id, sender_id) {
    return db.query(
        `DELETE FROM friendships WHERE receiver_id = $1 AND sender_id= $2
        OR (receiver_id = $2 AND sender_id = $1)`,
        [receiver_id, sender_id]
    );
};
module.exports.friendsnwannabes = function(id) {
    return db.query(
        `SELECT registration.id, first, last, profilePicture, accepted
        FROM friendships
        JOIN registration
        ON (accepted = false AND receiver_id = $1 AND sender_id = registration.id)
        OR (accepted = true AND receiver_id = $1 AND sender_id = registration.id)
        OR (accepted = true AND sender_id = $1 AND receiver_id = registration.id)
        `,
        [id]
    );
};
