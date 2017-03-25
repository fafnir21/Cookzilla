var history = {
	insert:'INSERT INTO history(uname, rid, htimestamp) VALUES(?,?,?)',
	update:'update history set htimestamp=? where uname=?, rid=?',
	delete: 'delete from history where uname=?, rid=?',
	queryById: 'select * from history where uname=?, rid=?',
	queryAll: 'select * from history'
};
 
module.exports = history;