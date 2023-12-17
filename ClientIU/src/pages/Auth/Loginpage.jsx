import {
  Box,
  Avatar,
  Typography,
  Checkbox,
  Button,
  FormControlLabel,
  TextField,
  Link,
  Grid,
} from "@mui/material";
import "./login.scss";

import * as React from "react";

import logo from "../../assets/logo-small_logo.png";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Selector, UserInfo, changeRole, login, register,checkLogged } from "../../redux/userSlice";
import { getJobsList } from "../../redux/jobsSlice";
import Axios from "../../config/axiosConfig";


function Loginpage() {
  const navigate = useNavigate();
  //set role display
  const dispatch = useDispatch();
  let check = useSelector(UserInfo)
  const autoLogin=()=>{
    if(check.isLogin){
      CheckRoleUser(check.loggedUser.data.userRole)
    }
  }
  const checkUserLogged=async()=>{
    try {
      const userData = await dispatch(checkLogged())
      localStorage.setItem("userData",JSON.stringify(userData.payload.data))
      autoLogin()
    } catch (error) {
      return console.log(error)
    }
  }


  const CheckRoleUser = (role) => {
    if (role === "student") {
      navigate("Student");
      console.log("displayStudent");
    } else if (role === "teacher") {
      navigate("Teacher");
    } else if (role === "admin") {
      navigate("Admin");
    }
  };
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const dataRegister = {
      userId:data.get('email'),
      password:data.get('password')
    }

    try {
      console.log(dataRegister)   
      const userLogin = await dispatch(login(dataRegister))
      const userData = await dispatch(checkLogged())
      await localStorage.setItem("userData",JSON.stringify(userData.payload.data))
      CheckRoleUser(userLogin.payload.userRole) 
    } catch (error) {
      console.log(error)
    }
  };
React.useEffect(()=>{
  checkUserLogged()
  
 
},[])
  return (
    <div className="main-login">
      <div className="logo-header">
        <a className="logo" href="/login">
          <img className="logo-img" src={logo} alt="" />
          <div className="logo-text">
            <span className="logo-text-top">
              <b>Vietnam National University HCMC</b>
            </span>
            <span className="logo-text-bottom">
              <b>International University</b>
            </span>
          </div>
        </a>
      </div>
      {/* add box container for login */}
      <div className="box-contain">
        <Box
          sx={{
            display: "flex",
            width: { xs: 500, md: 1000 },
            height: 600,
            backgroundColor: "white",
            border: "2px solid whitesmoke",
            borderRadius: "3%",
            justifyContent: "center",
            alignItems: "center",
            boxShadow: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1 }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h3" color="#2977c9">
              Sign in
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
      </div>
    </div>
  );
}
export default Loginpage;
