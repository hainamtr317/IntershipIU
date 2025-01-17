import {
  Box,
  Typography,
  Divider,
  Button,
  LinearProgress,
} from "@mui/material";
import JobCard from "./Jobcard";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import Cvcard from "../Cv/Cvcard";
import SendIcon from "@mui/icons-material/Send";
import { JobData } from "./Data/jobData";
import { useNavigate, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import { checkLogged } from "../../redux/userSlice";
import { useDispatch } from "react-redux";
import "react-quill/dist/quill.snow.css";
import Axios from "../../config/axiosConfig";

function ApplyJob() {
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [dataUser, setDataUser] = useState();
  const [isHaveMainCv, setHaveMainCv] = useState(false);
  const [dataCv, setDataCv] = useState();
  const Jobid = useParams().job_id;
  const [Job, setJob] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userApplyJobHandle = async () => {
    dataUser.JobsApplied.push(Job);
    const newData = { ...dataUser };
    const data = await JSON.parse(localStorage.getItem("userData"));
    const dataApply = {
      userId: data.userId,
      data: newData,
      NameJob: Job.nameJob,
      toEmail: "naruto3172001@gmail.com",
      Cv: dataCv,
      Message: `<h1>Apply for ${Job.nameJob}</h1><p>${dataUser.StudentId}</p><p>${dataUser.name}</p><p>Contract:</p><p>${dataUser.email}</p><p>${dataUser.phone}</p><p>Short Introduction:</p> ${value}`,
    };
    console.log(dataApply);
    await Axios.put("/api/student/ApplyJob", dataApply).then(async (res) => {
      if (res.data.success) {
        alert("Success apply Jobs for", dataUser.name);
        navigate("/student/ListJobApplied");
      } else {
        alert(res.data.error.toString());
      }
    });
  };

  useEffect(() => {
    const checkUserLogged = async () => {
      if (localStorage.getItem("userData")) {
        const data = await JSON.parse(localStorage.getItem("userData"));
        await Axios.post("/api/users/getUserData", {
          userId: data.userId,
        }).then((res) => {
          setDataUser(res.data.UserData);
          setIsLoading(false);
        });
        try {
          const data = await Axios.post("/api/jobs/getJob", { id: Jobid }).then(
            (res) => {
              setJob(res.data.job);
            }
          );
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          const userData = await dispatch(checkLogged());
          await localStorage.setItem(
            "userData",
            JSON.stringify(userData.payload.data)
          );
          await Axios.post("/api/users/getUserData", {
            userId: userData.payload.data.userId,
          }).then((res) => {
            setDataUser(res.data.UserData);
            setIsLoading(false);
          });
          try {
            const data = await Axios.post("/api/jobs/getJob", {
              id: Jobid,
            }).then((res) => {
              setJob(res.data.job);
            });
          } catch (error) {
            console.log(error);
          }
        } catch (error) {
          return console.log(error);
        }
      }
    };
    checkUserLogged();
  }, []);
  useEffect(() => {
    const checkHaveCv = () => {
      if (dataUser) {
        if (dataUser.Cv.length > 0) {
          dataUser.Cv.map(async (e) => {
            console.log(e);
            if (e.MainCv) {
              await setDataCv(e);
              await setHaveMainCv(true);
            }
          });
        }
      }
    };
    checkHaveCv();
  }, [dataUser]);
  if (isLoading) {
    return (
      <Box>
        <LinearProgress>IsLoading...</LinearProgress>{" "}
      </Box>
    );
  }
  return (
    <>
      <Box>
        <Typography
          sx={{
            color: "#1976d2",
            marginLeft: "20px",
            marginTop: "20px",
          }}
          variant="h3"
        >
          <b>Apply Form:</b>
        </Typography>
        <Divider></Divider>
        <Box>
          <Typography
            sx={{
              color: "#1976d2",
              marginLeft: "20px",
              marginTop: "20px",
            }}
            variant="h4"
          >
            Your job want apply
          </Typography>
          <Divider></Divider>
          <Box
            sx={{
              marginLeft: "70px",
            }}
          >
            <JobCard JobData={Job} />
          </Box>
        </Box>
        <Box>
          <Typography
            sx={{
              color: "#1976d2",
              marginLeft: "20px",
              marginTop: "20px",
            }}
            variant="h4"
          >
            Your information:
          </Typography>
          <Divider></Divider>
          <Box
            sx={{
              marginLeft: "20px",
              marginTop: "20px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "column", lg: "row" },
                alignItems: "flex-start",
                justifyContent: "space-around",
              }}
            >
              <Box className="infoStu">
                <Typography>Student ID: {dataUser.StudentId}</Typography>
                <Typography>Student Name: {dataUser.name}</Typography>
                <Box>
                  <Typography>Contract:</Typography>
                  <Box
                    sx={{
                      marginLeft: "50px",
                    }}
                  >
                    <Typography>Email: {dataUser.email}</Typography>
                    <Typography>Phone Number: {dataUser.phone}</Typography>
                  </Box>
                </Box>
              </Box>
              <Box
                sx={{
                  marginLeft: "60px",
                }}
              >
                <Typography> Your CV:</Typography>
                {isHaveMainCv ? (
                  <Cvcard
                    CvData={dataUser.Cv.find((element) => element.MainCv)}
                    StudentId={dataUser._id}
                    isStudent={true}
                  ></Cvcard>
                ) : (
                  <Box
                    sx={{
                      flexDirection: "column",
                      justifyContent: "center",
                      alignContent: "center",
                    }}
                  >
                    <Typography>Don't have Main Cv</Typography>
                    <Typography>
                      please upload your Cv and check Main Cv
                    </Typography>
                  </Box>
                )}
              </Box>
            </Box>
            <Box sx={{ marginTop: "40px", marginLeft: "70px" }}>
              <Typography variant="h6">Short Introduction:</Typography>

              <Box sx={{ ml: "-50px", height: "100%" }}>
                <ReactQuill value={value} onChange={setValue} />
              </Box>
            </Box>
            <Button
              size="large"
              sx={{
                marginLeft: "40%",
              }}
              onClick={() => {
                userApplyJobHandle();
              }}
              variant="contained"
              endIcon={<SendIcon />}
            >
              Send
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default ApplyJob;
