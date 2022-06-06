import React from "react";
import "./side-block.css";
import "../../owfont-master/css/owfont-regular.css";
import "../../service/spinner";
import Spinner from "../../service/spinner";
export default class SideBlock extends React.Component {
  constructor(props) {
    super(props);
    const { timezone } = props.data;
    this.state = {
      time: null,
      timezone,
    };
    this.timer = null;
    this.getTime(timezone);
  }
  switchToTwoDigit(num) {
    if (num <= 9) {
      return "0" + num;
    } else {
      return num;
    }
  }
  getTime(timezone) {
    this.timer = setInterval(() => {
      let date = new Date();
      let hours = date.getUTCHours();
      let minutes = date.getUTCMinutes();
      let seconds = date.getUTCSeconds();
      if (timezone % 60 !== timezone) {
        hours += Math.floor(timezone / 3600);
        minutes += timezone % 60;
      } else {
        minutes += timezone;
      }
      this.setState({
        time: `${this.switchToTwoDigit(hours)}:${this.switchToTwoDigit(
          minutes
        )}:${this.switchToTwoDigit(seconds)}`,
      });
    }, 1000);
  }
  handleTownNameOutput(townName) {
    let arr = townName.split(" ");
    arr = arr.map((word) => {
      let wordSplit = word.split("");
      wordSplit[0] = wordSplit[0].toUpperCase("");
      return wordSplit.join("");
    });
    return arr.join(" ");
  }
  componentDidUpdate(prevProps, prevState) {
    let { timezone } = this.props.data;
    if (prevState.timezone !== timezone) {
      this.setState({
        timezone,
      });
      clearInterval(this.timer);
      this.getTime(timezone);
    }
  }
  componentWillUnmount() {
    clearInterval(this.timer);
  }
  render() {
    let { data, loading, townName } = this.props;
    let { time } = this.state;
    const spinner = loading ? <Spinner /> : null;
    const content = !loading
      ? GetContent(data, this.handleTownNameOutput(townName), time)
      : null;
    return (
      <section className="side-block">
        {spinner}
        {content}
      </section>
    );
  }
}
const GetContent = ({ temp, weatherId }, townName, time) => {
  return (
    <>
      <div className="side-block_container">
        <span className="side-block_deg">{temp}</span>
        <span className="side-block_day">Today</span>
        <span className="side-block_time">{`Time: ${time}`}</span>
        <span className="side-block_townName">{`Town: ${townName}`}</span>
      </div>
      <i className={`owf owf-8x owf-${weatherId} weather-icon`}></i>
    </>
  );
};
