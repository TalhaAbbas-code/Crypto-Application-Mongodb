import express from "express";

import jwt from 'jsonwebtoken';
import UserModel from './models/userModel.js';
import bcrypt from 'bcrypt';



    

const router = express.Router();

// Signup
router.post('/signup', async (req, res) => {
  const {  email, password } = req.body;

  try {
    let user = await UserModel.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    user = new UserModel({  email, password });
    await user.save();


    jwt.sign({ email: user.email,password: user.password, id: user._id }, 'secret', { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
     res.cookie('token',token).json({ user });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

//Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    

    

    jwt.sign({ email: user.email,password: user.password, id: user._id }, 'secret', { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      console.log("cookie set");
      res.cookie('token',token).json({ user });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.post('/logout', (req, res) => {
  try {
    // Clear the JWT cookie
    res.clearCookie('token'); // Assuming 'token' is the name of the cookie storing the JWT
    return res.status(200).send({ message: 'Logged out successfully!' });
  } catch (error) {
    console.error('Logout error:', error);
    return res.status(500).send({ message: 'An error occurred while logging out.' });
  }
});




router.get('/user', async (req, res) => {
  const{token}=req.cookies;
  console.log(token,"tokes from cooke is");
 try {
   if(token){
    jwt.verify(token,'secret',{},(err,user)=>{
      if(err) throw err;
      res.json(user);
    })
  }
  else{
    res.json("token not get");
  }
  
 } catch (error) {
   res.status(500).send('Server error');
 }});
 router.get('/user/watchlist/:email', async (req, res) => {
 const email=req.params.email;
 try {
   let user = await UserModel.findOne({  email });

   if(user){
    console.log(user,"user from saved coine");
     res.json(user);
   }
   else{
    res.json("user not found");
   }
  
 } catch (error) {
   res.status(500).send('Server error');
 }});

//  router.get('/markets', async (req, res) => {
//   try {
//     const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
//       params: {
//         vs_currency: 'usd',
//         order: 'market_cap_desc',
//         per_page: 10,
//         page: 1,
//         sparkline: true
//       }
//     });
//     res.json(response.data);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });
  // try {
  //   const user = await UserModel.findById(req.params.id);
  //   res.json(user);
  //   console.log("user updatin from db");
  //   console.log(user);
  // } catch (err) {
  //   res.status(500).json({ error: 'Failed to fetch user data' });
  // }

router.post('/save/watchlist/:id', async (req, res) => {
   try {
    // Find the user by ID and push the new item to the watchList
   const updatedUser=await UserModel.findByIdAndUpdate(
      req.params.id,
      { $push: { watchList: req.body.coin } },
      { new: true } // Return the updated document
    );
     if (updatedUser) {
      res.status(200).json({ message: 'Item added to watchList', user: updatedUser });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
    console.log('Item added to watchList');
  } catch (error) {
    console.error('Error adding item to watchList:', error);
  }
});
router.post('/delete/watchlist/:id', async (req, res) => {
  try {
    // Find the user by ID and update their watchList by removing the specified coin
    const result = await UserModel.findByIdAndUpdate(
      req.params.id,
      { $pull: { watchList: { id: req.body.passedid} } }, // Assuming each coin has a unique _id field
      { new: true } // Return the updated document
    );

    if (result) {
      res.status(200).json({ message: 'Item deleted from watchList', user: result });
    } else {
      res.status(404).json({ message: 'User not found' });
    }

    console.log('Updated watchList:', result.watchList);
   // return result.watchList;
  } catch (error) {
    console.error('Error removing coin from watchList:', error);
   
  }
});


export default router
