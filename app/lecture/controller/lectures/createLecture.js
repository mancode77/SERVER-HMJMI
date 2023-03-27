import Lecture from "../../models/lecture.js"
import { lectureSchema } from "../../middlewares/lecture.schema.js";
import createError from "../../../../utils/error.js";
import responseSuccess from "../../../../utils/response-state.js";

export const createLecture = async (req, res, next) => {
  try {
    const { email } = req.body;
    //* Validasi input 
    const { error, value } = lectureSchema.validate(req.body);

    //* Cek email sudah tedaftar atau belum
    const exsistLecture = await Lecture.findOne({ email: email });
    

    const lecture = new Lecture({
      ...value,
      createdAt: Date.now(),
    });

    //! Jika input error / bermasalah
    if (error) {
      next(createError(400, error.details[0].message))
    } else {
      //! Jika email sudah terdaftar
      if (exsistLecture) {
        next(createError(409, {message: `Akun dengan email ${email} tersebut sudah terdaftar`}))
      } else {
        //* Menyimpan data
        await lecture.save();
        responseSuccess(res, lecture)
      }
    }
  } catch (error) {
    next(createError(500, error))
  }
};
