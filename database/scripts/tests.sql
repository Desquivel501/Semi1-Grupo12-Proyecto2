DELIMITER $$

USE PR2 $$

CALL Register('test1@gmail.com', 'test1', 'name1', 'lastname1', 3013297960101, 'afasdfasdfasdfa') $$
CALL Register('test2@gmail.com', 'test2', 'name2', 'lastname2', 3013297960101, 'afasdfasdfasdfa') $$
CALL Register('test3@gmail.com', 'test3', 'name3', 'lastname3', 3013297960101, 'afasdfasdfasdfa') $$

CALL UpdateUser('test1@gmail.com', 'test3', 'name1', 'lastname1', 3013297960101, 'afasdfasdfasdfa') $$
CALL UpdateUser('test1@gmail.com', 'test3', 'name3', 'lastname1', 3013297960101, 'afasdfasdfasdfa') $$
CALL UpdateUser('test1@gmail.com', 'test3', 'name3', 'lastname3', 1111111111111, 'jlkjlkjkjfaskjfsajkfsa') $$
