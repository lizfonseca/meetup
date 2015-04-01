var net = require('net');
var server = net.createServer();
var fs = require('fs');
var savedData = fs.readFileSync('./data.json', 'utf8');
// takes the json data and parses it into an object
var masterObject = JSON.parse(savedData);

// when the server is on, it looks for a client connections
server.on('connection', function(client) {
	console.log('client connected');
	client.setEncoding('utf8');

	client.on('data', function(stringFromClient) {
		var input = stringFromClient.trim();
		var splitInput = input.split(' ');

		var password = 'password';

		// ADMIN Dynamic
		if (splitInput[0] === 'admin' && splitInput[1] === password){
			// created variables only for the administrator
			var adminCommand = splitInput[2];
			// variables needed to create new meetup
			var adminDate = splitInput[3];
			var adminTopic = splitInput[4];

			//switch (adminCommand){
				// case: 'create':
				// //do stuff
				// client.end();
				// break;

				// case: 'list'

			// }
			if (adminCommand === 'create'){
				if (adminTopic === undefined){
					client.write('ERROR: Missing info! Please add a date and topic.\n');
					client.end();
				}else{
					meetupInfo.date = adminDate;
					meetupInfo.topic = adminTopic;

					var newData = JSON.stringify(masterObject);
					fs.writeFileSync('./data.json', newData);
	
					client.write('New meetup created! \n');
					client.end();
				}
			}else if (adminCommand === 'list'){
				// show the event info and people attending event
				client.write(
					'\nMeetup Event \n'+
					'Date: ' + masterObject.meetupInfo.date + '\n' + 
					'Topic: ' + masterObject.meetupInfo.topic + ' \n');
				// loop through the array and print names
				client.write('Attendees: \n')
				for (i = 0; i < masterObject.peopleAttending.length; i++){
					client.write(masterObject.peopleAttending[i].name + ', \n')
				}
				client.write('\n');
				client.end();
			}else if (adminCommand === 'clear'){
				var blankObject = {
					'meetupInfo':{
						'date': '',
						'topic': ''
					},
					'peopleAttending':[
					{
						'name': '',
						'email': ''
						},
					]
				}

				var newMasterObject = JSON.stringify(blankObject);				
				fs.writeFileSync('./data.json', newMasterObject);
				
				
				client.write('All information cleared!\n');
				client.end();
			}else{
				client.write('\nERROR: Command ' + adminCommand + ' is not valid! \n');
				client.end();
			}
		}else if (splitInput[0] === 'admin' && splitInput[1] !== password){
			client.write('wrong password!\n');
			client.end();

		// USER Dynamic
		}else if (splitInput[0] === 'user'){
			// variables needed for users data access
			var userCommand = splitInput[1];
			var userName = splitInput[2];
			var userEmail = splitInput[3];
			
			if (userCommand === 'list'){
				// show the event info and number of people attending event
				client.write(
					'\nMeetup Event \n'+
					'Date: ' + masterObject.meetupInfo.date + '\n' + 
					'Topic: ' + masterObject.meetupInfo.topic + ' \n');
				
				client.write('Attendees: \n')
				client.write(masterObject.peopleAttending.length + ', \n')
			
				client.write('\n');
				client.end();
			}else if (userCommand === 'rsvp'){
				if (userEmail === undefined){
					client.write('ERROR: Missing info! Please provide your name and email.\n');
					client.end();
				}else if (userName !== undefined && userEmail !== undefined){
					var rsvp = {
						'name': userName,
						'email': userEmail
					}
					
					// add new rsvp request into attendees list 
					masterObject.peopleAttending.push(rsvp);

					var newData = JSON.stringify(masterObject);
					fs.writeFileSync('./data.json', newData);
					client.write('Your spot is saved!\n');
					console.log(masterObject);
					client.end();
				}
			}else{
				client.write('\nERROR: Command ' + adminCommand + ' is not valid! \n');
				client.end();
			}
		}




	});
});

server.listen(3000, function() {
	console.log('connected');
});

