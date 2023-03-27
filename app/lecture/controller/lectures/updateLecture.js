import Lecture from "../../models/lecture.js";
import { lectureSchema } from "../../middlewares/lecture.schema.js";
import path from "path";
import fs from "fs-extra";
import createError from "../../../../utils/error.js";
import responseSuccess from "../../../../utils/response-state.js";

export const updateLecture = async (req, res, next) => {
  try {
    const { id } = req.params;
    const lecture = await Lecture.findById(id);
    const { error, value } = lectureSchema.validate(req.body);
    const __dirname = path.resolve();

    if (error) {
      next(createError(400, error.message));
      return res.status(400).send({ message: error.message });
    }

    lecture.email = value.email;
    lecture.username = value.username;
    lecture.detailuser.fullname = value.fullname;
    lecture.detailuser.gender = value.gender;
    if (req.file) {
      const thumbnail = lecture.detailuser.thumbnail;
      if (!thumbnail) {
        lecture.detailuser.thumbnail = req.file.path;
        await lecture.save();
      } else {
        const oldImage = path.join(
          __dirname,
          "..",
          "backend",
          lecture.detailuser.thumbnail
        );
        if (fs.existsSync(oldImage)) {
          fs.unlinkSync(oldImage);
        }
        console.log(oldImage);
        lecture.detailuser.thumbnail = req.file.path;
        await lecture.save();
      }
    }

    if (!lecture) {
      next(
        createError(404, {
          message:
            "Maaf, data yang Anda minta tidak dapat ditemukan di server kami.",
        })
      );
    } else {
      lecture.save();
      responseSuccess(res, lecture)
    }
  } catch (error) {
    next(createError(500, "Server Error"))
  }
};
