// dao/userSqlMapping.js
// CRUD SQL语句
var user = {
	insert:'INSERT INTO user(uname, upassword, nickname, address, birth_day, phone) VALUES(?,?,?,?,?,?)',
	update:'update user set address=?, birth_day=?, phone=? where uname=?',
	delete: 'delete from user where uname=?',
	queryById: 'select * from user where uname=?',
	queryAll: 'select * from user',
	check: 'select * from user where uname=? and upassword=?'
};

module.exports = user;

