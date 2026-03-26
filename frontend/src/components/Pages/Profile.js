import React, { useState, useContext } from "react";
import { Typography, Button, TextField } from "@material-ui/core";
import EditIcon from "@mui/icons-material/Edit";
import "./profile.css";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "../../App";

function Profile() {
  // owndetail
  const { state, dispatch } = useContext(UserContext);
  console.log(state);

  const [updatemode, setUpdatemode] = useState(false);

  const [name, setName] = useState(state?.name);
  const [email, setEmail] = useState(state?.email);
  const updateDetails = () => {
    fetch(`http://localhost:8080/api/auth/updatedetails/${state._id}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        name: name,
        email: email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("localstorage update aba");
        localStorage.setItem(
          "user",
          JSON.stringify({ ...state, name: data.name, email: data.email })
        );
        dispatch({
          type: "UPDATEDETAILS",
          payload: { name: data.name, email: data.email },
        });
        setUpdatemode(false);
      })
      .catch((err) => console.log(err));
  };
  

  return (
    <div className="profilecontainer">
      <div>
        <div className="innerup">
          <div className="profileru">
            <img
              src={
                "https://icons.iconarchive.com/icons/icons8/ios7/256/Users-User-Male-2-icon.png"
              }
              style={{ borderRadius: "50%", height: 200, width: 200 }}
            />
            {updatemode ? (
              <TextField
                style={{ margin: " 30px 0px" }}
                id="standard-basic"
                name="name"
                label="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoFocus
              />
            ) : (
              <Typography
                style={{
                  fontSize: 20,
                  borderBottom: "2px solid black",
                  margin: " 30px 0px",
                  fontWeight: "bold",
                }}
              >
                {state ? state.name : "loading"}
              </Typography>
            )}
            {updatemode ? (
              <>
                <TextField
                  style={{ marginBottom: 30 }}
                  id="standard-basic"
                  name="email"
                  value={email}
                  label="Enter Email"
                  onChange={(e) => setEmail(e.target.value)}
                  autoFocus
                />
                <Button
                  onClick={updateDetails}
                  variant="outlined"
                  color="secondary"
                  style={{ marginTop: 30 }}
                >
                  Update Profile
                </Button>
              </>
            ) : (
              <Typography
                style={{
                  fontSize: 20,
                  borderBottom: "2px solid black",
                  fontWeight: "bold",
                  marginBottom: 30,
                }}
              >
                {state ? state.email : "loading"}
              </Typography>
            )}
          </div>

         
          </div>
           <Button
                   onClick={() => setUpdatemode(true)}
                  variant="outlined"
                  color="secondary"
                  style={{ marginTop: 30 }}
                >
                  EDIT Profile
                </Button>

        <hr />
      </div>
    </div>
  );
}

export default Profile;