import React from "react";
import errImg from "../../images/error/error.svg";
import "./error.css";
export default class Error extends React.Component {
  render() {
    let { errorMsg: message, handleErrClose } = this.props;
    return (
      <div className="error">
        <img className="error_img" src={errImg} alt="err img" />
        <div className="error_msg">{message}</div>
        <button className="error_btn" onClick={handleErrClose}>
          Try again
        </button>
      </div>
    );
  }
}
