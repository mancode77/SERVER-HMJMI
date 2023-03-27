import Collage from "../../models/collage.js";
import { collageValidationSchema } from './../../middlewares/schema.js'
import createError from "../../../../utils/error.js";
import responseSuccess from "../../../../utils/response-state.js";

export const createCollage = async (req, res, next) => {
  try { 
    const { email, username } = req.body;

    //* Validasi
    const { error, value } = collageValidationSchema.validate(req.body);
    
    //* Cek, email ada atau tidak di DB
    const exsistEmail = await Collage.findOne({ email: email });
    const exsistUsername = await Collage.findOne({username: username})

    //* Registerasi
    const collage = new Collage({
      ...value,
      createdAt: Date.now(),
    });

    //! Validasi Error
    if (error) {
      next(createError(500, error.details[0].message));
    } else {
      //! Validasi ketika email sudah terdafatr
      if (exsistEmail) {
        return next(createError(500, `Akun dengan email ${email} tersebut sudah terdaftar`));
      } else {
        if(exsistUsername){
          return next(createError(500, `Akun dengan username ${username} tersebut sudah terdaftar`));
        }else{
          //* Simpan registrasi
          await collage.save();
          responseSuccess(res, collage);
        }
      }
    }
  } catch (error) {
    //! Debug Error
    next(createError(500, error));
  }
};