import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function ClaimList() {
  const classes = useStyles();
  const [claimData, setClaimData] = useState([]);
  const [isRefetch, setIsRefetch] = useState(false);
  const history = useHistory();
  const deleteRow = (id) => {
    const requestOptions = {
      method: "DELETE",
    };
    fetch(
      `http://127.0.0.1:9000/v1/purchase/claims/${id}`,
      requestOptions
    ).then((resp) => {
      setIsRefetch(!isRefetch);
    });
  };
  const editRow = (id) => {
    history.push(`/claims/${id}`);
  };
  useEffect(() => {
    fetch("http://127.0.0.1:9000/v1/purchase/claims")
      .then((response) => response.json())
      .then((data) => setClaimData(data));
  }, [isRefetch]);
  return (
    <TableContainer>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Delete Claim</TableCell>
            <TableCell>Edit Claim</TableCell>
            <TableCell>Claim ID</TableCell>
            <TableCell>Claim Status</TableCell>
            <TableCell>Sub ID</TableCell>
            <TableCell>Member Id</TableCell>
            <TableCell>Member Rel</TableCell>
            <TableCell>From Date</TableCell>
            <TableCell>Compitible From DT</TableCell>
            <TableCell>To Date</TableCell>
            <TableCell>Compitible To DT</TableCell>
            <TableCell>Days</TableCell>
            <TableCell>prov ID</TableCell>
            <TableCell>Is LateFiled</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {claimData.map((claim) => (
            <TableRow key={claim.id}>
              <TableCell>
                <IconButton onClick={() => deleteRow(claim.id)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
              <TableCell>
                <IconButton onClick={() => editRow(claim.id)}>
                  <EditIcon />
                </IconButton>
              </TableCell>
              <TableCell component="th" scope="row">
                {claim.claimId}
              </TableCell>
              <TableCell>{claim.claimStatus}</TableCell>
              <TableCell>{claim.subId}</TableCell>
              <TableCell>{claim.memId}</TableCell>
              <TableCell>{claim.memRel}</TableCell>
              <TableCell>{claim.admFromDate}</TableCell>
              <TableCell>{claim.admFromDateDtCompatible}</TableCell>
              <TableCell>{claim.admToDate}</TableCell>
              <TableCell>{claim.admToDateDtCompatible}</TableCell>
              <TableCell>{claim.days}</TableCell>
              <TableCell>{claim.provId}</TableCell>
              <TableCell>{claim.isLateFiled}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
