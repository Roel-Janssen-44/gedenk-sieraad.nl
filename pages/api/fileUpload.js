const cloudinary = require("cloudinary");

cloudinary.v2.config({
  cloud_name: "gedenk-sieraad",
  api_key: "838812567159844",
  api_secret: "JQ2UPyx8a_QdbLgwtiCJdKWiJKo",
  secure: true,
});

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const file = req.body.file;
      const cloudinaryResponse = await cloudinary.uploader.upload(file);
      return res
        .status(200)
        .json({ success: true, url: cloudinaryResponse.url });
    } catch (error) {
      console.error("Error uploading file to Cloudinary:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
