import React, {useState} from "react";
import Header from "../Header";
import Gallery from "../Gallery";
import { Grid } from "@material-ui/core";
import FadeScreen from "../FadeScreen";
import SigninForm from "../Forms/Signin";
import SignupForm from "../Forms/Signup";
import useLoged from "../../hooks/useLoged";

const Home = () => {
  const [showForm, setShowForm] = useState(true);
  const [search, setSearch] = useState("");
  const {loged, setLogin} = useLoged()

  const handleClick = () => {
    setShowForm(!showForm);
  };

  let hideSignin = !showForm,
  hideSignup = showForm

  if(loged){
    hideSignin = true
    hideSignup = true
  }
  
  return (
    <Grid container>
      <Header search={search} setSearch={setSearch}/>
      {loged && <Gallery search={search}/>}
      <FadeScreen active={!loged}>
        <SigninForm
          showForm={hideSignin}
          handleClick={handleClick}
          setLogin={setLogin}
        />
        <SignupForm
          showForm={hideSignup}
          handleClick={handleClick}
          setLogin={setLogin}
        />
      </FadeScreen>
    </Grid>
  );
};


export default Home;
