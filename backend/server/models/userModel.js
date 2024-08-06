import mongoose from "mongoose";
const { Schema } = mongoose;

const UserSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstname: {
      type: String,
     
    },
    lastname: {
      type: String,
     
    },
    watchList:{
   type: [Schema.Types.Mixed], // Array of objects defined by watchListItemSchema
      default: [],
    }
   
  
  },
  { timestamps: true }
);

const UserModel = mongoose.model("myusers", UserSchema);
export default UserModel;
