const container = document.getElementById('container')
const locationName = document.getElementById('location-input')
const searchBtn = document.getElementById('search-btn')
const weatherArticle = document.getElementById('featured-weather')
const apiKey = '[YOUR API KEY]' //i used https://openweathermap.org/api

const htmlElement = document.documentElement 
const themeBtn = document.getElementById('theme-btn')

themeBtn.addEventListener('click', () => {
    htmlElement.classList.toggle('dark')
})




function getWeather() {
    const requestionLocation = locationName.value

    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${requestionLocation}&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${requestionLocation}&appid=${apiKey}`;
        
    fetch(currentWeatherUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            createWeatherArticle(data)
        })

    fetch(forecastUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            hourlyForcast(data.list)
        })

}

function createWeatherArticle(data) {
    weatherArticle.innerHTML = ''
    

    if(data.cod === '404') {
        weatherArticle.innerHTML = `<p>${data.message}</p>`
    }

    else {
        const currentTemp = Math.round(data.main.temp - 273.15)
        weatherArticle.innerHTML = `
            <div class="md:w-1/2">
                <h1 class="text-4xl font-bold tracking-wide">${data.name}</h1>
                <h2 class="text-2xl">${currentTemp}&#8451</h2>
                <p class="text-xl capitalize">${data.weather[0].description}</p>
            </div>
            <div class="md:w-1/2 border-b-1 border-slate-500 md:border-0">
                <img class="mx-auto drop-shadow-lg" src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">
            </div>     

            `;
    }
}

function hourlyForcast(hourlyData) {
    const hourlyDataArticle = document.getElementById('hourly-weather')
    const next24Hours = hourlyData.slice(0, 8)
    hourlyDataArticle.innerHTML = '';

    next24Hours.forEach(item => {
        const dateTime = new Date(item.dt * 1000); // Convert timestamp to milliseconds
        const hour = dateTime.getHours();
        const temperature = Math.round(item.main.temp - 273.15)

        const hourlyWeather = `
                <div class="w-1/3 mx-auto hourly-item text-center border-b-1 border-slate-500 md:border-0 py-2">
                    <span>${hour}:00</span>
                    <img class="drop-shadow-lg mx-auto" src="https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png" alt="Hourly Weather Icon">
                    <span">${temperature}°C</span>
                </div>        
        `
        hourlyDataArticle.innerHTML += hourlyWeather
    })
}

searchBtn.addEventListener('click', () => {
    getWeather()
    locationName.value = ""
})

