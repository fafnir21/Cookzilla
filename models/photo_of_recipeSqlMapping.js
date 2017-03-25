var photo_of_recipe = {
	insert:'INSERT INTO photo_of_recipe(rid, pid) VALUES(?,?)',
	update:'update photo_of_recipe set where rid=?, pid=?',
	delete: 'delete from photo_of_recipe where rid=?, pid=?',
	queryById: 'select * from photo_of_recipe where rid=?, pid=?',
	queryAll: 'select * from photo_of_recipe'
};
 
module.exports = photo_of_recipe;