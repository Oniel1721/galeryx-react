import React, {useState} from "react";
import { Typography, TextField, Button } from "@material-ui/core";

import useStyles from './styles'
import API from "../../api/axios";

const SignupForm = (props:any) => {
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const error = { username: false, password: false };

  if (!username || username.length < 6 || username.length > 24)
    error.username = true;
  if (!password || password.length < 6 || password.length > 24)
    error.password = true;

    const handleSubmit = (e:any)=>{
      e.preventDefault()
      if(!error.username && !error.password){
        API.signup(username, password, (data:any)=>{
          props.setLogin(data.secretToken)
        })
      }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className={`${classes.root} ${props.showForm?classes.hidden:''}`}>
      <div>
        <Typography className={classes.title}>SIGN UP</Typography>
        <Typography className={classes.subTitle}>
          Have account already?{" "}
          <span onClick={props.handleClick} className={classes.span}>Sign in</span>
        </Typography>
      </div>
      <TextField
        required={true}
        id="up-username"
        placeholder="Username"
        variant="outlined"
        error={error.username}
        className={classes.textField}
        name="username"
        onChange={(e) => {
          setUsername(e.target.value);
        }}
        value={username}
        autoComplete="off"
        helperText="6-24 characters"
      />
      <TextField
        required={true}
        id="up-password"
        placeholder="Password"
        variant="outlined"
        error={error.password}
        className={classes.textField}
        name="password"
        type="password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        value={password}
        autoComplete="off"
        helperText="6-24 characters"
      />
      <Button type="submit" variant="contained" color="primary">
        Send
      </Button>
    </form>
  );
};

export default SignupForm;
