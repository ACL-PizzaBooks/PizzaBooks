DROP TABLE IF EXISTS reviewers, authors, publisher, books, book_authors;

CREATE TABLE reviewers (
    id BIGINT GENERATED ALWAYS AS IDENTITY,
    name TEXT NOT NULL,
    company TEXT NOT NULL
);

CREATE TABLE publisher (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    city TEXT,
    country TEXT
);

CREATE TABLE authors (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL, 
  dob DATE,
  pob TEXT
  -- adding relationship to book table
  -- book_id BIGINT,
  -- FOREIGN KEY (book_id) REFERENCES book(book_id)
);

CREATE TABLE books (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    publisher_id BIGINT REFERENCES publisher(id),
    released DATE,
    title TEXT
);

CREATE TABLE book_authors (
  book_id BIGINT REFERENCES books(id),
  author_id BIGINT REFERENCES author(id)  
);
