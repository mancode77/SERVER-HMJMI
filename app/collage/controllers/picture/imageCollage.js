export const imageCollage = async (req, res) => {
  try {
    const { filepath } = req.params;
    const __dirname = path.resolve();
    const imagePath = path.join(__dirname, "..", "backend", filepath);

    res.sendFile(imagePath);
  } catch (err) {
    //! Debug Error
    console.log(err);
    res.status(500).json({ message: "Failed to get image" });
  }
};