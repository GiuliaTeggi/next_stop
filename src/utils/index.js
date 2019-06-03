export const sortResultsByField = (field, trains, ascendingOrder) => {
  const sortedTrains = ((trains, field) => {
    switch (field) {
      case "due":
        return trains.sort((a, b) => sortResults(ascendingOrder, new Date(a.expectedArrival), new Date(b.expectedArrival)))
      case "destination":
        return trains.sort((a, b) => sortResults(ascendingOrder, a.towards.localeCompare(b.towards), b.towards.localeCompare(a.towards)));
      case "line":
        return trains.sort((a, b) => sortResults(ascendingOrder, a.lineName.localeCompare(b.lineName), b.lineName.localeCompare(a.lineName)));
      case "platform":
        return trains.sort((a, b) => sortResults(ascendingOrder, getPlatformNumber(a.platformName), getPlatformNumber(b.platformName)));
      default:
        return trains;
    }
  })(trains, field);
  return sortedTrains;
}

export const sortResults = (ascending, firstElement, secondElement) => ascending ? secondElement - firstElement : firstElement - secondElement;

export const getPlatformNumber = (platformName) => +platformName.match(/\d+/g);