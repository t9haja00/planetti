-- Planetti Database Script
-----------------------------

DROP TABLE users;

CREATE DATABASE planetti;

CREATE TABLE IF NOT EXISTS users (
id  SERIAL PRIMARY KEY,
name VARCHAR(30) NOT NULL,
email VARCHAR(50) NOT NULL,
password VARCHAR(100) NOT NULL,
created_on TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);