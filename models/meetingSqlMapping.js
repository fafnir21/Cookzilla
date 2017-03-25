var meeting = {
	insert:'INSERT INTO meeting(mid, mtitle, mdescription, gid, holdaddr, holdtime) VALUES(?,?,?,?,?,?)',
	update:'update meeting set mtitle=?, mdescription=?, mtime=? where rid=?',
	delete: 'delete from meeting where mid=?',
	queryById: 'select * from meeting as m join membership as ms on m.gid=ms.gid join grouping as g on m.gid=g.gid where m.mid=?',
	queryByUser: 'select * from meeting as m join membership as ms on m.gid=ms.gid where ms.uname=?',
	queryAll: 'select * from meeting'
};

module.exports = meeting;
