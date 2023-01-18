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
    data
  };

  render() { // Function to render components
    const dashboardClasses = classnames("dashboard");

    if (this.state.loading) {  // Why do we need to return each component?
      return <Loading/>  
    }

    
    const panels = data.map((panel) => {
        return(
          <Panel
            key={panel.id}
            id={panel.id}
            label={panel.label}
            value={panel.value}
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