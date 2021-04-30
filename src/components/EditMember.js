import { TextField, Button, Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";

export default function EditMember(props) {
  const { id } = useParams();
  const [isSuccess, setIsSuccess] = useState(false);
  const history = useHistory();
  const [memId, setMemId] = useState("");
  const [subId, setSubId] = useState("");
  const [memFirstName, setMemFirstName] = useState("");
  const [memSecondName, setMemSecondName] = useState("");
  const [memRel, setMemRel] = useState("");
  const [memSex, setMemSex] = useState("");
  const [memDob, setMemDob] = useState("");
  const [memDobCompatible, setMemDobCompatible] = useState("");
  const [familyLinkId, setFamilyLinkId] = useState("");
  const [addrId, setAddrId] = useState("");
  const [isSub, setIsSub] = useState("");
  const [primaryAddrType, setPrimaryAddrType] = useState("");
  const [secondaryAddrType, setSecondaryAddrType] = useState("");
  useEffect(() => {
    fetch(`http://127.0.0.1:9000/v1/purchase/members/${id}`)
      .then((resp) => resp.json())
      .then((data) => {
        setMemId(data.memId);
        setSubId(data.subId);
        setMemFirstName(data.memFirstName);
        setMemSecondName(data.memSecondName);
        setMemRel(data.memRel);
        setMemSex(data.memSex);
        setMemDob(data.memDob);
        setMemDobCompatible(data.memDobCompatible);
        setFamilyLinkId(data.familyLinkId);
        setAddrId(data.addrId);
        setIsSub(data.isSub);
        setPrimaryAddrType(data.primaryAddrType);
        setSecondaryAddrType(data.secondaryAddrType);
      });
  }, []);
  const updateData = () => {
    let reqBody = {
      memId,
      subId,
      memFirstName,
      memSecondName,
      memRel,
      memSex,
      memDob,
      memDobCompatible,
      familyLinkId,
      addrId,
      primaryAddrType,
      secondaryAddrType,
    };
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reqBody),
    };
    fetch(
      `http://127.0.0.1:9000/v1/purchase/members/${id}`,
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
          onChange={(e) => setMemId(e.target.value)}
          label="Memmber Id"
          value={memId}
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
          onChange={(e) => setMemFirstName(e.target.value)}
          label="First Name"
          value={memFirstName}
        />
      </div>
      <div>
        <TextField
          id="standard-required"
          onChange={(e) => setMemSecondName(e.target.value)}
          label="Second Name"
          value={memSecondName}
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
          onChange={(e) => setMemSex(e.target.value)}
          label="Gende"
          value={memSex}
        />
      </div>
      <div>
        <TextField
          id="standard-required"
          onChange={(e) => setMemDobCompatible(e.target.value)}
          label="DOB"
          value={memDob}
        />
      </div>
      <div>
        <TextField
          id="standard-required"
          onChange={(e) => setMemDobCompatible(e.target.value)}
          label="Comp DOB"
          value={memDobCompatible}
        />
      </div>
      <div>
        <TextField
          id="standard-required"
          onChange={(e) => setFamilyLinkId(e.target.value)}
          label="Fam Link Id"
          value={familyLinkId}
        />
      </div>
      <div>
        <TextField
          id="standard-required"
          onChange={(e) => setAddrId(e.target.value)}
          label="Address Id"
          value={addrId}
        />
      </div>
      <div>
        <TextField
          id="standard-required"
          onChange={(e) => setIsSub(e.target.value)}
          label="is Sub"
          value={isSub}
        />
      </div>
      <div>
        <TextField
          id="standard-required"
          onChange={(e) => setPrimaryAddrType(e.target.value)}
          label="Primary Add Type"
          value={primaryAddrType}
        />
      </div>
      <div>
        <TextField
          id="standard-required"
          onChange={(e) => setSecondaryAddrType(e.target.value)}
          label="Secondary Add Type"
          value={secondaryAddrType}
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
