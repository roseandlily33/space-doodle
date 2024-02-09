import { useMemo } from "react";
import { LaunchContainer } from "./launch.styles";
import {TableContainer } from './history.styles';

const Upcoming = props => {
  const { 
    launches,
    abortLaunch,
  } = props;

  const tableBody = useMemo(() => {
    return launches?.filter((launch) => launch.upcoming)
      .map((launch) => {
        return <tr key={String(launch.flightNumber)}>
          <td>
              <p onClick={() => abortLaunch(launch.flightNumber)}>
                ✖
              </p>
          </td>
          <td>{launch.flightNumber}</td>
          <td>{new Date(launch.launchDate).toDateString()}</td>
          <td>{launch.mission}</td>
          <td>{launch.rocket}</td>
          <td>{launch.target}</td>
        </tr>;
      });
  }, [launches, abortLaunch]);
  //took out classname.link from here and the <p>

  return (
  <LaunchContainer>
    <h3>Upcoming missions including both SpaceX launches and newly scheduled Zero to Mastery rockets.</h3>
    <h2 style={{color:'#fcba03', marginTop: '0.6em'}}>Warning! Clicking on the ✖ aborts the mission.</h2>
 
      <TableContainer>
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
      </TableContainer>
</LaunchContainer >)
}

export default (Upcoming);