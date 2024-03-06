const mongoose=require('mongoose');
const validator=require('validator');
const bcrypt=require('bcrypt');
const JWT=require('jsonwebtoken');
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Name is Require']
    },
    email:{
        type:String,
        required:[true,'Email is Require'],
        unique:true,
        validate:validator.isEmail
    },
    password:{
        type:String,
        required:[true,'Password is require']
    },location:{
        type:String,
        default:'India'
    }
},{timestamps:true}
);


//middleware
userSchema.pre('save',async function(){
     const salt=await bcrypt.genSalt(10)
     this.password=await bcrypt.hash(this.password,salt);
});

  //compare password
  userSchema.methods.comparePassword=async function(userPassword){
    const isMatch=await bcrypt.compare(userPassword,this.password)
    return isMatch;
  }

//jwt
userSchema.methods.createJWT=function(){
    return JWT.sign({userID:this._id},process.env.JWT_SECRET,{expiresIn:'1d'})
}

const User=mongoose.model('User',userSchema);
module.exports=User;