// Declarations
var inputlocation = document.getElementById("inputlocation");
var currentDate = document.getElementById("currentDate");
var locationset = document.getElementById("locationset");

var currenttemp = document.getElementById("currenttemp");
var currenticon = document.getElementById("currenticon");
var currentStatus = document.getElementById("currentStatus");
var today = document.getElementById("today");

var bokraicon = document.getElementById("bokraicon");
var bokraHighTemp = document.getElementById("bokraHighTemp");
var bokraLowTemp = document.getElementById("bokraLowTemp");
var bokraStatus = document.getElementById("bokraStatus");
var tomorrow = document.getElementById("tomorrow");

var aftericon = document.getElementById("aftericon");
var afterHighTemp = document.getElementById("afterHighTemp");
var afterLowTemp = document.getElementById("afterLowTemp");
var afterStatus = document.getElementById("afterStatus");
var afterTomorrow = document.getElementById("afterTomorrow");

var findbtn = document.getElementById("findbtn");
var alldata = [];
var hppts = "https:";



//Week Array

var weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
var todayDate = new Date();

var dayWeek = weekday[todayDate.getDay()]

var tomorrowIndex = todayDate.getDay()+1
if (tomorrowIndex==weekday.length){
    tomorrowIndex=0
}

var afterTomorrowIndex = todayDate.getDay()+2;
if (afterTomorrowIndex==weekday.length){
    afterTomorrowIndex=0
}


//Month Array
var YearMonths = ["Jan","Feb","Mars","April","May","Jun","July","Aug","Sep","Oct","Nov","Dec"];

var currentmonth = YearMonths[todayDate.getMonth()]
var currentdayNum = todayDate.getDate();


// AJAX Request

var searchlocation = document.getElementById("searchlocation");
var myq ;

if (searchlocation.value ==""){

    myq = "cairo"
}

var http = new XMLHttpRequest();
http.open('Get' , `https://api.weatherapi.com/v1/forecast.json?key=0881f01a6f9e41a08a790810241112&days=3&q=${myq}`);
http.send();
http.addEventListener("load" , function(){
alldata = JSON.parse(http.response);
display (alldata);
})

http.addEventListener("error" , function(){
    console.log("Error Sorry")
})



function display (mydata){
    currentDate.innerHTML=currentdayNum+" "+currentmonth
    locationset.innerHTML = mydata.location.name ;
    currenttemp.innerHTML = mydata.current.temp_c + " <sup>o</sup>c"
    currenticon.innerHTML=`<img src="${hppts+mydata.current.condition.icon}" >`
    currentStatus.innerHTML= mydata.current.condition.text;
    today.innerHTML = dayWeek


    bokraicon.innerHTML = `<img src="${hppts+mydata.forecast.forecastday[1].day.condition.icon}" >`
    bokraHighTemp.innerHTML = mydata.forecast.forecastday[1].day.maxtemp_c + " <sup>o</sup>c" ;
    bokraLowTemp.innerHTML = mydata.forecast.forecastday[1].day.mintemp_c + " <sup>o</sup>c" ;
    bokraStatus.innerHTML = mydata.forecast.forecastday[1].day.condition.text ;
    tomorrow.innerHTML = weekday[tomorrowIndex]

    aftericon.innerHTML = `<img src="${hppts+mydata.forecast.forecastday[2].day.condition.icon}" >`
    afterHighTemp.innerHTML = mydata.forecast.forecastday[2].day.maxtemp_c + " <sup>o</sup>c" ;
    afterLowTemp.innerHTML = mydata.forecast.forecastday[2].day.mintemp_c + " <sup>o</sup>c" ;
    afterStatus.innerHTML = mydata.forecast.forecastday[2].day.condition.text ;
    afterTomorrow.innerHTML = weekday[afterTomorrowIndex]
}


function searchfunc(){

   if(searchlocation.value != "" ){

    myq = searchlocation.value ;

    
var http = new XMLHttpRequest();
http.open('Get' , `https://api.weatherapi.com/v1/forecast.json?key=0881f01a6f9e41a08a790810241112&days=3&q=${myq}`);
http.send();
http.addEventListener("load" , function(){
alldata = JSON.parse(http.response);
display (alldata);
})

http.addEventListener("error" , function(){
    console.log("Error Sorry")
})


   }
    console.log(myq);
    
    display(alldata);
}

var coordinates ;
var x = document.getElementById("demo");

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
  coordinates = "Latitude: " + position.coords.latitude +
  "<br>Longitude: " + position.coords.longitude;
}



findbtn.addEventListener("click" , function(){

    getLocation()
    console.log(coordinates.replace("<br>",","));
    
    var z = coordinates.replace("<br>",",")
    var http = new XMLHttpRequest();
    http.open('Get' , `https://api.weatherapi.com/v1/forecast.json?key=0881f01a6f9e41a08a790810241112&days=3&q=${z}`);
    http.send();
    http.addEventListener("load" , function(){
    alldata = JSON.parse(http.response);
    display (alldata);
    })
    
    http.addEventListener("error" , function(){
        console.log("Error Sorry")
    })
    
   
})