use coursaty;

CREATE TABLE users (
  id BIGINT NOT NULL AUTO_INCREMENT,
  full_name varchar(100),
  password varchar(100) NOT NULL,
  bio varchar(200),
  image varchar(300),
  email varchar(100) UNIQUE NOT NULL,
  role varchar(15) NOT NULL,
  otp VARCHAR(4),
  PRIMARY KEY(id)
);

CREATE TABLE courses (
  id BIGINT NOT NULL AUTO_INCREMENT,
  title varchar(100) NOT NULL,
  brief varchar(200),
  description varchar(500),
  preview_url varchar(500),
  image varchar(500),
  instructor_id BIGINT,
  PRIMARY KEY(id),
  FOREIGN KEY(instructor_id) REFERENCES users(id)
);

CREATE TABLE modules (
  id BIGINT NOT NULL AUTO_INCREMENT,
  title varchar(100) NOT NULL,
  description varchar(500),
  course_id BIGINT,
  PRIMARY KEY(id),
  FOREIGN KEY(course_id) REFERENCES courses(id)
);

CREATE TABLE lessons (
  id BIGINT NOT NULL AUTO_INCREMENT,
  title varchar(100) NOT NULL,
  url varchar(500),
  number integer,
  module_id BIGINT,
  PRIMARY KEY(id),
  FOREIGN KEY(module_id) REFERENCES modules(id)
);

CREATE TABLE tags (
  id BIGINT NOT NULL AUTO_INCREMENT,
  title varchar(100) NOT NULL,
  PRIMARY KEY(id)
);

CREATE TABLE course_tags (
  course_id BIGINT NOT NULL,
  tag_id BIGINT NOT NULL,
  PRIMARY KEY(course_id, tag_id),
  FOREIGN KEY(course_id) REFERENCES courses(id),
  FOREIGN KEY(tag_id) REFERENCES tags(id)
);

CREATE TABLE enrollments (
  user_id BIGINT NOT NULL,
  course_id BIGINT NOT NULL,
  date timestamp NOT NULL,
  PRIMARY KEY(user_id, course_id),
  FOREIGN KEY(user_id) REFERENCES users(id),
  FOREIGN KEY(course_id) REFERENCES courses(id)
);

CREATE TABLE quizzes (
  id BIGINT NOT NULL AUTO_INCREMENT,
  title varchar(100) NOT NULL,
  module_id BIGINT,
  PRIMARY KEY(id),
  FOREIGN KEY(module_id) REFERENCES modules(id)
);

CREATE TABLE user_quizzes (
  user_id BIGINT,
  quiz_id BIGINT,
  score integer,
  PRIMARY KEY(user_id, quiz_id),
  FOREIGN KEY(user_id) REFERENCES users(id),
  FOREIGN KEY(quiz_id) REFERENCES quizzes(id)
);

CREATE TABLE questions (
  id BIGINT NOT NULL AUTO_INCREMENT,
  question varchar(250) NOT NULL,
  answer1 varchar(200),
  answer2 varchar(200),
  answer3 varchar(200),
  answer4 varchar(200),
  correct_answer INT NOT NULL,
  quiz_id BIGINT,
  PRIMARY KEY(id),
  FOREIGN KEY(quiz_id) REFERENCES quizzes(id)
);

CREATE TABLE posts (
  id BIGINT NOT NULL AUTO_INCREMENT,
  title varchar(100) NOT NULL,
  content varchar(500) NOT NULL,
  date timestamp NOT NULL,
  user_id BIGINT,
  course_id BIGINT,
  PRIMARY KEY(id),
  FOREIGN KEY(user_id) REFERENCES users(id),
  FOREIGN KEY(course_id) REFERENCES courses(id)
);

CREATE TABLE replies (
  id BIGINT NOT NULL AUTO_INCREMENT,
  content varchar(200) NOT NULL,
  date timestamp NOT NULL,
  user_id BIGINT,
  post_id BIGINT,
  PRIMARY KEY(id),
  FOREIGN KEY(user_id) REFERENCES users(id),
  FOREIGN KEY(post_id) REFERENCES posts(id)
);

CREATE TABLE user_lessons (
  user_id BIGINT,
  lesson_id BIGINT,
  is_finished BOOLEAN DEFAULT FALSE,
  PRIMARY KEY(user_id, lesson_id),
  FOREIGN KEY(user_id) REFERENCES users(id),
  FOREIGN KEY(lesson_id) REFERENCES lessons(id)
);