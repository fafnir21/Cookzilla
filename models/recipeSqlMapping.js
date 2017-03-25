var recipe = {
	insert:'INSERT INTO recipe(rid, rtitle, servings, rdescription, author, posttime) VALUES(null,?,?,?,?,now())',
	update:'update recipe set rtitle=?, servings=?, rdescription=? where rid=?',
	delete: 'delete from recipe where rid=?',
	queryById: 'select * from recipe where rid=?',
	queryPostById: 'select * from recipe where rid=?',
	queryTagById: 'select r.rid,rtitle,servings,rdescription,t.tid,t.tname from recipe as r join tag_of_recipe as tor on r.rid=tor.rid join tag as t on t.tid=tor.tid where r.rid=?',
	queryIngById: 'select r.rid,rtitle,servings,rdescription,i.iid,i.iname,quantity from recipe as r join contain as c on r.rid=c.rid join ingredient as i on c.iid=i.iid where r.rid=?',
	queryRevById: 'select r.rid,rtitle,rdescription,revid,uname,revtitle,revtext,suggestion,rating from recipe as r join review as re on r.rid=re.rid where r.rid=?',
	queryCurId: 'select max(rid) as cur_rid from recipe',
	queryByAuthor: 'select * from recipe where author=?',
	queryAll: 'select * from recipe'
};

module.exports = recipe;
