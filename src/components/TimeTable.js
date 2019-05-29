import React from "react";
import moment from "moment";
import getTrains from "./actions";
import ReloadIcon from "../assets/reload.svg";
import TableHeader from "./TableHeader";

class Timetable extends React.Component {
  state = {
    trains: []
  }

  componentDidMount() {
    this.updateTrains()
  }


  updateTrains = () => {
    getTrains().then(trains => {
      const sortedTrains = trains.sort((a, b) => new Date(a.expectedArrival) - new Date(b.expectedArrival));
      this.setState({ trains: sortedTrains, ascending: true })
    })
  }

  getPlatformNumber = (platformName) => +platformName.match(/\d+/g);


  sortTrains = (type) => {
    const { trains, ascending } = this.state;
    const sortedTrains = ((trains, type) => {
      switch (type) {
        case "due":
          return trains.sort((a, b) => ascending ? new Date(b.expectedArrival) - new Date(a.expectedArrival) : new Date(a.expectedArrival) - new Date(b.expectedArrival));
        case "destination":
          return trains.sort((a, b) => ascending ? b.towards.localeCompare(a.towards) : a.towards.localeCompare(b.towards));
        case "line":
          return trains.sort((a, b) => ascending ? b.lineName.localeCompare(a.lineName) : a.lineName.localeCompare(b.lineName));
        case "platform":
          return trains.sort((a, b) => ascending ? this.getPlatformNumber(b.platformName) - this.getPlatformNumber(a.platformName) : this.getPlatformNumber(a.platformName) - this.getPlatformNumber(b.platformName))
      }
    })(trains, type);

    this.setState({ ascending: !this.state.ascending, trains: sortedTrains })
  }


  render() {
    const { trains } = this.state;
    return (
      <section>
        <button onClick={() => this.updateTrains()}><p>Refresh</p> <img src={ReloadIcon} /></button>
        <table>
          <thead>
            <tr>
              <TableHeader title={"Due"} onClick={() => this.sortTrains("due")} />
              <TableHeader title={"Destination"} onClick={() => this.sortTrains("destination")} />
              <TableHeader title={"Line"} onClick={() => this.sortTrains("line")} />
              <TableHeader title={"Platform"} onClick={() => this.sortTrains("platform")} />
            </tr>
          </thead>
          <tbody>
            {trains.map(train =>
              <tr key={train.id}>
                <td>{moment(train.expectedArrival).format('HH:mm')}</td>
                <td>{train.towards}</td>
                <td>
                  <span className={train.lineName == "Circle" ? "yellow" : train.lineName == "Metropolitan" ? "purple" : "pink"}>
                    {train.lineName}
                  </span>
                </td>
                <td>{this.getPlatformNumber(train.platformName)}</td>
              </tr>)}
          </tbody>
        </table>
      </section>
    )
  }
}

export default Timetable;