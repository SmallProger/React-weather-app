import React from "react";
import "./side-block.css";
import "../../owfont-master/css/owfont-regular.css";
import "../../service/spinner";
import Spinner from "../../service/spinner";
export default class SideBlock extends React.Component {
  constructor(props) {
    super(props);
    let { time, timezone, loading } = props;
    this.state = {
      time,
      timezone,
      loading,
    };
    this.timer = null;
    this.getTime(timezone);
  }
  switchToTwoDigit(num) {
    if (num < 9) {
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
  componentDidUpdate(prevProps) {
    let { timezone, loading } = this.props;
    if (prevProps.timezone !== timezone) {
      this.setState({
        timezone,
      });
      clearInterval(this.timer);
      this.getTime(timezone);
    }
    if (prevProps.loading !== loading) {
      this.setState({
        loading,
      });
    }
  }
  componentWillUnmount() {
    clearInterval(this.timer);
  }
  render() {
    let { temp, townName, weatherId } = this.props;
    let { time, loading } = this.state;
    let error = false;
    if (!townName) {
      error = true;
    }
    const spinner = loading ? <Spinner /> : null;
    const content = !loading
      ? GetContent(temp, townName, weatherId, time, error)
      : null;
    return (
      <section className="side-block">
        {spinner}
        {content}
      </section>
    );
  }
}
const GetContent = (temp, townName, weatherId, time, error) => {
  return (
    <>
      <div className="side-block_container">
        <span className="side-block_deg">{temp}</span>
        <span className="side-block_day">Today</span>
        <span className="side-block_time">
          {"Time: "}
          {error ? "not defined" : `${time}`}
        </span>
        <span className="side-block_townName">{`Town: ${townName}`}</span>
      </div>
      <i className={`owf owf-8x owf-${weatherId} weather-icon`}></i>
    </>
  );
};
