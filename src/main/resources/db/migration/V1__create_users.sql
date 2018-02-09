CREATE TABLE users (
  id BIGSERIAL PRIMARY KEY,
  email VARCHAR(50) UNIQUE,
  password VARCHAR(255),
  full_name VARCHAR(100),
  role VARCHAR(50)
);

CREATE UNIQUE INDEX users_email_uindex ON users (email);

INSERT INTO users (email, password, full_name, role)
            VALUES('admin@anadeainc.com', '$2a$12$6yiK4/ar7AfbL/VAjJd1M.u4SC5NHTwEvNfhCQLh.2ktmxUstEZJu', 'App Admin', 'ROLE_ADMIN');
