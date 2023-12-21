import { useMemo } from "react";

import Clickable from "../components/Clickable";


const Upcoming = props => {
  const { 
    entered,
    launches,
    classes,
    abortLaunch,
  } = props;

  const tableBody = useMemo(() => {
    return launches?.filter((launch) => launch.upcoming)
      .map((launch) => {
        return <tr key={String(launch.flightNumber)}>
          <td>
            <Clickable style={{color:"red"}}>
              <p className={classes.link} onClick={() => abortLaunch(launch.flightNumber)}>
                ✖
              </p>
            </Clickable>
          </td>
          <td>{launch.flightNumber}</td>
          <td>{new Date(launch.launchDate).toDateString()}</td>
          <td>{launch.mission}</td>
          <td>{launch.rocket}</td>
          <td>{launch.target}</td>
        </tr>;
      });
  }, [launches, abortLaunch, classes.link]);

  return <div id="upcoming" animate show={entered}>
    <p>Upcoming missions including both SpaceX launches and newly scheduled Zero to Mastery rockets.</p>
    <h2>Warning! Clicking on the ✖ aborts the mission.</h2>
 
      <table style={{tableLayout: "fixed"}}>
        <thead>
          <tr>
            <th style={{width: "3rem"}}></th>
            <th style={{width: "3rem"}}>No.</th>
            <th style={{width: "10rem"}}>Date</th>
            <th style={{width: "11rem"}}>Mission</th>
            <th style={{width: "11rem"}}>Rocket</th>
            <th>Destination</th>
          </tr>
        </thead>
        <tbody>
          {tableBody}
        </tbody>
      </table>
</div>
}

export default (Upcoming);