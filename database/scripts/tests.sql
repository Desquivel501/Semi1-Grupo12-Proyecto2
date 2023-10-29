DELIMITER $$

USE PR2 $$

CALL Register('test1@gmail.com', 'test1', 'name1', 'lastname1', 3013297960101, 'afasdfasdfasdfa') $$
CALL Register('test2@gmail.com', 'test2', 'name2', 'lastname2', 3013297960101, 'afasdfasdfasdfa') $$
CALL Register('test3@gmail.com', 'test3', 'name3', 'lastname3', 3013297960101, 'afasdfasdfasdfa') $$

CALL UpdateUser('test1@gmail.com', 'test3', 'name1', 'lastname1', 3013297960101, 'afasdfasdfasdfa') $$
CALL UpdateUser('test1@gmail.com', 'test3', 'name3', 'lastname1', 3013297960101, 'afasdfasdfasdfa') $$
CALL UpdateUser('test1@gmail.com', 'test3', 'name3', 'lastname3', 1111111111111, 'jlkjlkjkjfaskjfsajkfsa') $$

CALL CreateFriendRequest('test@gmail.com', 'test2@gmail.com')  $$
CALL CreateFriendRequest('prueba1@gmail.com', 'test2@gmail.com')  $$
CALL CreateFriendRequest('test2@gmail.com', 'test1@gmail.com')  $$
CALL CreateFriendRequest('test1@gmail.com', 'test3@gmail.com')  $$
CALL CreateFriendRequest('test2@gmail.com', 'test3@gmail.com')  $$

CALL AcceptFriendRequest('test2@gmail.com', 'test1@gmail.com') $$
CALL DeclineFriendRequest('test3@gmail.com', 'test1@gmail.com') $$
CALL AcceptFriendRequest('test3@gmail.com', 'test2@gmail.com') $$

CALL CreatePublication('test2@gmail.com', 'asdfasfa', NULL)  $$
CALL CreatePublication('test2@gmail.com', 'hgkghkjhgk', 'jgjfghjfg') $$ 

CALL CreatePublication('test3@gmail.com', 'uiasjsjsjsa', NULL)  $$
CALL CreatePublication('test3@gmail.com', 'oiuopjfsjsdfa', 'jhjjkljkjkl') $$ 

CALL CreatePublication('test1@gmail.com', 'hfmkgsd', NULL)  $$
CALL CreatePublication('test1@gmail.com', 'rwemklnkljqw', 'iuiuuioqw') $$ 

CALL AddComment('test2@gmail.com', 1, ':)')  $$
CALL AddComment('test2@gmail.com', 1, ':):)') $$
CALL AddComment('test2@gmail.com', 1, ':):):)') $$
CALL AddComment('test2@gmail.com', 2, ':):):)') $$

CALL AddMessageFriend(1, 'test2@gmail.com', 'Hola :)')  $$
CALL AddMessageFriend(1, 'test1@gmail.com', 'Hola :)') $$ 

CALL AddMessageBot('test2@gmail.com', 'test2@gmail.com', 'Hola :)')  $$
CALL AddMessageBot('test2@gmail.com', NULL, 'Hola') $$ 

CALL GetUserData('test2@gmail.com')

CALL GetPublications('prueba1@gmail.com') 

CALL GetPublicationComments(1) 

CALL GetUserFriends ('test1@gmail.com')

CALL GetNonFriends  ('test3@gmail.com')

CALL AddTagToPublication(1, 'Games')
CALL AddTagToPublication(1, 'Comic')
CALL AddTagToPublication(1, 'Animated')
CALL AddTagToPublication(1, 'Games')

CALL GetFriendRequests('test2@gmail.com') 

CALL GetPublication(23) 

CALL DeleteUser('email')

SELECT * FROM Users u $$
SELECT * FROM Friends f  $$
SELECT * FROM Publications p  $$
SELECT * FROM Comments c  $$
SELECT * FROM Chat_friends cf $$
SELECT * FROM Chat_bots cb $$
SELECT * FROM Tags t $$
SELECT * FROM Tags_detail td  $$