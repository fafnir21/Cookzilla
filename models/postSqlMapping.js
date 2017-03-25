var post = {
	insert:'INSERT INTO post(rid, uname, posttime) VALUES(?,?,now())',
	update:'update post set where rid=?, uname=?, posttime=?',
	delete: 'delete from post where rid=?, uname=?, posttime=?',
	queryByRId: 'select * from post where rid=?',
	queryAll: 'select * from post'
};

module.exports = post;
