import React from "react";
import IndicatorsBlock from "../components/indicators-block";
import SideBlock from "../components/side-block";
import Service from "../service/index";
import TownSearch from "../components/town-search";
import DaysList from "../components/days-list";
import "./app.css";
import Error from "../service/error";
export default class App extends React.Component {
  state = {
    data: {},
    townName: "London",
    loading: false,
    error: false,
    errorMsg: "",
  };
  service = new Service();
  onTownSearch = (townName) => {
    let answer = this.service.makeRequest(townName);
    this.setState({
      loading: true,
    });
    answer
      .then((data) => {
        this.setState({
          data,
          townName,
          loading: false,
        });
      })
      .catch((err) => {
        this.setState({
          error: true,
          errorMsg: err.message,
        });
      });
  };
  handleErrClose = () => {
    this.setState({
      townName: "London",
      error: false,
    });
    this.onTownSearch("London");
  };
  componentDidUpdate(prevProps) {
    const { townName } = this.props;
    if (prevProps.townName !== townName) {
      this.setState({
        townName,
      });
      this.onTownSearch(townName);
    }
  }
  componentDidMount() {
    this.onTownSearch("London");
  }
  componentDidCatch() {
    this.setState({
      error: true,
    });
  }
  render() {
    const { error, data, errorMsg } = this.state;
    let content = !error
      ? GetContent(data, this.onTownSearch, this.state)
      : null;
    let catchErr = error ? (
      <Error errorMsg={errorMsg} handleErrClose={this.handleErrClose} />
    ) : null;
    return (
      <div className="app">
        {content}
        {catchErr}
      </div>
    );
  }
}
const GetContent = (data, onTownSearch, state) => {
  return (
    <>
      <TownSearch onTownSearch={onTownSearch} />
      <div className="container">
        <SideBlock data={data} {...state} />
        <IndicatorsBlock data={data} {...state} />
      </div>
      <DaysList />
    </>
  );
};
