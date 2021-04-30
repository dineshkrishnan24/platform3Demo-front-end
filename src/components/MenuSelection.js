import {
  Button,
  CircularProgress,
  Fade,
  FormControlLabel,
  FormLabel,
  Grid,
  makeStyles,
  Radio,
  RadioGroup,
} from "@material-ui/core";
import React, { useState } from "react";
import DataDisplay from "./DataDisplay";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(3),
  },
  button: {
    margin: theme.spacing(1, 1, 0, 0),
  },
  input: {
    display: "none",
  },
}));

export default function MenuSelection(props) {
  const classes = useStyles();
  const [menuName, setMenuName] = useState("CLAIM");
  const [finalName, setFinalName] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleRadioChange = (event) => {
    console.log("dinesh event name is ", event.target.value);
    setMenuName(event.target.value);
  };
  const onFileChange = (event) => {
    console.log("dinesh file change");
    setSelectedFile(event.target.files[0]);
  };
  const onFileUpload = () => {
    console.log("dinesh file upload ", selectedFile);
    if (selectedFile) {
      const formData = new FormData();
      setIsLoading(true);
      formData.append("file", selectedFile);
      const requestOptions = {
        method: "POST",
        body: formData,
      };
      fetch("http://127.0.0.1:9000/v1/demo/upload-data", requestOptions).then(
        (response) => {
          setIsLoading(false);
        }
      );
    }
  };

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <FormLabel component="legend">Choose Data to view :</FormLabel>
          <RadioGroup
            aria-label="quiz"
            name="quiz"
            value={menuName}
            onChange={handleRadioChange}
          >
            <FormControlLabel value="CLAIM" control={<Radio />} label="Claim" />
            <FormControlLabel
              value="MEMBER"
              control={<Radio />}
              label="Member"
            />
          </RadioGroup>
          <Button
            type="submit"
            variant="outlined"
            color="primary"
            className={classes.button}
            onClick={() => setFinalName(menuName)}
          >
            FETCH DATA
          </Button>
          <input
            accept="text/xml"
            id="contained-button-file"
            type="file"
            onChange={onFileChange}
          />
          <Button
            variant="contained"
            onClick={onFileUpload}
            color="primary"
            component="span"
          >
            Upload XML File
          </Button>
          <Fade
            in={isLoading}
            style={{
              transitionDelay: isLoading ? "800ms" : "0ms",
            }}
            unmountOnExit
          >
            <CircularProgress />
          </Fade>
        </Grid>
      </Grid>
      <DataDisplay menuName={finalName} />
    </>
  );
}
