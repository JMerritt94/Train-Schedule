var config = {
    apiKey: "AIzaSyAwV2cUbnBTMjAbFJtkzBbbZFRzafdgCNg",
    authDomain: "test-project-b4075.firebaseapp.com",
    databaseURL: "https://test-project-b4075.firebaseio.com",
    projectId: "test-project-b4075",
    storageBucket: "test-project-b4075.appspot.com",
    messagingSenderId: "1993353020"
};




firebase.initializeApp(config);
var database = firebase.database();

var trainName = "";
var destination = "";
var trainTime = "";
var trainFrequency = "";
var userTrain = {};
var tRemainder="";
var nextTrain= "";







$("#submit").on("click", function (event) {
    // Prevent form from submitting
    event.preventDefault();
    console.log("hello")
    // Get the input values
    var trainName = $("#TrainName").val();
    var destination = $("#Destination").val();
    var trainTime = $("#Firsttraintime").val();
    var trainFrequency = parseInt($("#Frequency").val())

    

  

    console.log(trainName);
    console.log(destination);
    console.log(trainTime);
    console.log(trainFrequency);

    
    
    
    


    

    userTrain = {
        trainName: trainName,
        destination: destination,
        trainTime: trainTime,
        trainFrequency: trainFrequency,
        
   

    }
    database.ref().push(userTrain)
    console.log(userTrain)
    $(".form-control").val("");
})

database.ref().on("child_added", function (snapshot) {
 
    firstTrain=snapshot.val().trainTime;
    console.log(firstTrain)

    var firstTimeConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
   console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);


    snapFrequency=snapshot.val().trainFrequency;
    // Time apart (remainder)
    console.log(snapFrequency)
    var tRemainder = diffTime % snapFrequency;
    console.log(tRemainder);
     console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));


    var tMinutesTillTrain = snapFrequency-tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

   
   

    var newRow = $("<tr>");
    var nameCol = $("<td>").text(snapshot.val().trainName);
    var destCol = $("<td>").text(snapshot.val().destination);
    var freqCol = $("<td>").text(snapshot.val().trainFrequency);
    var minutesRemainingCol= $("<td>").text(tMinutesTillTrain)
    var nextTrainCol = $("<td>").text(nextTrain);
    
    

    newRow.append(nameCol, destCol, freqCol,nextTrainCol, minutesRemainingCol);
    $("#traintable").append(newRow)
}, function(errorObject) {
    console.log("Errors handled:" + errorObject.code)
}

)









