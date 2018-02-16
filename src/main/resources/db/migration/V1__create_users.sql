CREATE TABLE users (
  id BIGSERIAL PRIMARY KEY,
  email VARCHAR(50) UNIQUE,
  password VARCHAR(255),
  full_name VARCHAR(100),
  role VARCHAR(50)
);

CREATE UNIQUE INDEX users_email_uindex ON users (email);
