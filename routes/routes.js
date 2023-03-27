import express from "express";
import {
  createLecture,
  getLecture,
  updateLecture,
  deleteLecture,
  getSingleLecture,
} from "../app/lecture/controller/controllerLecture.js";
import { imageLecture } from "../app/lecture/controller/controllerImage.js";
import {
  createCollage,
  getCollage,
  updateCollage,
  deleteCollage,
  getSingleCollage
} from "../app/collage/controllers/controllerCollages.js";
import { imageCollage } from "../app/collage/controllers/controllerImage.js";
import {
  createWork,
  getWork,
  updateWork,
  deleteWork,
} from "../app/collage/controllers/controllerCollageWork.js";
import { login } from "../controllers/generalLogin.js";
import { logout } from "../controllers/generallogout.js";
import upload from "../middlewares/multer.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { refreshToken } from "../middlewares/refreshToken.js";

const router = express.Router();

//admin/dosen
router.get("/lecture", getLecture);
router.get("/lecture/:id", getSingleLecture);
router.post("/register/lecture", createLecture);
router.put("/lecture/:id", upload.single("image"), updateLecture);
router.delete("/lecture/:id", deleteLecture);
router.get("/imagelecture/:filepath", imageLecture);

//mahasiswa
router.get("/collage", getCollage);
router.get("/collage/:id", getSingleCollage);
router.post("/register/collage", createCollage);
router.put("/collage/:id", upload.single("image"), updateCollage);
router.delete("/collage/:id", deleteCollage);
router.get("/imagecollage/:filepath", imageCollage);

//karya mahasiswa
router.get("/work", getWork);
router.post("/work/collage/:collageId", upload.single("image"), createWork);
router.put("/work/:id", upload.single("image"), updateWork);
router.delete("/work/:workId/collage/:collageId", deleteWork);

//login
router.post("/login", login);
router.get("/token", refreshToken);
router.delete("/logout", logout);

export default router;
