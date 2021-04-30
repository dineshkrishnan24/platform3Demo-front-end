import { TextField, Button, Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";

export default function EditClaim(props) {
  const { id } = useParams();
  const [isSuccess, setIsSuccess] = useState(false);
  const history = useHistory();
  const [claimId, setClaimId] = useState("");
  const [subId, setSubId] = useState("");
  const [claimStatus, setClaimStatus] = useState("");
  const [memId, setMemId] = useState("");
  const [memRel, setMemRel] = useState("");
  const [admFromDate, setAdmFromDate] = useState("");
  const [admFromDateDtCompatible, setFromDateDtCompatiable] = useState("");
  const [admToDate, setAdmToDate] = useState("");
  const [admToDateDtCompatible, setAdmToDateDtCompatiable] = useState("");
  const [days, setDays] = useState("");
  const [provId, setProvId] = useState("");
  const [isLateFiled, setIsLateField] = useState("");

  useEffect(() => {
    fetch(`http://127.0.0.1:9000/v1/purchase/claims/${id}`)
      .then((resp) => resp.json())
      .then((data) => {
        setClaimId(data.claimId);
        setSubId(data.subId);
        setClaimStatus(data.claimStatus);
        setMemId(data.memId);
        setMemRel(data.memRel);
        setAdmFromDate(data.admFromDate);
        setFromDateDtCompatiable(data.admFromDateDtCompatible);
        setAdmToDate(data.admToDate);
        setAdmToDateDtCompatiable(data.admToDateDtCompatible);
        setDays(data.days);
        setProvId(data.provId);
        setIsLateField(data.isLateFiled);
      });
  }, []);
  const updateData = () => {
    let reqBody = {
      claimId,
      subId,
      claimStatus,
      memId,
      memRel,
      admFromDate,
      admFromDateDtCompatible,
      admToDate,
      admToDateDtCompatible,
      days,
      provId,
      isLateFiled,
    };
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reqBody),
    };
    fetch(
      `http://127.0.0.1:9000/v1/purchase/claims/${id}`,
      requestOptions
    ).then((resp) => {
      if (resp.status === 200) {
        setIsSuccess(true);
      }
    });
  };
  return (
    <div style={{ marginLeft: "10%" }}>
      <div>
        <TextField
          id="standard-required"
          onChange={(e) => setClaimId(e.target.value)}
          label="Claim Id"
          value={claimId}
        />
      </div>
      <div>
        <TextField
          id="standard-required"
          onChange={(e) => setSubId(e.target.value)}
          label="Subject Id"
          value={subId}
        />
      </div>
      <div>
        <TextField
          id="standard-required"
          onChange={(e) => setClaimStatus(e.target.value)}
          label="Claim Status"
          value={claimStatus}
        />
      </div>
      <div>
        <TextField
          id="standard-required"
          onChange={(e) => setMemId(e.target.value)}
          label="Member Id"
          value={memId}
        />
      </div>
      <div>
        <TextField
          id="standard-required"
          onChange={(e) => setMemRel(e.target.value)}
          label="Memmber Rel"
          value={memRel}
        />
      </div>
      <div>
        <TextField
          id="standard-required"
          onChange={(e) => setAdmFromDate(e.target.value)}
          label="From Dt"
          value={admFromDate}
        />
      </div>
      <div>
        <TextField
          id="standard-required"
          onChange={(e) => setFromDateDtCompatiable(e.target.value)}
          label="Comp From Dt"
          value={admFromDateDtCompatible}
        />
      </div>
      <div>
        <TextField
          id="standard-required"
          onChange={(e) => setAdmToDate(e.target.value)}
          label="TO Date"
          value={admToDate}
        />
      </div>
      <div>
        <TextField
          id="standard-required"
          onChange={(e) => setAdmToDateDtCompatiable(e.target.value)}
          label="Comp Date"
          value={admToDateDtCompatible}
        />
      </div>
      <div>
        <TextField
          id="standard-required"
          onChange={(e) => setDays(e.target.value)}
          label="Days"
          value={days}
        />
      </div>
      <div>
        <TextField
          id="standard-required"
          onChange={(e) => setProvId(e.target.value)}
          label="Prov Id"
          value={provId}
        />
      </div>
      <div>
        <TextField
          id="standard-required"
          onChange={(e) => setIsLateField(e.target.value)}
          label="Is Late Field"
          value={isLateFiled}
        />
      </div>

      <Button
        type="submit"
        variant="outlined"
        color="primary"
        onClick={() => updateData()}
      >
        UPDATE
      </Button>
      <Button
        type="submit"
        variant="outlined"
        color="primary"
        onClick={() => history.push("/")}
      >
        BACK
      </Button>
      {isSuccess ? <lable>Upload Success</lable> : <></>}
    </div>
  );
}
