-- Planetti Database Script
-----------------------------

DROP TABLE users;
DROP TABLE schedules;
DROP TABLE events;

CREATE DATABASE planetti;

-- CREATE TABLE IF NOT EXISTS users (
-- id  SERIAL PRIMARY KEY,
-- name VARCHAR(30) NOT NULL,
-- email VARCHAR(50) NOT NULL,
-- password VARCHAR(100) NOT NULL,
-- created_on TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
-- );


-- public.users definition


CREATE TABLE IF NOT EXISTS users (
	"user_id" SERIAL PRIMARY KEY,
	"name" varchar(30) NOT NULL,
	"email" varchar(50) NOT NULL,
	"password" varchar(100) NOT NULL,
	"created_on" timestamptz NULL DEFAULT CURRENT_TIMESTAMP
);

-- public.schedules definition


CREATE TABLE IF NOT EXISTS schedules (
	"schedule_id" SERIAL PRIMARY KEY,
	"uuid" varchar(45) NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" varchar(255) NULL,
	"create_time" timestamptz NULL DEFAULT CURRENT_TIMESTAMP,
	"user_id" int4 NOT NULL
);


-- public.schedules foreign keys

ALTER TABLE public.schedules ADD CONSTRAINT schedules_fk FOREIGN KEY ("user_id") REFERENCES users(user_id) ON UPDATE CASCADE ON DELETE CASCADE;

-- public.events definition


CREATE TABLE IF NOT EXISTS  events (
	"event_id" serial PRIMARY KEY,
	"event" json NOT NULL,
	"create_time" timestamptz NULL DEFAULT CURRENT_TIMESTAMP,
	"schedule_id" int4 NOT NULL
);


-- public.events foreign keys

ALTER TABLE public.events ADD CONSTRAINT events_fk FOREIGN KEY (schedule_id) REFERENCES schedules(schedule_id) ON UPDATE CASCADE ON DELETE CASCADE;