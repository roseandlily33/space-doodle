import { useMemo } from "react";
import { LaunchContainer } from "./launch.styles";
import {TableContainer} from './history.styles';

const History = props => {
  const {launches} = props;
  const tableBody = useMemo(() => {
    return launches?.filter((launch) => !launch.upcoming)
      .map((launch) => {
        return <tr key={String(launch.flightNumber)}>
          <td style={{paddingBlock: "2rem"}}>
            <span style={
              {color: launch.success ? "green" : "red"}
            }>█</span>
          </td>
          <td>{launch.flightNumber}</td>
          <td>{new Date(launch.launchDate).toDateString()}</td>
          <td >{launch.mission}</td>
          <td>{launch.rocket}</td>
          <td>{launch.customers?.join(", ")}</td>
        </tr>;
      });
  }, [launches]);

  return (
  <LaunchContainer>
      <h2>History of mission launches including SpaceX launches starting from the year 2006.</h2>
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