import React, { useEffect } from "react";
import ClaimList from "./ClaimList";
import MemberList from "./MemberList";

export default function DataDisplay(props) {
  console.log("dinesh menu name :: ", props.menuName);
  return (
    <>
      {props.menuName === "MEMBER" ? <MemberList /> : <></>}
      {props.menuName === "CLAIM" ? <ClaimList /> : <></>}
    </>
  );
}
