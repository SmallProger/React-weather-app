export default class Service {
  _apiKey = "6fc7b33b4fc9f58e0d7b28063d8e2897";
  async getCoords(cityName) {
    const limit = 1;
    let answer;
    let result;
    answer = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=${limit}&appid=${this._apiKey}`
    );
    result = await answer.json();
    let { lat, lon } = result[0];
    return { lat, lon };
  }
  async makeRequest(cityName) {
    try {
      let { lat, lon } = await this.getCoords(cityName);
      let answer;
      let result;
      try {
        answer = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${this._apiKey}`
        );
        result = await answer.json();
        console.log(result);
        if (result.name !== cityName) {
          throw new Error("not founded");
        }
        return result;
      } catch (err) {
        throw new Error("not founded");
      }
    } catch (err) {
      throw new Error("not founded");
    }
  }
  async makeRequest2(cityName) {
    try {
      let { lat, lon } = await this.getCoords(cityName);
      let answer;
      let result;
      try {
        answer = await fetch(
          `https://pro.openweathermap.org/data/2.5/forecast/climate?lat=${lat}&lon=${lon}&appid=fc69a5fd7ffc950ab5cb526cf3f07828`
        );
        result = await answer.json();
        console.log(result);
        if (result.name !== cityName) {
          throw new Error("not founded");
        }
        return result;
      } catch (err) {
        throw new Error("not founded");
      }
    } catch (err) {
      throw new Error("not founded");
    }
  }
}
