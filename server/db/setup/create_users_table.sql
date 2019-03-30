CREATE TABLE "Users" (
    id SERIAL PRIMARY KEY,
    name TEXT,
    username TEXT,
    password TEXT,
    role_id INT REFERENCES "Roles"(id),
    email TEXT
);
