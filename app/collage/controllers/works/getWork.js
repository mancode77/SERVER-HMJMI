import Work from "./../../models/work.js";
import responseSuccess from "../../../../utils/response-state.js";
import createError from "../../../../utils/error.js";

export const getWork = async (req, res, next) => {
  try {
    const work = await Work.find();

    if (!work) {
      next(
        createError(
          404,
          "Maaf, data yang Anda minta tidak dapat ditemukan di server kami."
        )
      );
    }

    responseSuccess(res, work)
  } catch (error) {
    next(
      createError(
        500,
        "Server Error"
      )
    );
  }
};
