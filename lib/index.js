var R = require('ramda');
var co = require('co');

var cRu = {
	forEachG: R.curryN(2, co.wrap(function* (genFn, list) {
		for (var i = 0; i < list.length; ++i)
			yield genFn(list[i]);
	})),
	mapG: R.curryN(2, co.wrap(function* (genFn, list) {
		const len = list.length;
		var result = Array(len);
		for (var i = 0; i < len; ++i)
			result[i] = yield genFn(list[i]);
		return result;
	})),
	filterG: R.curryN(2, co.wrap(function* (genFn, list) {
		var newList = [];
		for (var i = 0; i < list.length; ++i) {
			if (yield genFn(list[i]))
				newList[newList.length] = list[i];
		}
		return newList;
	})),
	reduceG: R.curryN(3, co.wrap(function* (genFn, acc, list) {
		for (var i = 0; i < list.length; ++i)
			acc = yield genFn(acc, list[i]);
		return acc;
	}))
};

module.exports = cRu;
