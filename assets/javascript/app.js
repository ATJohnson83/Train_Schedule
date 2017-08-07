// Initialize Firebase
  var config = {
    apiKey: "AIzaSyBVl_RFddXgL8mN7FfsnE6ZH9KxK4qYEG8",
    authDomain: "train-schedule-1.firebaseapp.com",
    databaseURL: "https://train-schedule-1.firebaseio.com",
    projectId: "train-schedule-1",
    storageBucket: "",
    messagingSenderId: "223299898355"
  };
  firebase.initializeApp(config);
  console.log(firebase);

  var database = firebase.database();

  // Buttons for adding Trains
  $('#add-train-btn').click(function(e){
  	event.preventDefault();
 	// get user input
 	var train_name = $('#train-name-input').val().trim();
 	var destiny = $('#destination-input').val().trim();
 	var first_train = $('#first-input').val().trim();
 	var frequency = $('#frequency-input').val().trim();
 	// temporarily store data locally
 	var newTrain = {
 		train_name: train_name,
 		destiny: destiny,
 		first_train: first_train,
 		frequency: frequency
 	};
 	// push data to firebase
 	database.ref().push(newTrain);
 	// clear input field
 	$('#train-name-input').val("");
 	$('#destination-input').val("");
 	$('#first-input').val("");
 	$('#frequency-input').val("");
 	
  });

  
  database.ref().on("child_added",function(snapshot,prevError){
  	console.log(snapshot.val());

  	var train_name = snapshot.val().train_name;
  	var destiny = snapshot.val().destiny;
  	var first_train = snapshot.val().first_train;
  	var frequency = snapshot.val().frequency;

  	console.log(first_train);
  	console.log(frequency);

  	var firstTimeConv = moment(first_train, "HH:mm").subtract(1, "years");
  	console.log(firstTimeConv);

  	var currentTime = moment();
  	console.log('Current Time: ' + moment(currentTime).format("HH:mm"));

  	var diffTime = moment().diff(moment(firstTimeConv), "minutes");
  	console.log("differenct in T: " + diffTime);
  	
  	var remainder = diffTime % frequency;
  	console.log(remainder);

  	var mintillnext = frequency - remainder;
  	console.log(mintillnext);

  	var nexttime = moment().add(mintillnext,"minutes");
  	var nextArrival = moment(nexttime).format("HH:mm");

  	$("#train-table > tbody").append("<tr><td>" + train_name + "</td><td>" + destiny + "</td><td>" +
  frequency + "</td><td>" + first_train + "</td><td>" + nextArrival + "</td><td>" + mintillnext + "</td></tr>");
  });
