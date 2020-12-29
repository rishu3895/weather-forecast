const inputCityName = document.querySelector('#enter-city-name');
const cityCountryName =  document.querySelector('.city-country-name');
const dateTime = document.querySelector('.date-time');
const cityTemperature=document.querySelector('.city-temperature');
const cityCondition=document.querySelector('.city-condition');
const cityHumidity=document.querySelector('.city-humidity');
const cityFeelsLikeTemp=document.querySelector('.city-feels-like-temperature');
const cityWind=document.querySelector('.city-wind');
async function logTemperature(cityName) {
    const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=1986480656ec490d950204923202611&q=${cityName}`);
    if (response.status === 400) {
        throw console.error('what the fuck happened');
    }
    else {
        const weatherData = await response.json();
        return weatherData ;    
    }
}
function takeInputs(response){
    const cityName=response.location.name;
    const countryName=response.location.country;
    const temperatureInCel=response.current.temp_c;
    const temperatureInFar=response.current.temp_f;
    const lastRecordedTime=response.location.localtime;
    const currentCondition=response.current.condition.text;
    const feelsLikeTempInC=response.current.feelslike_c;
    const feelsLikeTempInF=response.current.feelslike_f;
    const cityHumidity=response.current.humidity;
    const cityWindSpeed=response.current.wind_kph;
    return {cityName, countryName, lastRecordedTime, temperatureInCel, currentCondition, feelsLikeTempInC, cityHumidity, cityWindSpeed, temperatureInFar,feelsLikeTempInF};
}
function handleResponse(response){
    const myVal=takeInputs(response);
    cityCountryName.innerHTML=`${myVal.cityName},${myVal.countryName}`;
    dateTime.innerHTML=`${myVal.lastRecordedTime}`;
    cityTemperature.innerHTML=`${myVal.temperatureInCel}°C`;
    cityCondition.innerHTML=`${myVal.currentCondition}`;
    cityHumidity.innerHTML=`Humidity Level: ${myVal.cityHumidity}`;
    cityFeelsLikeTemp.innerHTML=`Feels like: ${myVal.feelsLikeTempInC}`;
    cityWind.innerHTML=`Wind Speed: ${myVal.cityWindSpeed}`;
    console.log(myVal);
}
function finalTemperatureLog(cityName){
    logTemperature(cityName)
            .then(function(response){
                handleResponse(response);
            });
}
inputCityName.addEventListener('keydown', function (event) {
    if (event.keyCode === 13) {
        const cityName = inputCityName.value;
        inputCityName.value = '';
        console.log(cityName);
        finalTemperatureLog(cityName);
    }
});
finalTemperatureLog('delhi');