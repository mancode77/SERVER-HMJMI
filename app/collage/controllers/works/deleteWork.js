import Work from "./../../models/work.js";
import Collage from "../../models/collage.js";
import createError from "../../../../utils/error.js";
import responseSuccess from "../../../../utils/response-state.js";

export const deleteWork = async (req, res, next) => {
  try {
    const { workId, collageId } = req.params;

    //* Mencari data work dan collage di db
    const work = await Work.findById(workId);
    const collage = await Collage.findById(collageId);

    //* Mencocokan data work dengan collage
    if (collage.workcollage.includes(workId)) {
      //* Menghapus data index Menyimpan kembali data collage
      let index = collage.workcollage.indexOf(workId);
      collage.workcollage.splice(index, 1);
      await collage.save();

      //* Menghapus data work dan response
      await work.deleteOne();
      responseSuccess(res, { message: "Data berhasil dihapus" });
    } else {
      //* Menghapus data work yang tidak terpakai
      await work.deleteOne();

      //* Response jika data tidak cocok
      next(
        createError(442, {
          message:
            "Server menerima permintaan, tetapi tidak dapat memprosesnya karena salah satu data tidak cocok dengan data lain atau tidak valid",
        })
      );
    }
  } catch (error) {
    next(createError(500, "Server Error"))
  }
};
