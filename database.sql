-- create extension 
CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;

CREATE EXTENSION IF NOT EXISTS unaccent WITH SCHEMA public;

CREATE TABLE teachers (
    id SERIAL PRIMARY KEY,
    name text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    reset_token text,
    reset_token_expires text,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now()
);

-- connect pg simple table 
CREATE TABLE session (
    sid character varying NOT NULL,
    sess json NOT NULL,
    expire timestamp(6) without time zone NOT NULL
);

ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;

CREATE INDEX "IDX_session_expire" ON "session" ("expire");

CREATE TABLE students (
    id SERIAL PRIMARY KEY,
    name text NOT NULL,
    school text NOT NULL,
    school_class text NOT NULL,
    teacher_id integer
);

CREATE TABLE activities (
    id SERIAL PRIMARY KEY,
    activitie_name text NOT NULL,
    school text NOT NULL,
    school_class text NOT NULL,
    school_subjects text NOT NULL,
    teacher_id integer,
    activity_date text NOT NULL,
    students json NOT NULL
);

-- create procedure
CREATE FUNCTION trigger_set_timestamp() 
RETURNS TRIGGER AS $$ 
BEGIN
  NEW.updated_at = Now();
  RETURN NEW;
END
$$ LANGUAGE plpgsql;

-- auto updated_at teachers
CREATE TRIGGER set_timestamp 
BEFORE UPDATE ON teachers 
FOR EACH ROW 
EXECUTE PROCEDURE trigger_set_timestamp();

-- add constraint from activities
ALTER TABLE activities
ADD CONSTRAINT activities_teacher_id_fkey 
FOREIGN KEY ("teacher_id") 
REFERENCES "teachers"("id") 
ON DELETE CASCADE;

-- add constraint from students
ALTER TABLE students
ADD CONSTRAINT students_teacher_id 
FOREIGN KEY ("teacher_id") 
REFERENCES "teachers"("id") 
ON DELETE CASCADE;