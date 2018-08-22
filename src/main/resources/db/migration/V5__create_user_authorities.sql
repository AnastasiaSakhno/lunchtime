CREATE TABLE user_authorities (
  user_id BIGINT NOT NULL,
  authority_id BIGINT NOT NULL,
  CONSTRAINT fk_user_authority_user_id FOREIGN KEY (user_id) REFERENCES users (id),
  CONSTRAINT fk_user_authority_authority_id FOREIGN KEY (authority_id) REFERENCES authorities (id)
);

CREATE UNIQUE INDEX user_authority_uindex ON user_authorities (user_id, authority_id);
