import React, { Component } from "react";

import classnames from "classnames";
import Loading from "./Loading";
import Panel from "./Panel";
import axios from "axios";
import {
  getTotalInterviews,
  getLeastPopularTimeSlot,
  getMostPopularDay,
  getInterviewsPerDay
 } from "helpers/selectors";

// Mock Data

const data = [
  {
    id: 1,
    label: "Total Interviews",
    getValue: getTotalInterviews
  },
  {
    id: 2,
    label: "Least Popular Time Slot",
    getValue: getLeastPopularTimeSlot
  },
  {
    id: 3,
    label: "Most Popular Day",
    getValue: getMostPopularDay
  },
  {
    id: 4,
    label: "Interviews Per Day",
    getValue: getInterviewsPerDay
  }
];

// Main component

export default class Dashboard extends Component {

  state = {
    loading: true,
    data,
    focused: null,
    days:[],
    appointments: {},
    interviewers: {}
  };

  componentDidMount() {
    // Setting the focused state based on the value in local storage
    const focused = JSON.parse(localStorage.getItem("focused"));
    
    if (focused) {
      this.setState({ focused });
    }

    // Fetching API data
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then(([days, appointments, interviewers]) => {
      this.setState({
        loading: false,
        days: days.data,
        appointments: appointments.data,
        interviewers: interviewers.data
      });
    });
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
          label={panel.label}
          value={panel.getValue(this.state)}
          onSelect={() => this.selectPanel(panel.id)}
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