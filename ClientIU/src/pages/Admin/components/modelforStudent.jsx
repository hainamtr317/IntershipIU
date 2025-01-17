import React, { useMemo } from "react";

import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";

import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import UpdateIcon from "@mui/icons-material/Update";
import { Link, redirect, useNavigate } from "react-router-dom";

import {
  Modal,
  Box,
  Typography,
  CardContent,
  Button,
  Checkbox,
  Paper,
  TextField,
  StepLabel,
  Stepper,
  Divider,
  Step,
} from "@mui/material";

function StudentModal({ User }) {
  const steps = [
    "Apply job",
    "register Job",
    "internship",
    "White report",
    "grading",
  ];
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 700,
    bgcolor: "background.paper",
    border: "2px solid whitesmoke",
    borderRadius: "10px",
    boxShadow: 24,
    p: 4,
  };
  const textHolder = {
    display: "flex",
    flexDirection: "row",
    ml: "20px",
    mt: "10px",
  };
  const teacherInfoDisplay = {
    display: "flex",
    flexDirection: "column",
    width: 650,
    borderRadius: "10px",
    boxShadow: 24,
  };
  const styleBox = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "start",
  };
  const handleClickUpdate = async (e) => {
    e.preventDefault();
    var nameS = e.target.elements.name.value;
    var emailS = e.target.elements.email.value;
    var majorS = e.target.elements.major.value;
    var phoneS = e.target.elements.phone.value;
    var departmentS = e.target.elements.department.value;
    const dataUpdate = {
      name: nameS,
      email: emailS,
      phone: phoneS,
      Department: departmentS,
      major: majorS,
    };
    console.log(dataUpdate);
    try {
      await Axios.put("/api/admin/updateStudent", {
        StudentID: User._id,
        data: dataUpdate,
      }).then((res) => {
        if (res.data.success) {
          alert("update success");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box sx={style}>
      <h3>Hello {User.StudentId}</h3>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            ml: "20px",
          }}
        >
          <Box
            component="form"
            onSubmit={(e) => {
              handleClickUpdate(e);
            }}
            sx={teacherInfoDisplay}
          >
            <Box sx={textHolder}>
              <Box>
                <Typography
                  sx={{
                    mt: "12px",
                  }}
                >
                  Name:
                </Typography>
              </Box>
              <Box>
                <TextField
                  required
                  id="name"
                  name="name"
                  label="name"
                  sx={{ ml: "10px" }}
                  defaultValue={User.name}
                  variant="filled"
                ></TextField>
              </Box>
            </Box>

            <Box sx={textHolder}>
              <Box>
                <Typography
                  sx={{
                    mt: "12px",
                  }}
                >
                  Email:
                </Typography>
              </Box>
              <Box>
                <TextField
                  required
                  id="email"
                  name="email"
                  label="email"
                  sx={{ ml: "10px" }}
                  defaultValue={User.email}
                  variant="filled"
                ></TextField>
              </Box>
            </Box>

            <Box sx={textHolder}>
              <Box>
                <Typography
                  sx={{
                    mt: "12px",
                  }}
                >
                  Phone:
                </Typography>
              </Box>
              <Box>
                <TextField
                  id="phone"
                  name="phone"
                  label="phone"
                  sx={{ ml: "10px" }}
                  defaultValue={User.phone}
                  variant="filled"
                ></TextField>
              </Box>
            </Box>

            <Box sx={textHolder}>
              <Box>
                <Typography
                  sx={{
                    mt: "12px",
                  }}
                >
                  Major:
                </Typography>
              </Box>
              <Box>
                <TextField
                  required
                  id="major"
                  name="major"
                  label="Major"
                  //   sx={{ ml: "10px", width: "400px" }}
                  defaultValue={User.major}
                  variant="filled"
                ></TextField>
              </Box>
            </Box>

            <Box sx={textHolder}>
              <Box>
                <Typography
                  sx={{
                    mt: "12px",
                  }}
                >
                  Department:
                </Typography>
              </Box>
              <Box>
                <TextField
                  required
                  id="department"
                  name="department"
                  label="department"
                  sx={{ ml: "10px", width: "400px" }}
                  defaultValue={User.Department}
                  variant="filled"
                ></TextField>
              </Box>
            </Box>

            <Box
              sx={{
                mt: "10px",
                flex: 1,
                flexDirection: "row",
                display: "flex",
              }}
            >
              <Box
                sx={{
                  flex: 6,
                }}
              ></Box>
              <Button
                sx={{
                  flex: 1,
                }}
                variant="contained"
                size="medium"
                type="submit"
              >
                Update
              </Button>
            </Box>
          </Box>
        </Box>
        {/* display data user */}
        <Box sx={(teacherInfoDisplay, { ml: "25px", mt: "30px" })}>
          {!User.job ? (
            <Box sx={styleBox}>
              <Typography sx={{ fontWeight: "bold" }}>Job:</Typography>
              <Typography sx={{ ml: "20px" }}>Do not have job</Typography>
            </Box>
          ) : (
            <Box sx={styleBox}>
              <Typography sx={{ fontWeight: "bold" }}>Job:</Typography>
              <Typography sx={{ ml: "20px" }}>
                Job Name: {User.job.JobName}
              </Typography>
              <Typography sx={{ ml: "20px" }}>
                Address: {User.job.Address}
              </Typography>
              <Typography sx={{ ml: "20px" }}>
                Company: {User.job.Company}
              </Typography>
              <Typography sx={{ ml: "20px" }}>
                TypeOfCompany: {User.job.TypeofCompany}
              </Typography>
            </Box>
          )}
          {!User.teacher ? (
            <Box sx={styleBox}>
              <Typography sx={{ fontWeight: "bold" }}>Your Teacher:</Typography>
              <Typography sx={{ ml: "20px" }}> don't have</Typography>
            </Box>
          ) : (
            <Box sx={styleBox}>
              <Typography sx={{ fontWeight: "bold" }}>Your Teacher:</Typography>
              <Typography sx={{ ml: "20px" }}>
                Teacher name:{User.teacher.teacherName}
              </Typography>
              <Typography sx={{ ml: "20px" }}>
                Teacher Phone:{User.teacher.teacherPhone}
              </Typography>
              <Typography sx={{ ml: "20px" }}>
                Teacher Email:{User.teacher.teacherEmail}
              </Typography>
            </Box>
          )}
          {!User.instructor ? (
            <Box sx={styleBox}>
              <Typography sx={{ fontWeight: "bold" }}>
                Your Instructor:
              </Typography>
              <Typography sx={{ ml: "20px" }}>
                Do not register your Instructor
              </Typography>
            </Box>
          ) : (
            <Box sx={styleBox}>
              <Typography sx={{ fontWeight: "bold" }}>
                Your Instructor:
              </Typography>
              <Typography sx={{ ml: "20px" }}>
                Name: {User.instructor.name}
              </Typography>
              <Typography sx={{ ml: "20px" }}>
                email: {User.instructor.email}
              </Typography>
              <Typography sx={{ ml: "20px" }}>
                phone Number: {User.instructor.phone}
              </Typography>
              <Typography sx={{ ml: "20px" }}>
                Position in Company: {User.instructor.Position}
              </Typography>
            </Box>
          )}

          <Box>
            <Box sx={styleBox}>
              <Typography sx={{ fontWeight: "bold" }}>
                Your procession internship:
              </Typography>
            </Box>
            <Divider></Divider>
            <Box sx={{ width: "auto", marginTop: "20px" }}>
              <Stepper
                sx={{ width: "auto" }}
                activeStep={User.progressionStatus}
                alternativeLabel
              >
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>
                      <Typography variant="small">{label}</Typography>
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default StudentModal;
