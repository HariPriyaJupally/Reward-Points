import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  table: {
    margin: "25px"
  }
});

export default function UserTable({ rows, headers }) {
  const classes = useStyles();
  return rows?.length ? (
    
      <TableContainer className={classes.table} component={Paper}>
        <Table size="small" aria-label="user table">
          <TableHead>
            <TableRow>
              {headers.map((header) => (
                <TableCell key={`key${Object.values(header)[0]}`}>
                  {Object.values(header)[0]}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.custid}>
                {headers.map((header) => (
                  <TableCell key={`value_${Object.keys(header)[0]}`}>
                    {row[Object.keys(header)[0]]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    
  ) : (
    <h3>No Data Available</h3>
  );
}
