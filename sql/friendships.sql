DROP TABLE IF EXISTS friendships;

CREATE TABLE friendships (
    id SERIAL PRIMARY KEY,
    sender_id INT NOT NULL REFERENCES registration(id),
    receiver_id INT NOT NULL REFERENCES registration(id),
    accepted BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
