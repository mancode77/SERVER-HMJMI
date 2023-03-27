import Collage from '../../models/collage.js'
import createError from "../../../../utils/error.js";
import responseSuccess from "../../../../utils/response-state.js";

export const getSingleCollage = async (req, res, next) => {
  try {
    const collage = await Collage.findById(req.params.id);
    responseSuccess(res, collage);
  } catch (error) {
    next(createError(500, "Sever Error"));
  }
};
