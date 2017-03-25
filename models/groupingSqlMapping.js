var grouping = {
	insert:'INSERT INTO grouping(gid, gname, gdescription) VALUES(?,?,?)',
	update:'update grouping set gname=? where gid=?',
	delete: 'delete from grouping where gid=?',
	queryCurId: 'select max(gid) as cur_gid from grouping',
	queryById: 'select * from grouping where gid=?',
	queryMemById: 'select g.gid,gname,gdescription,uname,role from grouping as g join membership as m on g.gid=m.gid where g.gid=?',
	queryAll: 'select * from grouping'
};

module.exports = grouping;
