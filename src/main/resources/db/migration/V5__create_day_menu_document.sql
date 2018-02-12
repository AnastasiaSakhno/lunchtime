CREATE TABLE day_menu_documents (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(100),
  type VARCHAR(100),
  content OID,
  day_menu_id BIGINT NOT NULL,
  CONSTRAINT fk_projects_day_menu_documents_id_day_menu_id FOREIGN KEY (day_menu_id) REFERENCES day_menu (id)
);
