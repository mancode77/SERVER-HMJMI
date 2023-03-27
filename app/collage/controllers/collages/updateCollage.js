import path from "path";
import Collage from "../../models/collage.js";
import { collageValidationSchema } from "./../../middlewares/schema.js";
import fs from "fs-extra";
import createError from "../../../../utils/error.js";

export const updateCollage = async (req, res, next) => {
  try {
    const { id } = req.params;

    //* Mencari 1 data mahasiswa
    const collage = await Collage.findById(id);

    //*Validasi
    const { error, value } = collageValidationSchema.validate(req.body);
    
    //* Mengetahui letak directory saat ini
    const __dirname = path.resolve();

    //! Menangani error
    if (error) {
      next(createError(400, error.details[0].message));
    }

    collage.email = value.email;
    collage.username = value.username;
    collage.status = value.status;
    collage.detailuser.fullname = value.fullname;
    collage.detailuser.gender = value.gender;
    collage.updatedAt = Date.now();

    //* Hanlde jika request berupa file
    if (req.file) {
      //* Dapatkan path file dari request
      const thumbnail = collage.detailuser.thumbnail;
      //* Handle jika path file tidak ada
      if (!thumbnail) {
        collage.detailuser.thumbnail = req.file.path;
        await collage.save();
      } else {
        const oldImage = path.join(
          __dirname,
          "..",
          "backend",
          collage.detailuser.thumbnail
        );
        if (fs.existsSync(oldImage)) {
          fs.unlinkSync(oldImage);
        }
        collage.detailuser.thumbnail = req.file.path;
        await collage.save();
      }
    }

    if (!collage) {
      return res.json({
        took: 404,
        status: "Not Found",
        data: null,
        errors: {
          message:
            "Maaf, data yang Anda minta tidak dapat ditemukan di server kami.",
        },
      });
    } else {
      collage.save();
      return res.json({
        took: 200,
        status: "OK",
        data: collage,
        errors: null,
      });
    }
  } catch (error) {
    //! Debug Error
    console.log(error);
  }
};