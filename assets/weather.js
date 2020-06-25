// // The variable cityName is linked to the input from the search bar on the html.
// let cityName = $("#searchBar").val();
// This is our API key:
let APIKey = "aee00fff2bc5d505beb8a8f7330dfaaf";


    // $("#searchBar").keypress(function(event){
        
    //     if (event.keyCode === 13) {
    //         event.preventDefault();
    //         $("#searchBtn").click();
    //     }
    // });

// // Create the function that occurs once the Search Button is clicked.
// $("#searchBtn").on("click", function(){

//                 //This code makes the forecast header visible:
//                 $("#fiveDayHeader").addClass('show');

//                 // Stores the city name that the user entered into a variable used to retrieve weather data for that particular city:
//                 let cityName = $("#searchBar").val();
//                 // Clear the search bar:
//                 $("#searchBar").val("");

let cityName= "Asheville";

        // The URL that contains the current weather conditions:
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIKey;
            console.log("Current Conditions Forecast URL: " + queryURL);

            $.ajax({
                url: queryURL,
                method: "GET"
            })
            // We store all of the retrieved data inside of an object called "response":
            .then(function (response) {
                // Function that displays the current day weather conditions:
                currentForecast(response);
                //Function that dispplays the weather conditions for the next 5 days: 
                weeklyForecast(response);
                //Function that lists out the cities you've searched for below the search box:
                listCities();
            })

// });

// Create Function that shows a list of the cities you've searched for below the search bar:
function listCities() {

    let listItem = $("<li>").addClass("list-group-item").text(cityName);
    $(".list").append(listItem);

}; 


// Function to display current weather conditions:
function currentForecast(response) {

            console.log("Current Weather Object: " + JSON.stringify(response));

            let date = new Date()

            // Convert the temperature in Kelvin to Fahrenheit:
            var tempF = (response.main.temp - 273.15) * 1.80 + 32;
            tempF = Math.floor(tempF)
            
            // Build the HTML elements that Weather API data will be hooked up to:
            var currentCard = $("<div>").addClass("card");
            var currentCardBody = $("<div>").addClass("card-body");
            var currentCity = $("<h4>").addClass("city card-title").text(response.name + " (" + date.toLocaleDateString('en-US') + ")" );
            var currentTemp = $("<p>").addClass("tempF card-text").text("Temperature (F): " + tempF);
            var currentHumidity = $("<p>").addClass("humidity card-text").text("Humidity: " + response.main.humidity + "%");
            var currentWind = $("<p>").addClass("wind card-text").text("Wind Speed: " + response.wind.speed + " MPH");;
            var currentUVIndex =$("<p>").addClass("uvindex card-text")
            var currentPrecip = $("<img>").attr("src", "https://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png")

            //Append the elements together and join them to the Webpage:
            $("#currentForecast").append(currentCard);
            $(currentCard).append(currentCardBody);
            $(currentCardBody).append(currentCity, currentTemp, currentHumidity, currentWind, currentUVIndex);
            $(currentCity).append(currentPrecip);
  
            // Since the UV index isn't in the object, we have to call it separately:
            let lat = response.coord.lat;
            let lon = response.coord.lon;

            var queryUVURL = "http://api.openweathermap.org/data/2.5/uvi?appid=" + APIKey + "&lat=" + lat + "&lon=" + lon;

            console.log(" UV Index URL: " + queryUVURL);
            
            // The return function makes something available outside of a function. But anything underneath the return will not be available.
            //Call ajax to retrieve the UV data from the server and return it outside the function for use globally.
            $.ajax({
                url: queryUVURL,
                method: "GET"
                })

            // We store the UV data inside an object and then display the data on the webpage:
            .then(function (response) {
                var uv = response.value;
                //Hook the value of the UV index to the HTML
                $(".uvindex").text("UV Index: " + uv);
                console.log("UV Index: " + uv);
            });

    };

// First we build the URL from which to recieve the 5 day weather forecast:
var fiveDayURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + APIKey;
    console.log("5 Day Forecast URL: " + fiveDayURL);

// In this section we will build the 5 day weather forecast section:
function weeklyForecast() {

        // Now we do an Ajax call to turn the 5 day weather data into an object that can be used by the webpage.
        $.ajax({
            url: fiveDayURL,
            method: "GET",
        })

        .then(function (response){

            console.log("First Object stored the the 5 Day Forecast Array: " + JSON.stringify(response.list[0]));

            // We create a loop to pull data from each day of the 5-day forecast and insert each day in its own individual card.
            // Start the loop at i=4 so that weather at 3 pm will be displayed. Loop in increments of 8 to allow 24 hours to pass between each forecast since each increment of i equals 3 hours since the response object displays weather every 3 hours.
            for (var i = 4; i < response.list.length; i+=8) {

                var currentDay=response.list[i];
                console.log("5 Day Forecast: " + JSON.stringify(currentDay));

                // Convert the date data into a format for display using the split function:
                var splitTheDateString = currentDay.dt_txt.split("-"); //Split the date string given in the server data at the points where there is a hyphen.
                var removeTime = splitTheDateString[2].split(" "); // Go to the index in the array where the day and time are still combined and split that based on empty spaces.
                var day = removeTime[0]; //Get the string that contains the time value
                var month = splitTheDateString[1]; //Get the string that contains the month value
                var year = splitTheDateString[0]; //Get the string that contains the year

                // Combine the variables into a reformatted date for display:
                var formattedDate = month + "/" + day + "/" + year;
                
                    
                // get the temperature and convert to fahrenheit:
                let fiveDayTemp = (currentDay.main.temp - 273.15) * 1.80 + 32;
                tempF = Math.floor(fiveDayTemp);

                // Generate the cards for each day and display the weather data for the corresponding day:
                var currentCard = $("<div>").addClass("card");
                var currentCardBody = $("<div>").addClass("card-body");
                var currentDate = $("<h4>").addClass("card-title").text(formattedDate);
                var currentTemp = $("<p>").addClass("card-text").text("Temp: " + tempF + " F");
                var currentHumidity = $("<p>").addClass("card-text").text("Humidity: " + currentDay.main.humidity + "%");

                // Pull the icon for the particular weather pattern from the openweather server:
                var currentPrecip = $("<img>").attr("src", "https://openweathermap.org/img/wn/" + currentDay.weather[0].icon + "@2x.png")

                //Append the Card and its data together and then hook it to the html:
                $("#weeklyForecast").append(currentCard);
                $(currentCard).append(currentCardBody);
                $(currentCardBody).append(currentDate, currentPrecip, currentTemp, currentHumidity);
                
            }
                
        });

};






















