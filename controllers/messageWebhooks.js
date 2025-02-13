const processMessage = require('../helpers/processMessage');

module.exports = (req, res) => {

	if (req.body.object === 'page') {
		//console.log("------" + res.body.entry);
		req.body.entry.forEach(entry => {
			entry.messaging.forEach(event => {

				if (event.message && event.message.text) {
					processMessage(event);
				}

			});
		});
		res.status(200).end();
	}
};