import React from "react";
import "./home.css";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";

import { withStyles } from "@material-ui/core/styles";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";

import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const Accordion = withStyles({
  root: {
    border: "1px solid rgba(0, 0, 0, .125)",
    boxShadow: "none",
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&:before": {
      display: "none",
    },
    "&$expanded": {
      margin: "auto",
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    backgroundColor: "rgba(0, 0, 0, .03)",
    borderBottom: "1px solid rgba(0, 0, 0, .125)",
    marginBottom: -1,
    minHeight: 56,
    "&$expanded": {
      minHeight: 56,
    },
  },
  content: {
    "&$expanded": {
      margin: "12px 0",
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiAccordionDetails);

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: "5%",
  },
  paper: {
    padding: 20,
    boxShadow: "1px 1px 5px gray",
  },
  outer: {
    width: "80%",
    margin: "auto",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  inner: {
    padding: 30,
    boxShadow: "1px 2px 5px 2px  gray",
  },
  eachdetails: {
    marginBottom: 10,
    paddingBottom: 10,

    borderBottom: "0.2px solid gray",
  },
}));

function Home() {
  const classes = useStyles();

  const [fullname, setFullname] = useState();
  const [age, setAge] = useState();
  const [gender, setGender] = useState();
  const [nickname, setNickName] = useState();
  const [address, setAddress] = useState();
  const [phoneone, setPhoneone] = useState();
  const [phonetwo, setPhonetwo] = useState();
  const [category, setCategory] = useState();

  const [select, setSelect] = useState("All");

  const handleSubmit = () => {
    fetch("http://localhost:8080/api/contact/createcontact", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        fullname,
        age,
        gender,
        nickname,
        address,
        phoneone,
        phonetwo,
        category,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  const [data, setData] = useState([]);

  const [expanded, setExpanded] = React.useState("panel1");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  // delete added contact
  const deleteAContact = (contactId) => {

    fetch(`http://localhost:8080/api/contact/delete/${contactId}`, {
      method: "delete",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        const newcData = data.filter((each) => {
          return each._id != result._id;
        });
        setData(newcData);
      });
  };

  useEffect(() => {
    fetch(`http://localhost:8080/api/contact/my/${select}`, {
      method: "get",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setData(result.mycontact);
      });
  }, [select]);


  const updateHandler =()=>{
    alert("This option will be available on premium version,SO... Do subscribe my channel to make this happen.Click on the 'About' Text")

  }



  return (
    <div className="home">
      <div className="App">
        <h1
          style={{
            textAlign: "center",
            color: "#ff0066",
            backgroundColor: "#222f3e",
            padding: "15px",
            borderRadius: "10px",
          }}
        >
          Contact Management
        </h1>
        <Accordion
          square
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
          style={{ marginBottom: 40 }}
        >
          <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
            <Typography>About Us</Typography>
          </AccordionSummary>
          <AccordionDetails style={{padding:"30px 60px"}}>
            <Typography>
              We are initDevelops (Let's Fly together) & basically this is our product.
              initContact is the web based simple contact manager application,
              you can use it as a place where you can put some of your important
              contacts and details.
              <a href='https://youtu.be/kw1M9uiT4_c'>Click</a>
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Grid container spacing={3}>
          <Grid item xs={3}>
            <Paper className={classes.paper}>
              <h2 style={{ textAlign: "center" }}>
                Fill up The Person's Details
              </h2>
              <div style={{ textAlign: "center" }}>
                <TextField
                  id="outlined-basic"
                  className="textfield"
                  style={{ marginBottom: "20px" }}
                  label="Full Name"
                  variant="outlined"
                  onChange={(e) => {
                    setFullname(e.target.value);
                  }}
                  value={fullname}
                />
                <TextField
                  id="outlined-basic"
                  className="textfield"
                  style={{ marginBottom: "20px" }}
                  label="Nick Name"
                  variant="outlined"
                  onChange={(e) => {
                    setNickName(e.target.value);
                  }}
                  value={nickname}
                />
                <TextField
                  id="outlined-basic"
                  className="textfield"
                  style={{ marginBottom: "20px" }}
                  label="Age "
                  variant="outlined"
                  onChange={(e) => {
                    setAge(e.target.value);
                  }}
                  value={age}
                  type={Number}
                />
                <RadioGroup
                  aria-label="quiz"
                  name="quiz"
                  value={gender}
                  onChange={(e) => {
                    setGender(e.target.value);
                  }}
                  style={{ marginBottom: "25px" }}
                >
                  <h3 style={{ color: "black" }}>Gender</h3>

                  <FormControlLabel
                    value="Male"
                    control={<Radio />}
                    label="Male"
                    style={{ color: "black" }}
                  />
                  <FormControlLabel
                    value="Female"
                    control={<Radio />}
                    label="female"
                    style={{ color: "black" }}
                  />
                </RadioGroup>
                <TextField
                  id="outlined-basic"
                  className="textfield"
                  style={{ marginBottom: "20px" }}
                  label="Address"
                  variant="outlined"
                  onChange={(e) => {
                    setAddress(e.target.value);
                  }}
                  value={address}
                />
                <TextField
                  id="outlined-basic"
                  className="textfield"
                  style={{ marginBottom: "20px" }}
                  label="Phone no 1."
                  variant="outlined"
                  onChange={(e) => {
                    setPhoneone(e.target.value);
                  }}
                  value={phoneone}
                  type={Number}
                />
                <TextField
                  id="outlined-basic"
                  className="textfield"
                  style={{ marginBottom: "20px" }}
                  label="Phone no 2."
                  variant="outlined"
                  onChange={(e) => {
                    setPhonetwo(e.target.value);
                  }}
                  value={phonetwo}
                  type={Number}
                />
                <div
                  style={{
                    width: "90%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <h3 style={{ marginBottom: "20px" }}>Category</h3>
                  <FormControl
                    variant="outlined"
                    className={classes.formControl}
                  >
                    <Select
                      native
                      onChange={(e) => setCategory(e.target.value)}
                      style={{ width: "100%" }}
                    >
                      <option aria-label="None" value={category} />
                      <option value={"Vimp"} className="textfield">
                        Very Imp
                      </option>
                      <option value={"Intermed"}>Intermediate</option>
                      <option value={"NotImp"}>Not important</option>
                    </Select>
                  </FormControl>
                </div>
              </div>
              <div style={{ marginTop: "40px" }}>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={handleSubmit}
                >
                  Submit Details
                </Button>
              </div>
            </Paper>
          </Grid>
          <Grid item xs={9} style={{ padding: 20 }}>
            <div style={{ width: "30%" }}>
              <h2 style={{ color: "black", textAlign: "left" }}>Filter</h2>
              <RadioGroup
                aria-label="quiz"
                name="quiz"
                value={select}
                onChange={(e) => {
                  setSelect(e.target.value);
                }}
                style={{
                  marginBottom: "25px",
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <FormControlLabel
                  value="All"
                  control={<Radio />}
                  label="All"
                  style={{ color: "black" }}
                />
                <FormControlLabel
                  value="Vimp"
                  control={<Radio />}
                  label="Important"
                  style={{ color: "black" }}
                />
                <FormControlLabel
                  value="Intermed"
                  control={<Radio />}
                  label="Normal"
                  style={{ color: "black" }}
                />
              </RadioGroup>
            </div>

            <div className={classes.outer}>
              {data.map((val, i) => {
                return (
                  <div style={{ margin: "20px", width: "45%" }} key={i}>
                    <div className={classes.inner}>
                      <div className={classes.eachdetails}>
                        <div
                          style={{
                            display: "flex",
                            width: "70%",
                            alignItems: "center",
                            margin: "auto",
                            justifyContent: "space-between",
                            marginBottom: 10,
                          }}
                        >
                          <div style={{ width: "20%" }}>
                            <Avatar style={{ backgroundColor: "#FF0066" }}>
                              {val.fullname.slice(0, 1).toUpperCase()}
                            </Avatar>
                          </div>
                          <h3
                            style={{
                              textAlign: "left",
                              width: "80%",
                              padding: 0,
                              margin: 0,
                            }}
                          >
                            {val.fullname}
                          </h3>
                        </div>
                      </div>
                      <div className={classes.eachdetails}>
                        <h3
                          style={{ padding: 0, margin: 0, textAlign: "left" }}
                        >
                          From : {val.address}
                        </h3>
                        <p
                          style={{ textAlign: "center", padding: 0, margin: 0 }}
                        ></p>
                      </div>
                      <div className={classes.eachdetails}>
                        <h3
                          style={{ padding: 0, margin: 0, textAlign: "left" }}
                        >
                          What you call {val.gender == "Male" ? "Him" : "Her"}
                        </h3>
                        <p
                          style={{ textAlign: "center", padding: 0, margin: 0 }}
                        >
                          {val.nickname}
                        </p>
                      </div>
                      <div className={classes.eachdetails}>
                        <h3
                          style={{ padding: 0, margin: 0, textAlign: "left" }}
                        >
                          Age : {val.age}
                        </h3>
                      </div>
                      <div
                        className={classes.eachdetails}
                        style={{ paddingBottom: 10 }}
                      >
                        <h3
                          style={{ padding: 0, margin: 0, textAlign: "left" }}
                        >
                          Phone No:{" "}
                          <span style={{ Width: "bold", color: "#222f3e" }}>
                            {val.phoneone}
                          </span>
                        </h3>
                        {val.phonetwo ? (
                          <h3
                            style={{ padding: 0, margin: 0, textAlign: "left" }}
                          >
                            Secondary Phone No: {val.phonetwo}
                          </h3>
                        ) : (
                          <p style={{ padding: 0, color: "green", margin: 0 }}>
                            Secondary PhoneNo. is not available.
                          </p>
                        )}
                      </div>

                      <div className={classes.eachdetails}>
                        <h3
                          style={{
                            padding: 0,
                            margin: 0,
                            color: "gray",
                            textAlign: "left",
                          }}
                        >
                          Created At :{" "}
                          <span style={{ fontSize: 14 }}>
                            {new Date(val.createdAt).toDateString()}
                          </span>
                        </h3>
                      </div>

                      <Button
                      onClick={() => updateHandler(val._id)}
                      >
                        Update
                      </Button>
                      <Button
                        variant="outlined"
                        onClick={() => deleteAContact(val._id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default Home;
