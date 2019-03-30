CREATE TABLE "Roles" (
    id SERIAL PRIMARY KEY,
    name TEXT
);

INSERT INTO "Roles" (
    name
)
VALUES (
    'Admin'
),
(
    'Contributor'
),
(
    'User'
);
