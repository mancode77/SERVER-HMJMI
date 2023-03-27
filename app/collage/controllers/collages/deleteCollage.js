import Collage from "../../models/collage.js";
import createError from "../../../../utils/error.js";
import responseSuccess from "../../../../utils/response-state.js";

export const deleteCollage = async (req, res) => {
  try {
    const { id } = req.params;

    //* Mencari data Mahasiswa
    const collage = await Collage.findById(id);

    //! Data Mahasiswa tidak ditemukan
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
    }

    //* Hapus data Mahasiswa
    collage.deleteOne();

    res.json({
      took: 200,
      status: "OK",
      data: {
        message: "Data Berhasil Dihapus",
      },
      errors: null,
    });
  } catch (error) {
    //! Debug Error
    console.log(error.mess);
  }
};
