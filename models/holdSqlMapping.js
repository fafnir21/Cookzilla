var hold = {
	insert:'INSERT INTO hold(gid, mid, holdaddr, holdtime) VALUES(?,?,?,?)',
	update:'update hold set holdaddr=?, holdtime=? where gid=?, mid=?',
	delete: 'delete from hold where gid=?, mid=?',
	queryById: 'select * from hold where gid=?, mid=?',
	queryAll: 'select * from hold'
};
 
module.exports = hold;