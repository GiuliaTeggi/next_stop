import React from "react";
import { connect } from "react-redux";
import moment from "moment";
import { getTrains, sortTrains } from "./actions";
import { getPlatformNumber } from "../utils";
import ReloadIcon from "../assets/reload.svg";
import TableHeader from "./TableHeader";

class Timetable extends React.Component {

  trainLineColors = {
    "Circle": "yellow",
    "Metropolitan": "purple",
    "Hammersmith & City": "pink",
    "Jubilee": "grey",
    "Bakerloo": "brown",
    "Central": "red",
    "District": "green",
    "Northern": "black",
    "Piccadilly": "blue",
    "Victoria": "light-blue",
    "Waterloo & City": "teal"
  }


  render() {
    const { trains, sortTrains, getTrains, selectedStation } = this.props;
    return (
      <section>
        <button onClick={selectedStation.id ? () => getTrains(selectedStation.id, selectedStation.name) : null} className="reload-button"><p>Reload</p> <img src={ReloadIcon} aria-hidden="true" /></button>
        <table>
          <thead>
            <tr>
              <TableHeader title={"Due"} onClick={() => sortTrains("due")} />
              <TableHeader title={"Destination"} onClick={() => sortTrains("destination")} />
              <TableHeader title={"Line"} onClick={() => sortTrains("line")} />
              <TableHeader title={"Platform"} onClick={() => sortTrains("platform")} />
            </tr>
          </thead>
          <tbody>
            {trains.length > 0 && trains.map((train, index) =>
              <tr key={index}>
                <td>{moment(train.expectedArrival).format('HH:mm')}</td>
                <td>{train.towards}</td>
                <td>
                  <span className={this.trainLineColors[train.lineName]}>
                    {train.lineName}
                  </span>
                </td>
                <td>{getPlatformNumber(train.platformName)}</td>
              </tr>)}
            {
              trains.length == 0 &&
              <div>No trains found.</div>
            }
          </tbody>
        </table>
      </section >
    )
  }
}

const actions = {
  getTrains,
  sortTrains
}

const mapStateToProps = state => {
  const { trains, selectedStation } = state;
  return {
    trains,
    selectedStation
  }
}

export default connect(mapStateToProps, actions)(Timetable);