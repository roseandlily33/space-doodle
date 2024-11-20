import React, { useMemo } from 'react';
import { LaunchContainer } from "./launch.styles";
import { TableContainer } from './history.styles';

const Upcoming = ({ launches, abortLaunch }) => {
  
  const tableBody = useMemo(() => {
    return launches
      .map((launch) => (
        <React.Fragment key={String(launch.flightNumber)}>
          <tr>
            <td style={{ paddingBlock: "2rem" }}>
              <p onClick={() => abortLaunch(launch.flightNumber)}>
                ✖
              </p>
            </td>
            <td>{launch.flightNumber}</td>
            <td>{new Date(launch.launchDate).toDateString()}</td>
            <td>{launch.mission}</td>
            <td>{launch.rocket}</td>
            <td>{launch.target}</td>
          </tr>
        </React.Fragment>
      ));
  }, [launches, abortLaunch]);

  return (
    <LaunchContainer>
      <h2>Upcoming missions including both SpaceX launches</h2>
      <h3 style={{color:'#fcba03', marginTop: '0.6em'}}>Warning! Clicking on the ✖ aborts the mission.</h3>
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
          {tableBody && tableBody}
        </tbody>
      </TableContainer>
    </LaunchContainer>
  );
};

export default Upcoming;