import React from "react";
import moment from "moment";
import getTrains from "./actions";

class Timetable extends React.Component {
  state = {
    trains: []
  }

  componentDidMount() {
    getTrains().then(trains => {
      const sortedTrains = trains.sort((a, b) => new Date(a.expectedArrival) - new Date(b.expectedArrival));
      this.setState({ trains: sortedTrains, sort: { direction: "ascending", type: "due" } })
    })
  }




  render() {
    const { trains } = this.state;
    return (
      //table can become its own component
      <table>
        <thead>
          <tr>
            <th>Due <button>sort</button></th>
            <th>Destination</th>
            <th>Line</th>
            <th>Platform</th>
          </tr>
        </thead>
        <tbody>
          {trains.map(train =>
            <tr key={train.id}>
              <td>{moment(train.expectedArrival).format('HH:mm')}</td>
              <td>{train.towards}</td>
              <td>{train.lineName}</td>
              <td>{train.platformName}</td>
            </tr>)}
        </tbody>
      </table>
    )
  }
}

export default Timetable;