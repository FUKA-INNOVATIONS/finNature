CREATE TABLE fn_user_type (
    id INT NOT NULL AUTO_INCREMENT,
    type CHAR(20) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE fn_user (
    id INT NOT NULL AUTO_INCREMENT,
    user_name CHAR(10) UNIQUE NOT NULL,
    email CHAR(50) UNIQUE NOT NULL,
    password CHAR(255) NOT NULL,
    type INT NOT NULL,
    status INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (type) REFERENCES fn_user_type(id)
);

CREATE TABLE fn_message (
    id INT NOT NULL AUTO_INCREMENT,
    sender_email CHAR(30) NOT NULL,
    sender_name CHAR(30) NOT NULL,
    content CHAR(255) NOT NULL,
    time TIMESTAMP NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE fn_tag (
    id INT NOT NULL AUTO_INCREMENT,
    name CHAR(15) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE fn_post (
    id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    media_url CHAR(255) NOT NULL,
    media_type CHAR(10) NOT NULL,
    description CHAR(255) NOT NULL,
    media_location CHAR(30),
    post_creation TIMESTAMP NOT NULL,
    media_creation DATETIME NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES fn_user(id)
);

CREATE TABLE fn_post_tag (
    id INT NOT NULL AUTO_INCREMENT,
    tag_id INT NOT NULL,
    post_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (tag_id) REFERENCES fn_tag(id),
    FOREIGN KEY (post_id) REFERENCES fn_post(id)
);

CREATE TABLE fn_like (
    id INT NOT NULL AUTO_INCREMENT,
    post_id INT NOT NULL,
    user_id INT NOT NULL,
    like_creation TIMESTAMP NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (post_id) REFERENCES fn_post(id),
    FOREIGN KEY (user_id) REFERENCES fn_user(id)
);

CREATE TABLE fn_comment (
    id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    post_id INT NOT NULL,
    content CHAR(200) NOT NULL,
    comment_creation TIMESTAMP NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES fn_user(id),
    FOREIGN KEY (post_id) REFERENCES fn_post(id)
);

INSERT INTO fn_user_type (type) VALUES ('registered'), ('admin'), ('super_admin');