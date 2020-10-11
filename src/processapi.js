const proxyUrl = "https://cors-anywhere.herokuapp.com/";
const appId = "c51223c219d6aec8cb8c5210449bd859";

// Gets the weather details for the left panel
export async function checkCity(cityName) {
  const apiUrl =
    "api.openweathermap.org/data/2.5/weather?q=" +
    cityName +
    "&appid=" +
    appId +
    "&units=metric";
  let city = {};
  try {
    const response = await fetch(proxyUrl + apiUrl);
    const data = await response.json();
    city.name = data.name;
    city.cod = data.cod;
    city.temperature = data.main.temp;
    city.description = data.weather[0].description;
    city.weather = data.weather[0].main;
  } catch (error) {
    city.name = "error";
    // console.log("error", error);
  }
  return city;
}

// Gets the weather data for a week for the right panel
export async function getCityForecast(cityName) {
  const apiUrl =
    "api.openweathermap.org/data/2.5/forecast/daily?q=" +
    cityName +
    "&cnt=7&appid=" +
    appId +
    "&units=metric";
  let data = {};
  try {
    const response = await fetch(proxyUrl + apiUrl);
    data = await response.json();
  } catch (error) {
    // city.name = "error";
    console.log("error", error);
  }

  return data;
}
