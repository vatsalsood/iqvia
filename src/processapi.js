export async function checkCity(cityName) {
  const proxyUrl = "https://cors-anywhere.herokuapp.com/";
  const appId = "c51223c219d6aec8cb8c5210449bd859";
  const apiUrl =
    "api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + appId;
  let city = "";
  try {
    const response = await fetch(proxyUrl + apiUrl);
    const data = await response.json();
    console.log("data", data);
    city = data.name;
  } catch (error) {
    city = "error";
    console.log("error", error);
    // getQuote();
  }
  return city;
}
