import React from "react";
import "./indicators-block.css";
import pressureImg from "../../images/params/pressure.svg";
import rainImg from "../../images/params/rain.svg";
import temperatureImg from "../../images/params/temperature.svg";
import windImg from "../../images/params/wind.svg";
import Spinner from "../../service/spinner";
import cloudsImg from "../../images/background/cloud-image.svg";
import Row from "./row";
export default class IndicatorsBlock extends React.Component {
  handleRainData(data) {
    if (data) {
      return `${data["1h"]} mm`;
    } else {
      return "no precipitation";
    }
  }
  render() {
    const { data } = this.props;
    let { loading } = this.props;
    let spinner = loading ? <Spinner /> : null;
    let content = !loading ? GetContent(data, this.handleRainData) : null;
    return (
      <section className="indicators-block">
        <img className="indicators-block_clouds" src={cloudsImg} alt="clouds" />
        {spinner}
        {content}
      </section>
    );
  }
}
const GetContent = ({ pressure, temp, speed, rain }, handleRainData) => {
  return (
    <ul className="indicators-block_list">
      <Row imgSrc={pressureImg} imgAlt={"pressure"}>
        <span>{`Atmospheric pressure: ${pressure} hPa`}</span>
      </Row>
      <Row imgSrc={windImg} imgAlt={"wind"}>
        <span>{`Wind speed: ${speed} meter/sec`}</span>
      </Row>
      <Row imgSrc={rainImg} imgAlt={"rain"}>
        <span>{`Rain volume for the last 1 hour: ${handleRainData(
          rain
        )}`}</span>
      </Row>
      <Row imgSrc={temperatureImg} imgAlt={"temperature"}>
        <span>{`Temperature: ${temp}`}</span>
      </Row>
    </ul>
  );
};
