import React from "react";

export default class Row extends React.Component {
  render() {
    let { imgSrc, imgAlt } = this.props;
    return (
      <li className="indicators-block_list_item">
        <img src={imgSrc} width={25} height={25} alt={imgAlt} />
        {this.props.children}
      </li>
    );
  }
}
