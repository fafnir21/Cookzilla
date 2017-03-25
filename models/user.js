// dao/userDao.js
// 实现与MySQL交互
var mysql = require('mysql');
var $conf = require('../config/db');
var $util = require('../util/util');
var $sql = require('./userSqlMapping');

// 使用连接池，提升性能
var pool  = mysql.createPool($util.extend({}, $conf.mysql));

// 向前台返回JSON方法的简单封装
var jsonWrite = function (res, ret) {
	if(typeof ret === 'undefined') {
		res.json({
			code: 1,
			msg: 'Fail'
		});
	} else {
		res.json(ret);
	}
};

module.exports = {
	add: function (req, next) {
		pool.getConnection(function(err, connection) {
			// 获取前台页面传过来的参数
			//var param = req.query || req.params;

			// 建立连接，向表中插入值
			// 'INSERT INTO user(id, name, age) VALUES(0,?,?)',[param.uname, param.upassword, param.nickname, param.address, param.birth_day, param.phone]
			connection.query($sql.insert, req, function(err, result) {

				// // 释放连接
				connection.release();

				next(err, result);
			});
		});
	},

	delete: function (req, next) {
		// delete by Id
		pool.getConnection(function(err, connection) {
			//var uname = req.body.uname;
			connection.query($sql.delete, req, function(err, result) {

				connection.release();
				next(err, result);
			});
		});
	},

	update: function (req, next) {
		// update by id
		// 为了简单，要求同时传name和age两个参数
		//var param = req.body;
		// if(param.address == null || param.birth_day == null || param.phone == null || param.uname == null) {
		// 	jsonWrite(res, undefined);
		// 	return;
		// }[param.address, param.birth_day, param.phone,  +param.uname]

		pool.getConnection(function(err, connection) {
			connection.query($sql.update, req, function(err, result) {
				// 使用页面进行跳转提示

				connection.release();
				next(err, result);
			});
		});

	},

	queryById: function (req, next) {
		//var uname = req;
		pool.getConnection(function(err, connection) {
			connection.query($sql.queryById, req, function(err, result) {
				//console.log(result);

				connection.release();
				next(err, result);
			});
		});
	},

	check: function (req, next) {
		//var uname = req;
		pool.getConnection(function(err, connection) {
			connection.query($sql.check, req, function(err, result) {
				//console.log(result);

				connection.release();
				next(err, result);
			});
		});
	},

	queryAll: function (req, next) {
		pool.getConnection(function(err, connection) {
			connection.query($sql.queryAll, function(err, result) {
				//console.log(result);

				connection.release();
				next(err, result);
			});
		});
	}


};
