CREATE TABLE user_day_menu (
  id BIGSERIAL PRIMARY KEY,
  date DATE,
  out BOOL NOT NULL DEFAULT FALSE,
  user_id BIGINT NOT NULL,
  menu_id BIGINT NOT NULL,
  CONSTRAINT fk_user_day_menu_user_id FOREIGN KEY (user_id) REFERENCES users (id),
  CONSTRAINT fk_user_day_menu_menu_id FOREIGN KEY (menu_id) REFERENCES menu (id)
);

CREATE UNIQUE INDEX user_day_menu_date_uindex ON user_day_menu (date, user_id);
