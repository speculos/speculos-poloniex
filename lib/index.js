'use strict';

const lib = {
	deps:{
		co:require('co')
	},
	config:{
		log:require('../config/log'),
		poloniex:require('../config/poloniex'),
		tokens:require('../config/tokens'),
		http:require('../config/http')
	},
	log:require('./log'),
	meta:require('./meta'),
	push:require('./push'),
	http:require('./http')
};

let log = lib.log.create(lib.config.log);
lib.deps.co(function*() {
	let meta = yield lib.meta.load();

	let push = yield lib.push.connect(Object.assign({}, lib.config.poloniex, {
		log:log.child({module:'push'})
	}));

	yield lib.http.create(lib.config.http, {
		log:log.child({module:'http'}),
		meta:meta,
		push:push,
		tokens:lib.config.tokens
	});
})
.catch(function(p_error) {
	log.fatal({error:p_error}, 'Initialization failure');
	process.exitCode = 1;
});
