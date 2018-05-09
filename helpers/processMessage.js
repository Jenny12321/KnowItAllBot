const API_AI_TOKEN = '5dc8b8aa4436439d8f89b48207a1ea55';
const apiAiClient = require('apiai')(API_AI_TOKEN);

const FACEBOOK_ACCESS_TOKEN = 'EAAXIZBtu4SfUBANS44TCBDQr1ExIgas1L50l1uaMO2aeTY6inki0AjCbsh8HNH9GlNU0SHEf7acTJFgsZC5l4DucZAZCV5h0tSqOPoZB8VtvQZChYiUQNIuzy3RLL6ebaOwMbTlaKrsPXMWMxaa8NvZAXxV0rD4M0X1OizrCWoGnuitfV3ZAwZByO';
const request = require('request');

const sendTextMessage = (senderId, text) => {
	console.warn('sending')
	 request({
		 url: "https://graph.facebook.com/v2.6/me/messages",
		 qs: { access_token: FACEBOOK_ACCESS_TOKEN },
		 method: "POST",
		 json: {
		 recipient: { id: senderId },
		 message: { text },
		 }
	});
	 console.warn('sent')
};

module.exports = (event) => {

	const senderId = event.sender.id;
	const message = event.message.text;

	const apiaiSession = apiAiClient.textRequest(message, { sessionId: 'botbotbot_bot'});

	apiaiSession.on('response', (response) => {
		const result = response.result.fulfillment.speech;
		//console.warn(response.result.fulfillment)
		var input = response.result.resolvedQuery
		console.log(response.result.resolvedQuery);

		//small talk if user does not say key word
		if (!(input.startsWith("Question:"))) {
			sendTextMessage(senderId, result);
		}
		//otherwise post to api to answer question
		else {
			//post request to scrape question
			var ans;
			input = input.replace("Question:", "");
			console.log(input);

	  		request({
				url: "http://127.0.0.1:5000/postmethod",
				method: "POST",
				json: {
				params: input,
				}}, function(error, response, body) {
				 	ans = body.toString();
				 	//console.log(ans)
					sendTextMessage(senderId, ans);
			})
  		}
	});

	apiaiSession.on('error', error => console.log(error));
	 	apiaiSession.end();

};