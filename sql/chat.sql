DROP TABLE IF EXISTS chats;

CREATE TABLE chats(
    id SERIAL PRIMARY KEY,
    message TEXT,
    chatter INT NOT NULL REFERENCES registration(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
