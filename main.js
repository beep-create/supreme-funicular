//https://teachablemachine.withgoogle.com/models/XsAKdqhRP/


prediction_1="";
prediction_2="";
console.log("ml5 version", ml5.version);

Webcam.set({
width:350,
height: 300,
image_format: 'png',
png_quality: 90
}) 

camera = document.getElementById("camera");
Webcam.attach("#camera");


function take_snapshot() {
   Webcam.snap(function(data_uri){document.getElementById("result").innerHTML='<img id="captured_image" src="'+data_uri+'" />';})
}
classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/XsAKdqhRP/model.json', modelLoaded);

function modelLoaded() {
   console.log("model.Loaded");
}

function speak() {
var synth= window.speechSynthesis;
speak_data_1="the first gesture prediction is "+ prediction_1;
speak_data_2="the second gesture prediction is "+ prediction_2;
var utterThis=new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
synth.speak(utterThis);
}
   
   function check() {
     img = document.getElementById('captured_image');
     classifier.classify(img, gotResult);
     speak()
   }
   
   function gotResult(error, results) {
    if (error) {
   console.log(error);
   
    } else {
      console.log(results);
      document.getElementById("result_gesture_name").innerHTML = results[0].label;
      document.getElementById("result_gesture_name_2").innerHTML = results[1].label;
      prediction_1 = results[0].label;
      prediction_2 = results[1].label;
      speak()
   
      if (results[0].label == "thumbs-up") {
   document.getElementById("update_gesture").innerHTML="&#128077;";
      }
      if (results[0].label == "okay") {
       document.getElementById("update_gesture").innerHTML="&#128076;";
          }
          if (results[0].label == "victory") {
           document.getElementById("update_gesture").innerHTML="&#x270C;";
              }
              
   
        if (results[1].label == "thumbs-up") {
          console.log(results[1]);
          document.getElementById("update_gesture_2").innerHTML="&#128077;";
          } 
        if (results[1].label == "okay") {
         console.log(results[1]);
         document.getElementById("update_gesture_2").innerHTML="&#128076;";
        }   
        if (results[1].label == "victory") {
         console.log(results[1]);
         document.getElementById("update_gesture_2").innerHTML="&#x270C;";
         } 
        
    }
   }
   
   