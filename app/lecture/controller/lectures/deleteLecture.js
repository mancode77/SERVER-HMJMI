import Lecture from "../../models/lecture.js";
import createError from "../../../../utils/error.js";
import responseSuccess from "../../../../utils/response-state.js";

export const deleteLecture = async (req, res, next) => {
  try {
    const { id } = req.params;
    const lecture = await Lecture.findById(id);

    //! Jika data tidak ada di db
    if (!lecture) {
      next(createError(404, {message: "Maaf, data yang Anda minta tidak dapat ditemukan di server kami."}))
    }

    //* Jika data ad di db
    lecture.deleteOne();
    responseSuccess(res, {
        message: "Data Berhasil Dihapus",
      })
  } catch (error) {
    next(createError(500, "Server Error"))
  }
};
