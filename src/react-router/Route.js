import React from "react";
import PropTypes from "prop-types";
import { register, unregister } from "../utils/instances";

const matchPath = (pathname, options) => {
  const { exact = false, path } = options;

  if (!path) {
    return {
      path: null,
      isExact: true,
      url: pathname
    };
  }

  const match = new RegExp(`^${path}`).exec(pathname);

  if (!match) {
    return null;
  }
  const url = match[0];
  const isExact = url === pathname;

  if (exact && !isExact) return null;

  return {
    url,
    isExact,
    path
  };
};

class Route extends React.Component {
  componentDidMount() {
    window.addEventListener("popstate", this.handlePop);
    register(this);
  }

  componentWillUnmount() {
    window.removeEventListener("popstate", this.handlePop);
    unregister(this);
  }

  handlePop = () => {
    this.forceUpdate();
  };
  render() {
    const { path, exact, component, render } = this.props;

    const match = matchPath(window.location.pathname, { path, exact });

    if (!match) {
      return null;
    }
    if (component) {
      return React.createElement(component, { match });
    }
    if (render) {
      return render({ match });
    }
    return null;
  }
}

Route.propTypes = {
  path: PropTypes.string,
  exact: PropTypes.bool,
  component: PropTypes.func,
  render: PropTypes.func
};

export default Route;
