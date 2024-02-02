const mongoose =require("mongoose")

const userSchema = new mongoose.Schema({
    name: { type: String, trim:true },
    email: { type: String, unique: true,trim:true },
    phoneNumber: { type: String,trim:true },
    online: { type: Boolean, default: false },
  });
  
  const User = mongoose.model("User", userSchema);

  module.exports=User;