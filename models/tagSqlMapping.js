var tag = {
	insert:'INSERT INTO tag(tid, tname) VALUES(?,?)',
	update:'update tag set tname=? where tid=?',
	delete: 'delete from tag where tid=?',
	queryById: 'select * from tag where tid=?',
	queryCurId: 'select max(tid) as cur_tid from tag',
	queryByName: 'select * from tag where tname=?',
	queryAll: 'select * from tag'
};

module.exports = tag;
