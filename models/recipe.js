var mysql = require('mysql');
var $conf = require('../config/db');
var $util = require('../util/util');
var $sql = require('./recipeSqlMapping');

var pool  = mysql.createPool($util.extend({}, $conf.mysql));

module.exports = {
	add: function (req,  next) {
		pool.getConnection(function(err, connection) {
			connection.query($sql.insert, req, function(err, result) {
				connection.release();
				next(err, result);
			});
		});
	},

	delete: function (req,  next) {
		pool.getConnection(function(err, connection) {
			connection.query($sql.delete, req, function(err, result) {
				connection.release();
				next(err, result);
			});
		});
	},

	update: function (req,  next) {
		pool.getConnection(function(err, connection) {
			connection.query($sql.update, req, function(err, result) {
				connection.release();
				next(err, result);
			});
		});
	},

	queryById: function (req,  next) {
		pool.getConnection(function(err, connection) {
			connection.query($sql.queryById, req, function(err, result) {
				connection.release();
 				next(err, result);
			});
		});
	},

	queryPostById: function (req,  next) {
		pool.getConnection(function(err, connection) {
			connection.query($sql.queryPostById, req, function(err, result) {
				connection.release();
 				next(err, result);
			});
		});
	},

	queryCurId: function (req,  next) {
		pool.getConnection(function(err, connection) {
			connection.query($sql.queryCurId, function(err, result) {
				connection.release();
				next(err, result);
			});
		});
	},

	queryPostById: function (req,  next) {
		pool.getConnection(function(err, connection) {
			connection.query($sql.queryPostById, req, function(err, result) {
				connection.release();
 				next(err, result);
			});
		});
	},

	queryTagById: function (req, next) {
		pool.getConnection(function(err, connection) {
			connection.query($sql.queryTagById, req, function(err, result) {
				connection.release();
 				next(err, result);
			});
		});
	},

	queryIngById: function (req,  next) {
		pool.getConnection(function(err, connection) {
			connection.query($sql.queryIngById, req, function(err, result) {
				connection.release();
 				next(err, result);
			});
		});
	},

	queryRevById: function (req,  next) {
		pool.getConnection(function(err, connection) {
			connection.query($sql.queryRevById, req, function(err, result) {
				connection.release();
 				next(err, result);
			});
		});
	},

	queryByAuthor: function (req,  next) {
		pool.getConnection(function(err, connection) {
			connection.query($sql.queryByAuthor, req, function(err, result) {
				connection.release();
 				next(err, result);
			});
		});
	},

	queryAll: function (next) {
		pool.getConnection(function(err, connection) {
			connection.query($sql.queryAll, function(err, result) {
				connection.release();
				next(err, result);
			});
		});
	}
};
