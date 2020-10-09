export async function checkCity(cityName) {
  const proxyUrl = "https://cors-anywhere.herokuapp.com/";
  const appId = "c51223c219d6aec8cb8c5210449bd859";
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
    console.log("data", data);
    city.name = data.name;
    city.cod = data.cod;
    city.temperature = data.main.temp;
    city.description = data.weather[0].description;
  } catch (error) {
    city.name = "error";
    console.log("error", error);
  }
  return city;
}
