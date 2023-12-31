const express = require("express");
const routers = express.Router();

const {
  SetTeacherandStudent,
  CreateAnnounce,
  getUserDataToManager,
  getStudentList,
  adminUpdateStudent,
} = require("../controllers/AdminController");

routers.route("/admin/setTeacherAndStudent").post(SetTeacherandStudent);
routers.route("/admin/createAnnounce").post(CreateAnnounce);
routers.route("/admin/getUserData").post(getUserDataToManager);
routers.route("/admin/getStudentListID").get(getStudentList);
routers.route("/admin/updateStudent").put(adminUpdateStudent);

module.exports = routers;
