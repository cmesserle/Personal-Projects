CREATE DATABASE pipdb;
USE pipdb;

CREATE TABLE user_info (
  user_id INT NOT NULL AUTO_INCREMENT,
  email VARCHAR(50),
  last_name VARCHAR(50),
  first_name VARCHAR(50),
  username VARCHAR(50),
  password VARCHAR(50),
  security_q VARCHAR(50), 
  security_a VARCHAR(50),
  PRIMARY KEY (user_id)
);

CREATE TABLE movie_info (
  ID VARCHAR(50) NOT NULL,
  Title VARCHAR (50) NOT NULL,
  Description VARCHAR (500) NOT NULL,
  Director VARCHAR (50) NOT NULL,
  Length FLOAT NOT NULL,
  Type VARCHAR (50) NOT NULL,
  Image TEXT,
  Release_date DATE,
  Rating FLOAT NOT NULL,
  Available_Platform VARCHAR (50),
  PRIMARY KEY (ID)
);

CREATE TABLE user_stats (
  user_id INT NOT NULL,
  film_id VARCHAR(50) NOT NULL,
  user_rating FLOAT NOT NULL DEFAULT 0,
  review VARCHAR(1000),
  status ENUM('watched', 'not watched') NOT NULL,
  FOREIGN KEY (user_id) REFERENCES user_info(user_id),
  FOREIGN KEY (film_id) REFERENCES movie_info(ID),
);

-- Tests

INSERT INTO user_info (
first_name,
last_name,
email,
username,
password,
security_q,
security_a)
VALUES
('Test', 'Test', 'test@test.com', 'test123', '123test!', 'Why did the chicken cross the road?', 'To bock traffic')
;

INSERT INTO user_stats (
user_id,
film_id,
user_rating,
status)
VALUES
(1, 12, 5.0, 'watched');

INSERT INTO movie_info (
ID,
Title,
Description,
Director,
Length,
Type,
Image,
Release_date,
Rating,
Available_platform)
VALUES (
12, 'Test', 'Test', 'Test', 1.5, 'Test', 'test', '2023-01-01', 5.0, 'test');

ALTER TABLE user_stats ADD progress INT CHECK (progress BETWEEN 0 AND 100) NOT NULL DEFAULT 0;

SELECT * FROM user_stats;
SELECT * FROM movie_info;
SELECT * FROM user_info;

INSERT INTO user_info
(email, last_name, first_name, username, password)
VALUES
("test2@test.com", "test2", "test2", "test456", "456test!");

---