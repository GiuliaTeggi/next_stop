const checkResponse = (response) => {
  if (response.status !== 200) {
    throw new Error(`Error: getData response status ${response.status}`);
  }
  return response.json();
};

const getTrains = () => fetch(`https://api.tfl.gov.uk/StopPoint/940GZZLUGPS/arrivals`)
  .then(checkResponse)
  .catch((err) => {
    throw new Error(`getTrains failed ${err}`);
  });

export default getTrains;