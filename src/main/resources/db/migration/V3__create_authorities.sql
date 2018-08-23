CREATE TABLE authorities (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(50)
);

CREATE UNIQUE INDEX authority_uindex ON authorities (name);
