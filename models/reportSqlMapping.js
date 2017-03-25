var report = {
	insert:'INSERT INTO report(repid, mid, uname, reptitle, reptext, reporttime) VALUES(null,?,?,?,?,now())',
	update:'update report set reptitle=?, reptext=?, reporttime=? where repid=?',
	delete: 'delete from report where repid=?',
	queryById: 'select * from report where repid=?',
	queryByMid: 'select * from report where mid=?',
	queryAll: 'select * from report'
};

module.exports = report;
