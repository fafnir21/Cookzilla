var mysql = require('mysql');
var $conf = require('../config/db');
var $util = require('../util/util');
var $sql = require('./meetingSqlMapping');

var pool  = mysql.createPool($util.extend({}, $conf.mysql));

module.exports = {
	add: function (req, next) {
		pool.getConnection(function(err, connection) {
			connection.query($sql.insert, req, function(err, result) {
				connection.release();
				next(err, result);
			});
		});
	},

	delete: function (req, next) {
		pool.getConnection(function(err, connection) {
			connection.query($sql.delete, req, function(err, result) {
				connection.release();
				next(err, result);
			});
		});
	},

	update: function (req, next) {
		pool.getConnection(function(err, connection) {
			connection.query($sql.update, req, function(err, result) {
				connection.release();
				next(err, result);
			});
		});
	},

	queryById: function (req, next) {
		pool.getConnection(function(err, connection) {
			connection.query($sql.queryById, req, function(err, result) {
				connection.release();
 				next(err, result);
			});
		});
	},

	queryByUser: function (req, next) {
		pool.getConnection(function(err, connection) {
			connection.query($sql.queryByUser, req, function(err, result) {
				connection.release();
 				next(err, result);
			});
		});
	},

	queryAll: function (req,  next) {
		pool.getConnection(function(err, connection) {
			connection.query($sql.queryAll, function(err, result) {
				connection.release();
				next(err, result);
			});
		});
	}
};
