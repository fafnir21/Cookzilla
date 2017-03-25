var mysql = require('mysql');
var $conf = require('../config/db');
var $util = require('../util/util');
var $sql = require('./photo_of_recipeSqlMapping');
 
var pool  = mysql.createPool($util.extend({}, $conf.mysql));

module.exports = {
	add: function (req, res, next) {
		pool.getConnection(function(err, connection) {
			connection.query($sql.insert, req, function(err, result) {
				connection.release();
			});
		});
	},

	delete: function (req, res, next) {
		pool.getConnection(function(err, connection) {
			connection.query($sql.delete, req, function(err, result) {
				connection.release();
			});
		});
	},

	update: function (req, res, next) {
		pool.getConnection(function(err, connection) {
			connection.query($sql.update, req, function(err, result) {
				connection.release();
			});
		});
	},

	queryById: function (req, res, next) {
		pool.getConnection(function(err, connection) {
			connection.query($sql.queryById, req, function(err, result) {
				connection.release();
 
			});
		});
	},

	queryAll: function (req, res, next) {
		pool.getConnection(function(err, connection) {
			connection.query($sql.queryAll, function(err, result) {
				connection.release();
			});
		});
	}
};