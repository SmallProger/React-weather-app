import React from "react";
import "./indicators-block.css";
import pressureImg from "../../images/params/pressure.svg";
import rainImg from "../../images/params/rain.svg";
import temperatureImg from "../../images/params/temperature.svg";
import windImg from "../../images/params/wind.svg";
import Spinner from "../../service/spinner";
import cloudsImg from "../../images/background/cloud-image.svg";
export default class IndicatorsBlock extends React.Component {
  constructor(props) {
    super(props);
    let { loading } = props;
    this.state = {
      loading,
    };
  }
  handleRainData(data) {
    if (data) {
      return `${data["1h"]} mm`;
    } else {
      return "no precipitation";
    }
  }
  componentDidUpdate(prevProps) {
    let { loading } = this.props;
    if (prevProps.loading !== loading) {
      console.log("here", loading);
      this.setState({
        loading,
      });
    }
  }
  render() {
    let { pressure, temp, speed, rain } = this.props;
    let { loading } = this.state;
    let spinner = loading ? <Spinner /> : null;
    let content = !loading
      ? GetContent(pressure, temp, speed, rain, this.handleRainData)
      : null;
    return (
      <section className="indicators-block">
        <img className="indicators-block_clouds" src={cloudsImg} alt="clouds" />
        {spinner}
        {content}
      </section>
    );
  }
}
const GetContent = (pressure, temp, speed, rain, handleRainData) => {
  return (
    <ul className="indicators-block_list">
      <li className="indicators-block_list_item">
        <img src={pressureImg} width={25} height={25} alt="pressure" />
        <span>{`Atmospheric pressure: ${pressure} hPa`}</span>
      </li>
      <li className="indicators-block_list_item">
        <img src={windImg} width={25} height={25} alt="wind" />
        <span>{`Wind speed: ${speed} meter/sec`}</span>
      </li>
      <li className="indicators-block_list_item">
        <img src={rainImg} width={25} height={25} alt="rain" />
        <span>{`Rain volume for the last 1 hour: ${handleRainData(
          rain
        )}`}</span>
      </li>
      <li className="indicators-block_list_item">
        <img src={temperatureImg} width={25} height={25} alt="temperature" />
        <span>{`Temperature: ${temp}`}</span>
      </li>
    </ul>
  );
};
