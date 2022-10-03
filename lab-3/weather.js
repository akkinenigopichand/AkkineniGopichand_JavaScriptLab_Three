function getWeather( city ){
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=6074feb702a6a49d43838c8dd40cfc1b`)
        .then(response => {
            console.log(response);

            if(!response.ok){
                throw new Error(response.statusText);
            }

            return response.json();
        })
        .then(data => {
            console.log(data);
            
            showWeather(data);
        })
        .catch(error => console.log(error.message));
}


getWeather('delhi');

function showWeather(data){
    let city = document.getElementById("cityName");
    let dateAndTime = document.getElementById("dateAndTime");
    let temperature = document.getElementById("temperature");
    let description = document.getElementById("description");
    let maxAndMin = document.getElementById("minAndMax");

    city.innerHTML = data.name;
    dateAndTime.innerHTML = getFormattedDate( new Date(data.dt * 1000));
    temperature.innerHTML =`${parseFloat(data.main.temp-273).toFixed(2)} C`;
    description.innerHTML = data.weather[0].main;
    maxAndMin.innerHTML =`${parseFloat(data.main.temp_min-273).toFixed(2)} C / ${parseFloat(data.main.temp_max-273).toFixed(2)} C`;
}



function getFormattedDate(dateAndTime){
    const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

    return `${days[dateAndTime.getDay()]} ${dateAndTime.getDate()} ${months[dateAndTime.getMonth()]} ${dateAndTime.getFullYear()}`;
}


document.querySelector('.searchBox').addEventListener('keypress',function(event){
    if(event.key==='Enter'){
        getWeather(this.value);
    }
});


