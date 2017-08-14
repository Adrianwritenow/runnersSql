DROP DATABASE IF EXISTS racedb;
CREATE DATABASE racedb;

-- connect database (postgress specific) othr systems will be a different command to connect.

\c racedb;

CREATE TABLE runner(
  bib_id  SERIAL PRIMARY KEY,
  division VARCHAR(100),
  sponsor VARCHAR(100),
  name VARCHAR(100)
);

CREATE TABLE venue(
  venue_id  SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  location VARCHAR(100) NOT NULL
);

CREATE TABLE race(
  race_id  SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  distance FLOAT NOT NULL,
  race_date TIMESTAMP NOT NULL,
  venue_id INTEGER,
  FOREIGN KEY (venue_id) REFERENCES venue(venue_id)
);

CREATE TABLE result(
  race_id INTEGER,
  FOREIGN KEY (race_id) REFERENCES race(race_id),
  bib_id INTEGER,
  FOREIGN KEY (bib_id) REFERENCES runner(bib_id),
  result_time FLOAT NOT NULL,
  PRIMARY KEY (race_id, bib_id)
);

INSERT INTO runner(division, sponsor, name)
VALUES('m30','TIY','Adrian Rodriguez'),
      ('m30','Dunder Mifflin','Michale Scott'),
      ('m30','DC','Barry Allen');
