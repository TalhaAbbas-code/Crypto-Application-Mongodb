import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";


// routes
// import AuthRoute from './routes/AuthRoute.js'
// import UserRoute from './routes/UserRoute.js'
// import PostRoute from './routes/PostRoute.js'
 import auth from './routes/auth.js'
// import ChatRoute from './routes/ChatRoute.js'
// import MessageRoute from './routes/MessageRoute.js'

const app = express();


// middleware
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// to serve images inside public folder



/////dotenv.config();
///const PORT = process.env.PORT;

//const CONNECTION =process.env.MONGODB_CONNECTION;
mongoose
  .connect("mongodb+srv://talhaabbas058:h5Pzl655slB0KwTx@mernstack.5zpcalk.mongodb.net/socialMediaApplication?retryWrites=true&w=majority&appName=MernStack", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(3000, () => console.log(`Listening at Port 3000`)))
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