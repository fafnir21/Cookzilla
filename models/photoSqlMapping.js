var photo = {
	insert:'INSERT INTO photo(pid, url, ptime) VALUES(?,?,?)',
	update:'update photo set url=?, ptime=? where pid=?',
	delete: 'delete from photo where pid=?',
	queryById: 'select * from photo where pid=?',
	queryAll: 'select * from photo'
};
 
module.exports = photo;