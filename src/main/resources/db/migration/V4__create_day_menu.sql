CREATE TABLE day_menu (
  id BIGSERIAL PRIMARY KEY,
  date DATE,
  menu_id BIGINT NOT NULL,
  CONSTRAINT fk_projects_day_menu_id_menu_id FOREIGN KEY (menu_id) REFERENCES menu (id)
);

CREATE UNIQUE INDEX day_menu_date_uindex ON day_menu (date, menu_id);
