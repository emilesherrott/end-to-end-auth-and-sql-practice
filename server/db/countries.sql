DROP TABLE IF EXISTS countries;

CREATE TABLE countries (
    id SERIAL NOT NULL PRIMARY KEY, 
    name VARCHAR(255) NOT NULL,
    capital VARCHAR(255) NOT NULL, 
    population INT NOT NULL,
    languages VARCHAR(255) NOT NULL,
    fun_fact VARCHAR(255) NOT NULL,
    map_image_url VARCHAR(255) NOT NULL
); 