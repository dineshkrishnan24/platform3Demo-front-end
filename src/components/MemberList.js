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

export default function MemberList() {
  const classes = useStyles();
  const [memberData, setMemberData] = useState([]);
  const [isRefetch, setIsRefetch] = useState(false);
  const history = useHistory();
  const deleteRow = (id) => {
    const requestOptions = {
      method: "DELETE",
    };
    fetch(
      `http://127.0.0.1:9000/v1/purchase/members/${id}`,
      requestOptions
    ).then((resp) => {
      setIsRefetch(!isRefetch);
    });
  };
  const editRow = (id) => {
    history.push(`/members/${id}`);
  };
  useEffect(() => {
    fetch("http://127.0.0.1:9000/v1/purchase/members")
      .then((response) => response.json())
      .then((data) => setMemberData(data));
  }, [isRefetch]);
  return (
    <TableContainer>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Delete Member</TableCell>
            <TableCell>Edit Member</TableCell>
            <TableCell>Member ID</TableCell>
            <TableCell>Subject ID</TableCell>
            <TableCell>First Name</TableCell>
            <TableCell>Second Name</TableCell>
            <TableCell>Relation</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>DOB</TableCell>
            <TableCell>Compitible DOB</TableCell>
            <TableCell>Family Link Id</TableCell>
            <TableCell>Address ID</TableCell>
            <TableCell>Is Sub</TableCell>
            <TableCell>Primary Addr</TableCell>
            <TableCell>Secondary Addr</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {memberData.map((member) => (
            <TableRow key={member.id}>
              <TableCell>
                <IconButton onClick={() => deleteRow(member.id)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
              <TableCell>
                <IconButton onClick={() => editRow(member.id)}>
                  <EditIcon />
                </IconButton>
              </TableCell>
              <TableCell component="th" scope="row">
                {member.memId}
              </TableCell>
              <TableCell>{member.subId}</TableCell>
              <TableCell>{member.memFirstName}</TableCell>
              <TableCell>{member.memSecondName}</TableCell>
              <TableCell>{member.memRel}</TableCell>
              <TableCell>{member.memSex}</TableCell>
              <TableCell>{member.memDob}</TableCell>
              <TableCell>{member.memDobCompatible}</TableCell>
              <TableCell>{member.familyLinkId}</TableCell>
              <TableCell>{member.addrId}</TableCell>
              <TableCell>{member.isSub}</TableCell>
              <TableCell>{member.primaryAddrType}</TableCell>
              <TableCell>{member.secondaryAddrType}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
