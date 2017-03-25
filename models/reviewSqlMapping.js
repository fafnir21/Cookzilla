var review = {
	insert:'INSERT INTO review(revid, rid, uname, revtitle, revtext, suggestion, rating) VALUES(?,?,?,?,?,?,?)',
	update:'update review set revtitle=?, revtext=?, suggestion=?, rating=? where revid=?',
	delete: 'delete from review where revid=?',
	queryById: 'select * from review where revid=?',
	queryAll: 'select * from review'
};

module.exports = review;
