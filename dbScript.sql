CREATE DATABASE Pixagram;

USE Pixagram;
CREATE TABLE User
(
  email VARCHAR(150) NOT NULL,
  pswd VARCHAR(20) NOT NULL,
  fname VARCHAR(150) NOT NULL,    
  lname VARCHAR(150) NOT NULL,  
  dob DATE NULL,
  gender VARCHAR(20) NULL,
  country VARCHAR(20) NULL,
  city VARCHAR(20) NULL,
  profileimagePath VARCHAR(1000) NULL,
  coverimagePath VARCHAR(1000) NULL,
  visibility VARCHAR(20) NOT NULL default 'public',                        
  PRIMARY KEY     (email)                                  
);
INSERT INTO User
(email,pswd,fname,lname,dob,gender,country,city,visibility) 
VALUES 
('kanika@gmail.com','kanika123','kanika','nadkarni','1997-01-20','female','India','Pune','public');
INSERT INTO User
(email,pswd,fname,lname,dob,gender,country,city,visibility) 
VALUES 
('nikhil@gmail.com','nikhil123','nikhil','motwani','1997-03-20','male','India','Pune','public');
SELECT * FROM User;
CREATE TABLE Post
(
  id          INT unsigned NOT NULL AUTO_INCREMENT, # Unique ID for the record
  postTimestamp timestamp default current_timestamp not null,
  imagePath VARCHAR(1000) NOT NULL, 
  caption VARCHAR(500) NULL, 
  userEmail VARCHAR(150) NOT NULL, 
  PRIMARY KEY     (id),
  FOREIGN KEY (userEmail)
  REFERENCES User (email)
  ON UPDATE CASCADE
  ON DELETE CASCADE
);
INSERT INTO Post
(imagePath,caption,userEmail) 
VALUES 
('https://www.google.com/search?q=flower:',
'flowers are pretty','kanika@gmail.com');
SELECT * FROM Post;
CREATE TABLE Follow
(
userEmail1 VARCHAR(150) NOT NULL,
userEmail2 VARCHAR(150) NOT NULL,
followsTimestamp timestamp default current_timestamp not null,
PRIMARY KEY     (userEmail1,userEmail2),
FOREIGN KEY (userEmail1)
  REFERENCES User (email)
  ON UPDATE CASCADE
  ON DELETE CASCADE,
  FOREIGN KEY (userEmail2)
  REFERENCES User (email)
  ON UPDATE CASCADE
  ON DELETE CASCADE
);
INSERT INTO Follow 
(userEmail1,userEmail2)
VALUES 
('kanika@gmail.com','nikhil@gmail.com');
SELECT * FROM Follow;
CREATE TABLE Likes
(
email VARCHAR(150) NOT NULL,
postId INT unsigned NOT NULL,
likesTimestamp timestamp default current_timestamp not null,
PRIMARY KEY     (email,postId),
FOREIGN KEY (email)
  REFERENCES User (email)
  ON UPDATE CASCADE
  ON DELETE CASCADE,
  FOREIGN KEY (postId)
  REFERENCES Post (id)
  ON UPDATE CASCADE
  ON DELETE CASCADE
);
INSERT INTO Likes 
(email,postId)
VALUES 
('kanika@gmail.com',1);
SELECT * FROM Likes;
CREATE TABLE Comments
(
userEmail VARCHAR(150) NOT NULL,
postId INT unsigned NOT NULL,
content VARCHAR(1000) NOT NULL,
commentsTimestamp timestamp default current_timestamp not null,
PRIMARY KEY     (userEmail,postId),
FOREIGN KEY (userEmail)
  REFERENCES User (email)
  ON UPDATE CASCADE
  ON DELETE CASCADE,
  FOREIGN KEY (postId)
  REFERENCES Post (id)
  ON UPDATE CASCADE
  ON DELETE CASCADE
);
INSERT INTO Comments 
(userEmail,postId,content)
VALUES 
('kanika@gmail.com',1,'amazing flower');
SELECT * FROM Comments;
CREATE TABLE Tags
(
userEmail1 VARCHAR(150) NOT NULL,
userEmail2 VARCHAR(150) NOT NULL,
postId INT unsigned NOT NULL,
PRIMARY KEY     (userEmail1,userEmail2,postId),
FOREIGN KEY (userEmail1)
  REFERENCES User (email)
  ON UPDATE CASCADE
  ON DELETE CASCADE,
  FOREIGN KEY (userEmail2)
  REFERENCES User (email)
  ON UPDATE CASCADE
  ON DELETE CASCADE,
  FOREIGN KEY (postId)
  REFERENCES Post (id)
  ON UPDATE CASCADE
  ON DELETE CASCADE
);
INSERT INTO Tags 
(userEmail1,userEmail2,postId)
VALUES 
('kanika@gmail.com','nikhil@gmail.com',1);
SELECT * FROM Tags;

#mysqldump TUTORIALS > database_dump.txt