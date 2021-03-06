'use strict';

module.exports = function*() {
	let ticker = yield this.poloniex.publicRequest('returnTicker');
	let market = ticker[this.params.market];

	this.response.body = {
		currency:this.params.currency,
		asset:this.params.asset,
		ticker:{
			last:parseFloat(market.last),
			volume:{
				currency:parseFloat(market.baseVolume),
				asset:parseFloat(market.quoteVolume)
			},
			highest:parseFloat(market.highestBid),
			lowest:parseFloat(market.lowestAsk),
			percentChange:parseFloat(market.percentChange)
		}
	};
};
