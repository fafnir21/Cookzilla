var ingredient = {
	insert:'INSERT INTO ingredient(iid, iname) VALUES(?,?)',
	update:'update ingredient set iname=? where iid=?',
	delete: 'delete from ingredient where iid=?',
	queryById: 'select * from ingredient where iid=?',
	queryCurId: 'select max(iid) as cur_iid from ingredient',
	queryByName: 'select * from ingredient where iname=?',
	queryAll: 'select * from ingredient'
};

module.exports = ingredient;
