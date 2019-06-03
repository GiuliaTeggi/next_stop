export const ActionTypes = {
  SelectStation: `SELECT_STATION`,
  UpdateStations: `UPDATE_STATION_RESULTS`,
  Reset: `RESET`,
  UpdateTrains: `UPDATE_TRAINS_RESULTS`,
  SortTrains: `SORT_TRAINS`
}

const checkResponse = (response) => {
  if (response.status !== 200) {
    throw new Error(`Error: response status ${response.status}`);
  }
  return response.json();
};

export const selectStation = (id, name) => dispatch => {
  return dispatch({
    type: ActionTypes.SelectStation,
    id,
    name
  })
}


export function findStation(station) {
  return (dispatch) => {
    return fetch(`https://api.tfl.gov.uk/StopPoint/Search/?query=${station}&includeHubs=false&modes=tube&maxResults=20&app_id=${process.env.APP_ID}&app_key=${process.env.APP_KEY}`)
      .then(checkResponse)
      .then(res => dispatch({
        type: ActionTypes.UpdateStations,
        stations: res
      }))
      .catch(err => { throw new Error(`Could not get stations error ${err}`) })
  }
}

export const reset = () => dispatch => {
  return dispatch({
    type: ActionTypes.Reset
  })
}

export function getTrains(id, name) {

  return (dispatch) => {
    return fetch(`https://api.tfl.gov.uk/StopPoint/${id}/arrivals/?app_id=${process.env.APP_ID}&app_key=${process.env.APP_KEY}`)
      .then(checkResponse)
      .then(res => dispatch({
        type: ActionTypes.UpdateTrains,
        trains: res,
        stationName: name,
        stationId: id
      }))
      .catch((err) => {
        throw new Error(`Could not get trains error ${err}`);
      })
  }
}

export const sortTrains = (field) => dispatch => {
  return dispatch({
    type: ActionTypes.SortTrains,
    field
  })
}
