CREATE TABLE user_authorities (
  user_id BIGINT NOT NULL,
  authority VARCHAR(50),
  CONSTRAINT fk_user_day_menu_user_id FOREIGN KEY (user_id) REFERENCES users (id)
);

CREATE UNIQUE INDEX user_authority_uindex ON user_authorities (user_id, authority);
