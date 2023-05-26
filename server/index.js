import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/db.js";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js"
import cors from "cors"
import multer from "multer"
dotenv.config();
connectDB();
const app = express();

app.use(cors());
app.use(express.json());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public/images/uploads")
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname.split(' ').join(''))
  }
})

const upload = multer({ storage: storage })

app.post("/api/uploads",upload.single("file"),(req,res)=>{
  const file = req.file;
  res.status(201).json(file.filename);
})
app.use("/api", userRoutes);
app.use("/api/post", postRoutes);

app.use((err, req, res, next) => {
  const error = new Error();
  error.status = err.status || 500;
  error.message = err.message || "Default error handle from index";
  res.status(error.status).json(error.message);
});

app.listen(process.env.PORT, () => {
  console.log(`Listening on ${process.env.PORT} has started`);
});
