var membership = {
	insert:'INSERT INTO membership(uname, gid, role) VALUES(?,?,?)',
	update:'update membership set role=? where uname=?, gid=?',
	delete: 'delete from membership where uname=?, gid=?',
	queryById: 'select * from membership where uname=?, gid=?',
	queryAll: 'select * from membership'
};
 
module.exports = membership;