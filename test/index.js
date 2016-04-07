var expect = require('chai')
	.expect;
var cRu = require('../lib');
var co = require('co');

describe('async looping', function () {
	it('async forEach', co.wrap(function* () {
		var i = 0;
		yield cRu.forEachG(function* (item) {
			i = yield Promise.resolve(item);
		}, [1, 2, 3]);
		expect(i).to.equal(3);
	}));
	it('async map', co.wrap(function* () {
		expect(yield cRu.mapG(function* (item) {
			return (yield Promise.resolve(item)) * 10;
		}, [1, 2, 3])).to.deep.equal([10, 20, 30]);
	}));
	it('async filter', co.wrap(function* () {
		expect(yield cRu.filterG(function* (item) {
			return yield Promise.resolve(item % 2);
		}, [1, 2, 3, 4, 5, 6])).to.deep.equal([1, 3, 5]);
	}));
	it('async reduce', co.wrap(function* () {
		expect(yield cRu.reduceG(function* (acc, item) {
			return acc + (yield Promise.resolve(item));
		}, 0, [1, 2, 3])).to.equal(6);
	}));
});
