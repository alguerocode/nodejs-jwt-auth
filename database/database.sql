CREATE DATABASE auth_project;



CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
  id uuid NOT NULL PRIMARY KEY,
  username VARCHAR(30) NOT NULL,
  user_email VARCHAR(100) NOT NULL,
  user_password TEXT NOT NULL ,
  UNIQUE(user_email)
);

