import { useMemo } from "react";
import { LaunchContainer } from "./launch.styles";
import {TableContainer} from './history.styles';
const History = props => {
  console.log('History', props)
  const tableBody = useMemo(() => {
    return props.launches?.filter((launch) => !launch.upcoming)
      .map((launch) => {
        return <tr key={String(launch.flightNumber)}>
          <td>
            <span style={
              {color: launch.success ? "greenyellow" : "red"}
            }>█</span>
          </td>
          <td>{launch.flightNumber}</td>
          <td>{new Date(launch.launchDate).toDateString()}</td>
          <td>{launch.mission}</td>
          <td>{launch.rocket}</td>
          <td>{launch.customers?.join(", ")}</td>
        </tr>;
      });
  }, [props.launches]);

  return (
  <LaunchContainer>
      <h3>History of mission launches including SpaceX launches starting from the year 2006.</h3>
        <TableContainer>
          <thead>
            <tr>
              <th style={{width: "2rem"}}></th>
              <th style={{width: "3rem"}}>No.</th>
              <th style={{width: "9rem"}}>Date</th>
              <th>Mission</th>
              <th style={{width: "7rem"}}>Rocket</th>
              <th>Customers</th>
            </tr>
          </thead>
          <tbody>
            {tableBody}
          </tbody>
        </TableContainer>
  </LaunchContainer>);
}
  
export default History;