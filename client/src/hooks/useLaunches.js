import { useCallback, useEffect, useState } from "react";

import {
  httpGetLaunches,
  httpSubmitLaunch,
  httpAbortLaunch,
} from './requests';

function useLaunches() {
  const [launches, saveLaunches] = useState([]);
  const [isPendingLaunch, setPendingLaunch] = useState(false);

  const getLaunches = useCallback(async () => {
    console.log('Main getting launches')
    const fetchedLaunches = await httpGetLaunches();
    saveLaunches(fetchedLaunches);
  }, []);

  useEffect(() => {
    console.log('Use Effect getting launches')
    getLaunches();
  }, [getLaunches]);

  const submitLaunch = useCallback(async (e) => {
    e.preventDefault();
    setPendingLaunch(true);
    const data = new FormData(e.target);
    const launchDate = new Date(data.get("launch-day"));
    const mission = data.get("mission-name");
    const rocket = data.get("rocket-name");
    const target = data.get("planets-selector");
    const response = await httpSubmitLaunch({
      launchDate,
      mission,
      rocket,
      target,
    });
   const success = response.ok;
    if (success) {
      alert('Was Successful');
    } else {
      alert('Wasnt Successful');
    }
    setPendingLaunch(false);
  }, []);

  const abortLaunch = async (id) => {
    console.log('Aborting Launch')
    const response = await httpAbortLaunch(id);
    const success = response.ok;
    if (success) {
      getLaunches();
      alert('Aborted Launch')
    } else {
      alert('Did not Aborted Launch')
    }
  };

  return {
    launches,
    isPendingLaunch,
    submitLaunch,
    abortLaunch,
  };
}

export default useLaunches;