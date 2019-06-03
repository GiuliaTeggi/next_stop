import React from "react";
import { connect } from "react-redux";
import { findStation, reset, getTrains } from "./actions";

class StationFilter extends React.Component {
  state = {
    name: ""
  }

  handleInputChange = value => {
    const { name } = this.state;
    const { findStation, reset } = this.props;
    this.setState({ name: value }, () => value.length > 1 ? findStation(name) : reset())
  }

  onSelectStation = (id, name) => {
    this.setState({ name: name })
    this.props.getTrains(id, name)
  }

  render() {
    const { stations } = this.props;
    return (
      <form>
        <input
          type="text"
          placeholder="Search station"
          value={this.state.name}
          onChange={e => this.handleInputChange(e.target.value)}
        />
        <ul>
          {
            stations.map((station, index) =>
              <li key={index} onClick={() => this.onSelectStation(station.id, station.name)}>{station.name}</li>)
          }
        </ul>
      </form>
    )
  }
}

const actions = {
  findStation,
  reset,
  getTrains
}

const mapStateToProps = state => {
  const { selectedStation, stations } = state;
  return {
    selectedStation,
    stations
  }
}

export default connect(mapStateToProps, actions)(StationFilter);