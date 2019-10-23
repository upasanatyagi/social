DROP TABLE IF EXISTS registration;

CREATE TABLE registration(
    id SERIAL PRIMARY KEY,
    first VARCHAR NOT NULL CHECK(first !=''),
    last VARCHAR NOT NULL CHECK(last !=''),
    email VARCHAR NOT NULL UNIQUE,
    password VARCHAR NOT NULL CHECK(password !='')
);
