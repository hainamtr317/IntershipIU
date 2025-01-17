import {
  Avatar,
  Box,
  Container,
  Divider,
  Step,
  Typography,
  Stepper,
  StepLabel,
  Button,
  CardActionArea,
  CardMedia,
  Card,
} from "@mui/material";
import Cvcard from "../Cv/Cvcard";
import GradingStudent from "../Teacher/GradingStudent";
import { useSelector, useDispatch } from "react-redux";
import { Modal, CloseModal } from "../../redux/modalActionSlice";
import ModalAnnouncementToStudent from "../Teacher/ModalAnnounment";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Axios from "../../config/axiosConfig";
import CvModal from "../Cv/Cvmodal";
function StudentDisplay() {
  const steps = ["Apply", "register", "working", "report", "grading"];
  const styleText = { marginLeft: "20px", color: "#1976d2", marginTop: "20px" };

  const [isHaveMainCv, setHaveMainCv] = useState(false);
  const ismodalOpen = useSelector(Modal);
  const { StudentId } = useParams();
  const [student, setStudent] = useState();
  const [IsLoading, setIsLoading] = useState(true);
  const [open, setOpen] = React.useState(false);
  const handleOpenReport = () => {
    console.log("hello student display");
    setOpen(true);
  };
  const handleCloseReport = () => setOpen(false);

  const dispatch = useDispatch();
  const HandleModalClose = () => {
    dispatch(CloseModal(false));
  };
  const handleVerifyJob = async () => {
    if (confirm("do you want verify Job")) {
      const data = {
        job: {
          ...student.job,
          JobVerified: true,
        },
        progressionStatus: 2,
      };
      console.log(data);
      await Axios.post("/api/teacher/JobVerify", {
        IdStudent: student._id,
        userId: JSON.parse(localStorage.getItem("userData")).userId,
        data: data,
      }).then((res) => {
        if (res.data.success) {
          alert("verify Job for student success");
        } else {
          alert(res.data.error.toString());
        }
      });
    }
  };
  useEffect(() => {
    const getStudentData = async () => {
      const data = await Axios.post("/api/student/getStudent", {
        StudentId: StudentId,
      }).then(async (res) => {
        await setStudent(res.data.data);

        setIsLoading(false);
      });
    };

    getStudentData();
  }, []);

  useEffect(() => {
    const checkHaveCv = () => {
      if (student) {
        console.log(student.hasOwnProperty("job"));
        if (student.Cv.length > 0) {
          student.Cv.map(async (e) => {
            if (e.MainCv) {
              await setHaveMainCv(true);
            }
          });
        }
      }
    };
    checkHaveCv();
  }, [student]);
  if (IsLoading) {
    return <h1>Loading...</h1>;
  }
  return (
    <>
      <GradingStudent
        Student={student}
        Open={ismodalOpen.Grade}
        Close={HandleModalClose}
      />
      <ModalAnnouncementToStudent
        Student={student}
        Open={ismodalOpen.Announce}
        Close={HandleModalClose}
      />
      <Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "80px",
          }}
        >
          <Avatar
            sx={{
              height: "100px",
              width: "100px",
            }}
            src={student.AvatarImage}
          ></Avatar>
          <Container
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="h4">{student.name}</Typography>
            <Typography variant="h4">ID: {student.StudentId}</Typography>
          </Container>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: "100px",

          marginLeft: "10px",
          marginBottom: "10px",

          alignItems: "flex-start",
          justifyContent: "space-around",
        }}
      >
        <Box>
          <Typography>Department: {student.Department}</Typography>
          <Typography>
            {" "}
            Job:
            {!student.job.hasOwnProperty("JobName")
              ? "Don't have Job"
              : `${student.job.JobName}`}{" "}
          </Typography>
          <Box>
            {!student.job.hasOwnProperty("Company") ? (
              <Box />
            ) : (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", xl: "row" },
                }}
              >
                <Typography>Company:</Typography>
                <Box
                  sx={{
                    marginLeft: "10px",
                  }}
                >
                  <Typography>Name of Company:{student.job.Company}</Typography>
                  <Typography>Address:{student.job.Address}</Typography>
                  <Typography>
                    Type of Company: {student.job.TypeofCompany}
                  </Typography>
                  {student.job.JobVerified ? (
                    <Button variant="contained" size="small">
                      verified
                    </Button>
                  ) : (
                    <Box>
                      <Typography>Click to verified Job of student</Typography>
                      <Button
                        variant="outlined"
                        onClick={handleVerifyJob}
                        size="small"
                      >
                        verify
                      </Button>
                    </Box>
                  )}
                </Box>
              </Box>
            )}

            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", xl: "row" },
              }}
            >
              <Typography>Instructor:</Typography>

              {!student.hasOwnProperty("instructor") ? (
                <Box>
                  <Typography>Do not have Instructor</Typography>
                </Box>
              ) : (
                <Box
                  sx={{
                    marginLeft: "10px",
                  }}
                >
                  <Typography>
                    Name of Instructor:{student.instructor.name}
                  </Typography>
                  <Typography>Phone:{student.instructor.phone}</Typography>
                  <Typography>Email:{student.instructor.email}</Typography>
                  <Typography>
                    Position:{student.instructor.Position}
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>
        </Box>
        <Box sx={{}}>
          <Typography
            sx={{
              color: "#1976d2",
            }}
          >
            Contract:
          </Typography>
          <Divider></Divider>
          <Typography> Email:{student.email}</Typography>
          <Typography>Phone Number:{student.phone}</Typography>
        </Box>
      </Box>
      <Box>
        <Typography variant="h5" sx={styleText}>
          StudentCV:
        </Typography>
        <Divider></Divider>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              borderStyle: "groove",
              border: "2px whitesmoke solid",
              borderRadius: "20px",
              boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
              width: "90%",
            }}
          >
            {isHaveMainCv ? (
              <Cvcard
                CvData={student.Cv.find((element) => element.MainCv)}
                StudentId={student._id}
                isStudent={false}
              ></Cvcard>
            ) : (
              <Box
                sx={{
                  flexDirection: "column",
                  justifyContent: "center",
                  alignContent: "center",
                }}
              >
                <Typography> Student Don't have Main Cv</Typography>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
      <Box>
        <Typography variant="h5" sx={styleText}>
          Report:
        </Typography>
        <Divider></Divider>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              borderStyle: "groove",
              border: "2px whitesmoke solid",
              borderRadius: "20px",
              width: "90%",
              minHeight: "100px",
              boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
            }}
          >
            <Typography
              variant="h5"
              sx={{
                color: "#1976d2",
                textAlign: "center",
                marginTop: "30px",
              }}
            >
              {student.report == "" ? (
                <>
                  <Typography> Don't have report</Typography>
                </>
              ) : (
                <>
                  <Card
                    sx={{
                      height: 250,
                      width: 400,
                      borderStyle: "groove",
                      border: "2px whitesmoke solid",
                      boxShadow: "8",
                      overflow: "hidden",
                      margin: "5px 5px 5px 0px",
                    }}
                  >
                    <CardActionArea onClick={handleOpenReport}>
                      <CardMedia
                        component="object"
                        class="mt-8 mb-5 ml-5 overflow-hidden pointer-events-none"
                        data={student.report}
                        height="90%"
                        width="90%"
                      ></CardMedia>
                    </CardActionArea>
                    <CvModal
                      Open={open}
                      Close={handleCloseReport}
                      dataFiles={student.report}
                    ></CvModal>
                  </Card>
                </>
              )}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box>
        <Typography variant="h5" sx={styleText}>
          Progression:
        </Typography>
        <Stepper
          sx={{ width: "auto" }}
          activeStep={student.progressionStatus}
          alternativeLabel
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>
                <Typography>{label}</Typography>
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
    </>
  );
}

export default StudentDisplay;
