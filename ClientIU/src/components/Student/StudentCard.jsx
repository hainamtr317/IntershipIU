import {
  Avatar,
  Card,
  Container,
  Step,
  StepLabel,
  Stepper,
  Typography,
  Box,
  CardActionArea,
} from "@mui/material";
import { Link } from "react-router-dom";

function StudentCard(props) {
  const StudentData = props.data;
  const steps = ["Apply", "Register", "Internship", "Report", "Grading"];
  const handleStudentcards = () => {};
  return (
    <>
      <Card
        className="studentCard"
        sx={{
          height: 350,
          width: 260,
          borderStyle: "groove",
          border: "2px whitesmoke solid",
          borderRadius: "20px",
          boxShadow: "8",
          background:
            "linear-gradient(191deg, rgba(88,54,189,1) 19%, rgba(25,118,210,1) 57%, rgba(180,201,223,1) 100%)",
          overflow: "hidden",
        }}
      >
        <Link to={StudentData.StudentId}>
          <CardActionArea onClick={handleStudentcards}>
            <Box sx={{ marginLeft: "5px", marginTop: "5px" }}>
              <img src="/logo-favicon-50x50.png" alt="" />
            </Box>
            <Container
              sx={{
                width: "100%",
                marginTop: "-20px",
              }}
            >
              <center>
                <Avatar
                  sx={{
                    height: "100px",
                    width: "100px",
                  }}
                  src={StudentData.AvatarImage}
                ></Avatar>
              </center>
              <Box
                sx={{
                  marginTop: "20px",
                }}
              >
                <Typography
                  sx={{
                    color: "white",
                  }}
                >
                  <b>Name:</b> {StudentData.name}
                </Typography>
                <Typography
                  sx={{
                    color: "white",
                    ml: "12px",
                  }}
                ></Typography>
                <Typography
                  sx={{
                    color: "white",
                  }}
                >
                  <b>ID:</b>
                  {StudentData.StudentId}
                </Typography>
                <Typography
                  sx={{
                    color: "white",
                  }}
                >
                  <b>Job:</b>
                  {!StudentData.job.hasOwnProperty("JobName")
                    ? "Don't have Job"
                    : `${StudentData.job.JobName}`}
                </Typography>
                <Typography
                  sx={{
                    color: "white",
                  }}
                >
                  <b>Company:</b>
                  {!StudentData.job.hasOwnProperty("JobName")
                    ? "Don't have Job"
                    : `${StudentData.job.Company}`}
                </Typography>
              </Box>
            </Container>

            {/*process of student */}
            <Box sx={{ width: "auto", marginTop: "40px" }}>
              <Stepper
                sx={{ width: "auto", zoom: "0.8" }}
                activeStep={StudentData.progressionStatus}
                alternativeLabel
              >
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>
                      <Typography variant="small" sx={{ color: "white" }}>
                        {label}
                      </Typography>
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Box>
          </CardActionArea>
        </Link>
      </Card>
    </>
  );
}

export default StudentCard;
