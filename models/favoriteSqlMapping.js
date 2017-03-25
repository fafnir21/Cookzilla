var favorite = {
	insert:'INSERT INTO favorite(uname, rid, Itimestamp) VALUES(?,?,?)',
	update:'update favorite set Itimestamp=? where uname=?, rid=?',
	delete: 'delete from favorite where uname=?, rid=?',
	queryById: 'select * from favorite where uname=?, rid=?',
	queryAll: 'select * from favorite'
};
 
module.exports = favorite;