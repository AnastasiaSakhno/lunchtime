CREATE TABLE restaurants (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(50) UNIQUE,
  address VARCHAR(255),
  archieve BOOL NOT NULL DEFAULT FALSE
);

CREATE UNIQUE INDEX restaurants_email_uindex ON restaurants (name);
