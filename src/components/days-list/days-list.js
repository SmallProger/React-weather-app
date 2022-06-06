import Service from "../../service";
import React from "react";

export default class DaysList extends React.Component {
  service = new Service();
  render() {
    return (
      <div className="days-list">
        <div className="days-list_item"></div>
      </div>
    );
  }
}
