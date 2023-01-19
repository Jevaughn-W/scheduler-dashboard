import React, { Component } from "react";

import classnames from "classnames";
import Loading from "./Loading";
import Panel from "./Panel";

// Mock Data

const data = [
  {
    id: 1,
    label: "Total Interviews",
    value: 6
  },
  {
    id: 2,
    label: "Least Popular Time Slot",
    value: "1pm"
  },
  {
    id: 3,
    label: "Most Popular Day",
    value: "Wednesday"
  },
  {
    id: 4,
    label: "Interviews Per Day",
    value: "2.3"
  }
];

// Main component

export default class Dashboard extends Component {

  state = {
    loading: false,
    data,
    focused: null
  };

  componentDidMount() {
    const focused = JSON.parse(localStorage.getItem("focused"));

    if (focused) {
      this.setState({ focused });
    }
  }

  componentDidUpdate(previousProps, previousState) {
    if (previousState.focused !== this.state.focused) {
      localStorage.setItem("focused", JSON.stringify(this.state.focused));
    }
  }


  selectPanel = (id) => {

    this.setState(previousState => ({
      focused: previousState.focused !== null ? null : id
    }));
  
  }

  render() { // Function to render components
    const dashboardClasses = classnames("dashboard", {
      "dashboard--focused": this.state.focused
     });

    if (this.state.loading) {  // Why do we need to return each component?
      return <Loading/>  
    }

    
    const panels = (this.state.focused ? data.filter(panel => this.state.focused === panel.id) : data)
    .map((panel) => {
      return(
        <Panel
          key={panel.id}
          id={panel.id}
          label={panel.label}
          value={panel.value}
          onSelect={event => this.selectPanel(panel.id)}
        />
      );
    });

    return (
      <main className={dashboardClasses}>
        {panels}
      </main>
    
    );
  }
}