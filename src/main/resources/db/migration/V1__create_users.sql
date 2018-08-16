CREATE TABLE users (
  id BIGSERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE,
  full_name VARCHAR(100),
  provider_id VARCHAR(50),
  provider_user_id VARCHAR(50),
  account_enabled BOOL NOT NULL DEFAULT TRUE,
  account_expired BOOL NOT NULL DEFAULT FALSE,
  account_locked BOOL NOT NULL DEFAULT FALSE,
  credentials_expired BOOL NOT NULL DEFAULT FALSE
);
