var photo_of_review = {
	insert:'INSERT INTO photo_of_review(revid, pid) VALUES(?,?)',
	update:'update photo_of_review set where revid=?, pid=?',
	delete: 'delete from photo_of_review where revid=?, pid=?',
	queryById: 'select * from photo_of_review where revid=?, pid=?',
	queryAll: 'select * from photo_of_review'
};
 
module.exports = photo_of_review;