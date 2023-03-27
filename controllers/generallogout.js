import Lecture from "../app/lecture/models/lecture.js";
import Collage from "../app/collage/models/collage.js";

export const logout = async(req, res) => {
  try {
    const refreshToken = req.cookies.refreshtoken.toLowerCase();
    if (!refreshToken) return res.sendStatus(401);
    const collage = await Collage.findOne({ refresh_token: refreshToken });
    const lecture = await Lecture.findOne({ refresh_token: refreshToken });

    if (collage) {
      await collage.updateOne({ refresh_token: null });
      res.clearCookie("refreshtoken");
      return res.status(200).json({ message: "berhasil logout" });
    }

    if (lecture) {
      await lecture.updateOne({ refresh_token: null });
      res.clearCookie("refreshtoken");
      return res.status(200).json({ message: "berhasil logout" });
    }

    if (!collage || lecture) {
      return res.status(403).json({ message: "error collage" });
    }

  } catch (error) {
    console.log(error);
  }
};
