var photo_of_report = {
	insert:'INSERT INTO photo_of_report(repid, pid) VALUES(?,?)',
	update:'update photo_of_report set where repid=?, pid=?',
	delete: 'delete from photo_of_report where repid=?, pid=?',
	queryById: 'select * from photo_of_report where repid=?, pid=?',
	queryAll: 'select * from photo_of_report'
};
 
module.exports = photo_of_report;