const API_AI_TOKEN = '5dc8b8aa4436439d8f89b48207a1ea55';
const apiAiClient = require('apiai')(API_AI_TOKEN);

const FACEBOOK_ACCESS_TOKEN = 'EAAXIZBtu4SfUBANS44TCBDQr1ExIgas1L50l1uaMO2aeTY6inki0AjCbsh8HNH9GlNU0SHEf7acTJFgsZC5l4DucZAZCV5h0tSqOPoZB8VtvQZChYiUQNIuzy3RLL6ebaOwMbTlaKrsPXMWMxaa8NvZAXxV0rD4M0X1OizrCWoGnuitfV3ZAwZByO';
const request = require('request');

var script = document.createElement('script');
    script.type = 'text/javascript';

    script.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js';
    document.body.appendChild(script);

const sendTextMessage = (senderId, text) => {

	 request({
		 url: "https://graph.facebook.com/v2.6/me/messages",
		 qs: { access_token: FACEBOOK_ACCESS_TOKEN },
		 method: "POST",
		 json: {
		 recipient: { id: senderId },
		 message: { text },
		 }
	});
};

module.exports = (event) => {

	const senderId = event.sender.id;
	const message = event.message.text;

	const apiaiSession = apiAiClient.textRequest(message, { sessionId: 'botbotbot_bot'});

	apiaiSession.on('response', (response) => {
		//const result = response.result.fulfillment.speech;
		sendTextMessage(senderId, "HEY1");

		$.ajax({
                type: 'POST',
                contentType: 'application/json',
                //data: JSON.stringify({params:message}),
                url: "http://127.0.0.1:5000/postmethod",
                success: function (e) {
                    sendTextMessage(senderId, e);
                },
                error: function(error) {
                	sendTextMessage(senderId, error);;
            }
        });

		sendTextMessage(senderId, "HEY");
	});

	apiaiSession.on('error', error => console.log(error));
	 	apiaiSession.end();

};