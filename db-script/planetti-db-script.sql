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


CREATE TABLE IF NOT EXISTS  users (
	user_id int4 NOT NULL DEFAULT nextval('users_id_seq'::regclass),
	"name" varchar(30) NOT NULL,
	email varchar(50) NOT NULL,
	"password" varchar(100) NOT NULL,
	created_on timestamptz NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT users_pkey PRIMARY KEY (user_id)
);

-- public.schedules definition


CREATE TABLE IF NOT EXISTS  schedules (
	schedule_id serial NOT NULL DEFAULT nextval('schedules_schedule_id_seq'::regclass),
	uuid varchar(45) NOT NULL,
	title varchar(255) NOT NULL,
	description varchar(255) NULL,
	create_time timestamptz NULL DEFAULT CURRENT_TIMESTAMP,
	"user" int4 NOT NULL,
	CONSTRAINT schedules_pk PRIMARY KEY (schedule_id)
);


-- public.schedules foreign keys

ALTER TABLE public.schedules ADD CONSTRAINT schedules_fk FOREIGN KEY ("user") REFERENCES users(user_id) ON UPDATE CASCADE ON DELETE CASCADE;

-- public.events definition


CREATE TABLE IF NOT EXISTS  events (
	event_id serial NOT NULL DEFAULT nextval('events_event_id_seq'::regclass),
	"event" json NOT NULL,
	create_time timestamptz NULL DEFAULT CURRENT_TIMESTAMP,
	schedule int4 NOT NULL,
	CONSTRAINT events_pk PRIMARY KEY (event_id)
);


-- public.events foreign keys

ALTER TABLE public.events ADD CONSTRAINT events_fk FOREIGN KEY (schedule) REFERENCES schedules(schedule_id) ON UPDATE CASCADE ON DELETE CASCADE;