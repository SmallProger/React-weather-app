import React from "react";
import "./town-search.css";

export default class TownSearch extends React.Component {
  state = {
    value: "",
  };
  HandleSubmit = (e) => {
    e.preventDefault();
    const townSearchInput = document.querySelector(".town-search_input");
    let { onTownSearch } = this.props;
    if (townSearchInput.value) {
      let value = townSearchInput.value;
      console.log(value);
      onTownSearch(value);
    }
  };
  HandleChange = (e) => {
    let value = e.target.value;
    this.setState({
      value,
    });
  };
  render() {
    return (
      <header className="header">
        <h1 className="app-name">WEATHER APP</h1>
        <form className="town-search" onSubmit={this.HandleSubmit}>
          <input
            className="town-search_input"
            value={this.state.value}
            onChange={this.HandleChange}
            placeholder="write the city name here"
          ></input>
          <button className="town-search_button">search</button>
        </form>
      </header>
    );
  }
}
