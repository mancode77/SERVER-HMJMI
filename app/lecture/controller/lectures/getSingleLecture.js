import Lecture from "../../models/lecture.js";
import createError from "../../../../utils/error.js";
import responseSuccess from "../../../../utils/response-state.js";

export const getSingleLecture = async (req, res, next) => {
  try {
    const lecture = await Lecture.findById(req.params.id);
    responseSuccess(res, lecture);
  } catch (error) {
    next(createError(500, "Sever Error"));
  }
};
