let latitude = 0; // initialize lat
let longitude = 0; // initialize long


window.onload = function(){ // waiting for the window to finsih loading
    const date = new Date(); // display today's date (built in function)
    const dateString = (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear(); // months start at 0, hence why we add 1
    // Now, set the .date HTML text to our daateString
    document.getElementById('date').innerHTML = dateString;
}

if ("geolocation" in navigator) { // if browser supports
    navigator.geolocation.getCurrentPosition(success); // get position
} else { // if geolocation does not exist or permission denied
    console.log("Geolocation is not available in your browser."); // print msg
}

function success(position){
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    // print out the latitude and longitude to see if it works
    console.log(longitude, latitude);

}
const btn = document.getElementById('getWeatherBtn');
    
btn.addEventListener("click", () => {
    const xhr = new XMLHttpRequest(); // defines the object
    xhr.open("GET", `localhost:3000/weather/${latitude}/${longitude}`); // this opens a get request to the website
    xhr.send(); // sends request

    xhr.onload = function(){ // once we recieve a response
        const body = JSON.parse(xhr.responseText); // set the body equal to the responseText
        let temperature = body.temperature;
        let weatherStatus = body.weatherStatus;
        document.getElementById("temperature").innerHTML = `Temperature: ${temperature} \u00B0F`
        document.getElementById("weatherStatus").innerHTML = `Weather Status: ${weatherStatus}`

    }

    // 5-DAY FORECAST
    const xhr2 = new XMLHttpRequest();
    xhr2.open("GET", `localhost:3000/weather/${lat}/${lon}`);
    xhr2.send();
    
    xhr2.onload = function() {
        const body = JSON.parse(xhr2.responseText);
        var forecast = body.forecast; // does it need to be var or let?
        var forecastElements = document.getElementsByClassName("forecast");
        for (let i = 0; i < forecast.length; i++){
            forecastElements[i].innerHTML = `${forecast[i].dayname}: ${forecast[i].temp} \u00B0F`;
        }

    let forecast = [["M", 52], ["Tu", 53], ["W", 54], ["Th", 55], ["F", 56]]; // nested array of projected forecast
    let forecastElements = document.getElementsByClassName("forecast"); // setting forecastElements to an arrya of divs
    for (let i = 0; i < forecast.length; i++) { // loop starting from index 0 and ending at the length minus 1 (b/c less than i)
        forecastElements[i].innerHTML = forecast[i][0] + ": " + forecast[i][1] + "\u00B0F"; // sets the innerHtml of the i'th 'forecast div element to a string in the format of "Day: Temp°F"
      }
    } // closes xhr2

});

// key: 922ed893d9e4d868452058259423de7c