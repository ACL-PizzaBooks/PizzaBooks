DROP TABLE IF EXISTS author;

CREATE TABLE author (
  author_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL, 
  dob DATE,
  pob TEXT
  -- adding relationship to book table
  -- book_id BIGINT,
  -- FOREIGN KEY (book_id) REFERENCES book(book_id)
);