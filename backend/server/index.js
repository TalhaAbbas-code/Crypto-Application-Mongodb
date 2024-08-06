import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";


// routes
// import AuthRoute from './routes/AuthRoute.js'
// import UserRoute from './routes/UserRoute.js'
// import PostRoute from './routes/PostRoute.js'
 import auth from './auth.js';
import cookieParser from "cookie-parser";
// import ChatRoute from './routes/ChatRoute.js'
// import MessageRoute from './routes/MessageRoute.js'

const app = express();


// middleware
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
const corsOptions = {
  origin: 'http://localhost:3000', // Frontend URL
  credentials: true, // Allow cookies and other credentials
};

// Use the cors middleware with the specified options
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.urlencoded({extended:false}));
app.use(express.json());

// to serve images inside public folder



/////dotenv.config();
///const PORT = process.env.PORT;

//const CONNECTION =process.env.MONGODB_CONNECTION;
mongoose
  .connect("", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(8000, () => console.log(`Listening at Port 8000`)))
  .catch((error) => console.log(`${error} did not connect`));
app.use('/api/auth',auth);
// app.post('/api/auth/signup', (req, res) => {
//   const { email, password } = req.body;
//   // Handle signup logic here
//   console.log("hello");
//   res.status(200).send({ message: 'User signed up successfully' });
// });

// app.use('/auth', AuthRoute);
// app.use('/user', UserRoute)
// app.use('/posts', PostRoute)
// app.use('/upload', UploadRoute)
// app.use('/chat', ChatRoute)
// app.use('/message', MessageRoute)