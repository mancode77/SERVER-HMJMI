import path from "path";
import Work from "./../../models/work.js";
import fs from "fs-extra";
import createError from "../../../../utils/error.js";
import { workValidationSchema } from "../../middlewares/schema.js";
import responseSuccess from "../../../../utils/response-state.js";

export const updateWork = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    //* Cek work data tersedia atau tidak
    const work = await Work.findById(id);

    //! Jika data work tidak ada di db
    if (!work) {
      next(
        createError(
          404,
          "Maaf, data yang Anda minta tidak dapat ditemukan di server kami."
        )
      );
    }

    //! Validasi input 
    const { error, value } = workValidationSchema.validate(req.body);
    const __dirname = path.resolve();
  
    //!Jika input tidak sesuai validasi
    if (error) {
      next(createError(500, error.message));
    }

    //* Mengganti data work
    work.title = value.title;
    work.desc = value.desc;
    work.link = value.link;
    work.updatedAt = Date.now();
    if (req.file) {
      const thumbnail = work.thumbnail;
      if (!thumbnail) {
        work.thumbnail = req.file.path;
        await work.save();
      } else {
        const oldImage = path.join(__dirname, "..", "backend", work.thumbnail);
        if (fs.existsSync(oldImage)) {
          fs.unlinkSync(oldImage);
        }
        work.thumbnail = req.file.path;
        await work.save();
      }
    }

    //* Simpan data work dan muncul response 200
    work.save();
    responseSuccess(res, work)
  } catch (error) {
    next(createError(500, "Server Error"));
  }
};
