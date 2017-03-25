var tag_of_recipe = {
	insert:'INSERT INTO tag_of_recipe(rid, tid) VALUES(?,?)',
	update:'update tag_of_recipe set where rid=? and tid=?',
	delete: 'delete from tag_of_recipe where rid=? and tid=?',
	queryById: 'select * from tag_of_recipe where rid=? and tid=?',
	queryAll: 'select * from tag_of_recipe'
};

module.exports = tag_of_recipe;
