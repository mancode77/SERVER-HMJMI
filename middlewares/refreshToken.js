import Lecture from "../app/lecture/models/lecture.js";
import Collage from "../app/collage/models/collage.js";
import jwt from "jsonwebtoken";

export const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshtoken;
    if (!refreshToken) return res.sendStatus(401);
    const collage = await Collage.findOne({ refresh_token: refreshToken });
    const lecture = await Lecture.findOne({ refresh_token: refreshToken });

    if(lecture){
      jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
          if (err) return res.json({ msg: "unauthorization" });
          const id = lecture._id;
          const role = lecture.role
          const accessToken = jwt.sign(
            { id, role },
            process.env.ACCESS_TOKEN_SECRET,
            {
              expiresIn: "1d",
            }
          );
          res.json({accessToken});
        }
      );
    }

    if(collage){
      jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
          if (err) return res.json({ msg: "unauthorization" });
          const id = collage._id;
          const role = collage.role
          const accessToken = jwt.sign(
            { id, role },
            process.env.ACCESS_TOKEN_SECRET,
            {
              expiresIn: "1d",
            }
          );
          res.json({accessToken});
        }
      );
    }

    if (!lecture) {
      return res.status(403).json({ message: "forbiden" });
    }
  } catch (error) {
    console.log(error);
  }
};
