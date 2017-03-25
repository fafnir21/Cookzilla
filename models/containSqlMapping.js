var contain = {
	insert:'INSERT INTO contain(rid, iid, quantity) VALUES(?,?,?)',
	update:'update contain set iid=? where rid=?',
	delete: 'delete from contain where rid=? and iid=?',
	queryById: 'select * from contain where rid=? and iid=?',
	queryAll: 'select * from contain'
};

module.exports = contain;
