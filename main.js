// !!!  Today Vars

let todayName = document.querySelector(".day");
let todayDate = document.querySelector(".date");
let todayLocation = document.querySelector(".location");
let todayDegree = document.querySelector(".degree .num");
let todayConditionIcon = document.querySelector("#icon");
let todayConditionText = document.querySelector(".custom");
let humidity = document.querySelector(".humidity");
let windSpeed = document.querySelector(".speed");
let todayNumb = document.querySelector(".todayNum");
//!! Next day
let nextDay = document.querySelectorAll(".Next-dayName");
let nextDaysIcon = document.querySelector(".Next-forecast-icon img");
let nextDayDegree = document.querySelectorAll(".NextDayDegree");
let nextDayCondition = document.querySelectorAll(".NextDayCustom");
let nextMinTemp = document.querySelectorAll(".minTemp");
let nextDayImg = document.querySelectorAll(".Next-forecast-icon img");
//!!!! Search

let date = new Date("2024-06-25");
// console.log(date.getDate());
// console.log(date.toLocaleDateString("en-US", { weekday: "long" }));
// console.log(date.toLocaleDateString("en-US", { month: "long" }));

const input = document.querySelector("#search");

const apiKey = "be0e80cff2b047bcacf134823242406";

async function getWeather(cityName) {
  let weatherResponse = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${cityName}&days=7`
  );
  let weatherData = await weatherResponse.json();
  // console.log(weatherData);
  return weatherData;
}
getWeather();

//!!!!!!! display todya data
function displayTodayData(data) {
  let date = new Date();
  todayName.innerHTML = date.toLocaleDateString("en-US", {
    weekday: "long",
  });
  todayNumb.innerHTML = date.getDate();
  todayDate.innerHTML = date.toLocaleDateString("en-US", { month: "long" });
  // todayDate.innerHTML=data.location.loca
  todayLocation.innerHTML = data.location.name;
  todayDegree.innerHTML = data.current.temp_c + "<sup>o</sup> C";
  todayConditionIcon.setAttribute("src", data.current.condition.icon);
  todayConditionText.innerHTML = data.current.condition.text;
  humidity.innerHTML = data.current.humidity + "%";
  windSpeed.innerHTML = data.current.wind_kph;
}
//!!!! display next days data

function displayNextDay(data) {
  let forecastData = data.forecast.forecastday;
  let forcastCondition = data.forecast.forecastday;
  let forcastMinTemp = data.forecast.forecastday ;

  // nextDayDegree.innerHTML = forecastData[1].day.maxtemp_c;
  // nextDayCondition.innerHTML = forecastData[1].day.condition.text;
  // console.log(nextDayDegree);
  for (let i = 0; i < 2; i++) {
    let nextDate = new Date(forecastData[i + 1].date);
    // console.log(nextDate);

    nextDay[i].innerHTML = nextDate.toLocaleDateString("en-US", {
      weekday: "long",
    });

    nextDayDegree[i].innerHTML =
      forecastData[i + 1].day.maxtemp_c + "<sup>o</sup> C";

    nextMinTemp[i].innerHTML =
      forcastMinTemp[i + 1].day.mintemp_c + "<sup>o</sup> ";

    nextDayCondition[i].innerHTML = forcastCondition[i + 1].day.condition.text;

    nextDayImg[i].setAttribute("src", forecastData[i + 1].day.condition.icon);
  }
}

//!!! start app
async function startApp(city = "alexandria") {
  let weatherData = await getWeather(city);
  // console.log(weatherData);
  if (!weatherData.error) {
      displayTodayData(weatherData);
      displayNextDay(weatherData);
  }

}
startApp();

input.addEventListener("input", function () {
  startApp(input.value);
});
