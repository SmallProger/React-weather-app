import APIkey from "./keys";
export default class Service {
  _apiKey = APIkey;
  _geoHeader = "http://api.openweathermap.org/geo/1.0/";
  _weatherHeader = "https://api.openweathermap.org/data/2.5/weather";
  async getCoords(cityName) {
    const limit = 1;
    try {
      let answer = await fetch(
        `${this._geoHeader}direct?q=${cityName}&limit=${limit}&appid=${this._apiKey}`
      );
      let result = await answer.json();
      let { lat, lon } = result[0];
      return { lat, lon };
    } catch (err) {
      throw err;
    }
  }
  filterData(result) {
    let {
      main: { temp, pressure },
      wind: { speed },
      timezone,
      rain,
    } = result;
    let { description, id: weatherId } = result.weather[0];
    let data = {
      temp: Math.floor(temp - 273.15) + "°",
      description,
      pressure,
      speed,
      timezone,
      rain,
      weatherId,
      loading: false,
    };
    return data;
  }
  async makeRequest(cityName) {
    try {
      const { lat, lon } = await this.getCoords(cityName);
      let answer = await fetch(
        `${this._weatherHeader}?lat=${lat}&lon=${lon}&appid=${this._apiKey}`
      );
      let result = await answer.json();
      if (result.name.toLowerCase() !== cityName.toLowerCase()) {
        throw new Error("not founded");
      }
      let data = this.filterData(result);
      return data;
    } catch (err) {
      throw new Error("not founded");
    }
  }
}
