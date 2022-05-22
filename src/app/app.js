import React from "react";
import IndicatorsBlock from "../components/indicators-block";
import SideBlock from "../components/side-block";
import Service from "../service/index";
import TownSearch from "../components/town-search";
import "./app.css";
import Error from "../service/error";
export default class App extends React.Component {
  state = {
    temp: null,
    townName: "London",
    description: null,
    timezone: null,
    pressure: null,
    speed: null,
    rain: null,
    weatherId: null,
    loading: true,
    error: false,
    errorMsg: "",
  };
  service = new Service();
  makeRequest(townName) {
    let answer = this.service.makeRequest(townName);
    let answer2 = this.service.makeRequest2(townName);
    console.log(answer2);
    answer
      .then((result) => {
        let {
          main: { temp, pressure },
          name,
          wind: { speed },
          timezone,
          rain,
        } = result;
        let { description, id: weatherId } = result.weather[0];
        this.setState({
          temp: Math.floor(temp - 273.15) + "°",
          townName: name,
          description,
          pressure,
          speed,
          timezone,
          rain,
          weatherId,
          loading: false,
        });
        console.log(this.state);
      })
      .catch((err) => {
        this.setState({
          error: true,
          errorMsg: err.message,
        });
      });
  }
  onTownSearch = (value) => {
    console.log("onTownSearch");
    this.setState({
      loading: true,
    });
    console.log("townsearch", this.state);
    this.makeRequest(value);
    this.setState({
      townName: value,
    });
  };
  handleErrClose = () => {
    console.log(this.state);
    this.setState({
      temp: null,
      townName: null,
      description: null,
      timezone: null,
      pressure: null,
      speed: null,
      rain: null,
      weatherId: null,
      loading: false,
      error: false,
      errorMsg: "",
    });
    console.log(this.state);
  };
  componentDidMount() {
    console.log("componentDidMount");
    let { townName } = this.state;
    this.makeRequest(townName);
  }
  render() {
    let { error } = this.state;
    let content = !error ? getContent(this.state, this.onTownSearch) : null;
    let err = error ? (
      <Error {...this.state} handleErrClose={this.handleErrClose} />
    ) : null;
    return (
      <div className="app">
        {content}
        {err}
      </div>
    );
  }
}
const getContent = (state, onTownSearch) => {
  return (
    <>
      <TownSearch onTownSearch={onTownSearch} />
      <div className="container">
        <SideBlock {...state} />
        <IndicatorsBlock {...state} />
      </div>
    </>
  );
};
