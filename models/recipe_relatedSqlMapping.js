var recipe_related = {
	insert:'INSERT INTO recipe_related(rid, relatedid) VALUES(?,?)',
	update:'update recipe_related set where rid=?, relatedid=?',
	delete: 'delete from recipe_related where rid=?, relatedid=?',
	queryById: 'select * from recipe_related where rid=?, relatedid=?',
	queryAll: 'select * from recipe_related'
};
 
module.exports = recipe_related;