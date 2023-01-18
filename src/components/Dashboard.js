import React, { Component } from "react";

import classnames from "classnames";
import Loading from "./Loading";

export default class Dashboard extends Component {
  state = {
    loading: true
  };

  render() {
    const dashboardClasses = classnames("dashboard");

    if (this.state.loading) {
      return <Loading/>
    }

    return (
    <main className={dashboardClasses}/>
    
    );
  }
}