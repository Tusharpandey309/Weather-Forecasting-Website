const api = {
    key: "fcc8de7015bbb202209bbf0261babf4c",
    base: "https://api.openweathermap.org/data/2.5/"
  }
  
  const searchbox = document.querySelector('.search-box');
  searchbox.addEventListener('keypress', setQuery);
  
  function setQuery(evt) {
    if (evt.keyCode === 13) {  // Check if the Enter key was pressed
      getResults(searchbox.value);
    }
  }
  
  function getResults(query = 'Noida') {  // Default to Noida if no query is provided
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(response => response.json())
      .then(displayResults)
      .catch(error => console.error('Error fetching weather data:', error));
  }
  
  function displayResults(weather) {
    // Display city and country
    let city = document.querySelector('.location .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;
  
    // Display date
    let now = new Date();
    let date = document.querySelector('.location #current-date');
    date.innerText = dateBuilder(now);
  
    // Display temperature
    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;
  
    // Display weather description
    let weather_el = document.querySelector('.current .weather');
    weather_el.innerText = weather.weather[0].main;
  
    // Display high and low temperatures
    let hilow = document.querySelector('.hi-low');
    hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;
  }
  
  function dateBuilder(d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", 
                   "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
  
    return `${day} ${date} ${month} ${year}`;
  }
  
  // Call getResults to load data for Noida when the page loads
  document.addEventListener('DOMContentLoaded', () => getResults());
  