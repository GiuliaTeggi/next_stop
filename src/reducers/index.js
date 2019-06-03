import { ActionTypes } from "../components/actions";
import { sortResultsByField } from "../utils";

const initialState = {
  isLoading: false,
  stations: [],
  trains: [],
  ascendingOrder: false,
  selectedStation: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.UpdateStations:
      return {
        ...state,
        stations: action.stations.matches
      }
    case ActionTypes.Reset:
      return {
        ...initialState
      }
    case ActionTypes.UpdateTrains:
      const updatedTrains = action.trains.sort((a, b) => new Date(a.expectedArrival) - new Date(b.expectedArrival));
      return {
        ...state,
        trains: [...updatedTrains],
        ascendingOrder: true,
        stations: [],
        selectedStation: {
          id: action.stationId,
          name: action.stationName,
        }
      };
    case ActionTypes.SortTrains:
      const sortedTrains = sortResultsByField(action.field, state.trains, state.ascendingOrder);
      return {
        ...state,
        trains: [...sortedTrains],
        ascendingOrder: !state.ascendingOrder
      }
    default:
      return state
  }
}