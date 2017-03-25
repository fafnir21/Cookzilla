var RSVP = {
	insert:'INSERT INTO RSVP(uname, mid, rsvptime) VALUES(?,?,now())',
	update:'update RSVP set rsvptime=? where uname=? and mid=?',
	delete: 'delete from RSVP where uname=? and mid=?',
	queryById: 'select * from RSVP where uname=? and mid=?',
	queryAll: 'select * from RSVP'
};

module.exports = RSVP;
