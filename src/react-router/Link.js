import * as React from "react";
import PropTypes from "prop-types";
import { instances } from "../utils/instances";

const historyPush = (path) => {
  window.history.pushState({}, null, path);
  instances.forEach((inst) => inst.forceUpdate());
};

const historyReplace = (path) => {
  window.history.replaceState({}, null, path);
  instances.forEach((inst) => inst.forceUpdate());
};

class Link extends React.Component {
  handleClick = (event) => {
    const { to, replace } = this.props;
    event.preventDefault();

    replace ? historyReplace(to) : historyPush(to);
  };
  render() {
    const { to, children } = this.props;
    return (
      <a href={to} onClick={this.handleClick}>
        {children}
      </a>
    );
  }
}

Link.propTypes = {
  to: PropTypes.string.isRequired,
  replace: PropTypes.bool
};

export default Link;
