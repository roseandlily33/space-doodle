const API_URL = process.env.REACT_APP_BACKEND_ROUTE;

// Gets all the planets
async function httpGetPlanets() {
   const response =  await fetch(`${API_URL}/planets`);
   let finishedPlanets = await response.json();
   return finishedPlanets;
}
// Gets the upcoming launches
async function httpUpcomingLaunches(){
  const response = await fetch(`${API_URL}/launches/upcoming`);
  let upcomingLaunches = await response.json();
  return upcomingLaunches;  
}

// Load launches, sort by flight number, and return as JSON.
async function httpGetLaunches() {
  const response = await fetch(`${API_URL}/launches`);
  const fetchedLaunches = await response.json();
  return fetchedLaunches.sort((a, b) => {
    return a.flightNumber - b.flightNumber;
  });
}

// Submit given launch data to launch system.
async function httpSubmitLaunch(launch) {
  try {
      return await fetch(`${API_URL}/launches`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(launch),
    });
  } catch(err) {
    return {
      ok: false,
    };
  }
}

// Delete launch with given ID.
async function httpAbortLaunch(id) {
  try {
    return await fetch(`${API_URL}/launches/${id}`, {
      method: "delete",
    });
  } catch(err) {
    console.log(err);
    return {
      ok: false,
    };
  }
}

export {
  httpGetPlanets,
  httpGetLaunches,
  httpSubmitLaunch,
  httpAbortLaunch,
  httpUpcomingLaunches
};