import Lecture from "../app/lecture/models/lecture.js";
import Collage from "../app/collage/models/collage.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Joi from "joi";

const loginValidate = new Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

export const login = async (req, res) => {
  try {
    const { error, value } = loginValidate.validate(req.body);
    const lecture = await Lecture.findOne({ username: value.username });
    const collage = await Collage.findOne({ username: value.username });

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    if (lecture) {
      const matchLecture = await bcrypt.compare(
        value.password,
        lecture.password
      );

      if (!matchLecture) {
        return res.status(400).json({ message: "Masukan password yang terdaftar" });
      }

      const lectureId = lecture._id;
      const lectureRole = lecture.role
      const accessToken = jwt.sign(
        { id: lectureId, role: lectureRole },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1d" }
      );
      const refreshToken = jwt.sign(
        { id: lectureId },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "1d" }
      );
      await lecture.updateOne({ refresh_token: refreshToken });
      res.cookie("refreshtoken", refreshToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
      res.json({ accessToken });
    }

    if (collage) {
      const matchCollage = await bcrypt.compare(
        value.password,
        collage.password
      );

      if (!matchCollage) {
        return res.status(400).json({ message: "Wrong password" });
      }

      const collageId = collage._id;
      const collageRole = collage.role
      const accessToken = jwt.sign(
        { id: collageId, role: collageRole },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1d" }
      );
      const refreshToken = jwt.sign(
        { id: collageId },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "1d" }
      );
      await collage.updateOne({ refresh_token: refreshToken });
      res.cookie("refreshtoken", refreshToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
      res.json({ accessToken });
    }

    if (!lecture || !collage) {
      return res.status(404).json({ message: "Masukan username yang terdaftar" });
    }
  } catch (error) {
    console.log(error);
  }
};
