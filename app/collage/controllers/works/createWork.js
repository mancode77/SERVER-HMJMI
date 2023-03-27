import Work from './../../models/work.js'
import Collage from "../../models/collage.js"
import { workValidationSchema } from '../../middlewares/schema.js';
import createError from '../../../../utils/error.js';
import responseSuccess from '../../../../utils/response-state.js';

export const createWork = async (req, res, next) => {
  try {
    const { collageId } = req.params;

    //* Cek Data 
    const collage = await Collage.findById(collageId);
    //* Validation input
    const { error, value } = workValidationSchema.validate(req.body);

    //! Jika Validasi Error
    if (error) {
      next(createError(500, error.message));
    }

    const work = new Work({
      ...value,
      thumbnail: req.file.path ? req.file.path : "thumbnail",
      createdAt: Date.now(),
    });

    //* Simpan rok di database
    await work.save();

    //* Push / tambahkan data di collection Collage dan simpan
    collage.workcollage.push(work._id);
    await collage.save();

    //* Response
    responseSuccess(res, work);
  } catch (error) {
    //! Jika data collage tidak ditemukan
    next(
      createError(
        404,
        "Maaf, data yang Anda minta tidak dapat ditemukan di server kami."
      )
    );
  }
};