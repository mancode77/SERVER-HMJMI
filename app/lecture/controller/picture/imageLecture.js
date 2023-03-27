import path from "path";
import createError from "../../../../utils/error.js";

export const imageLecture = async (req, res, next) => {
  try {
    const { filepath } = req.params;
    const __dirname = path.resolve();
    const imagePath = path.join(__dirname, "..","backend", filepath);

    // cek apakah file gambar ditemukan
    // if (!fs.existsSync(imagePath)) {
    //   return next(createError(404, "Gambar tidak ditemukan"));
    // }

    // kirimkan gambar sebagai respons
    res.set("Content-Type", "image/jpeg"); // contoh untuk tipe konten gambar jpeg
    res.sendFile(imagePath);
  } catch (err) {
    return next(createError(500, "Gagal memuat gambar"));
  }
};
