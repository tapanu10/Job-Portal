const userModel=require('../models/userModel.js')

const registerController=async (req,res)=>{
    try{
        const {name,email,password}=req.body
       //valiadte
       if(!name)
            {
                return res.status(400).send({success:false,message:"Enter Name"})
            }
        if(!email)
            {
                return res.status(400).send({success:false,message:"Enter email"})
            }
        if(!password)
            {
                return res.status(400).send({success:false,message:"Enter password"})
            }   
            const existingUser=await userModel.findOne({email})
            if(existingUser)
              { return res.status(200).send({
               success:false,
               message:'Email Already Register Please Login'
              })
            }
            //creating a user
            const user=await userModel.create({name,email,password})
            //token
            const token=user.createJWT()
            res.status(201).send({
                 success:true,
                message:'User created Succesfully',
                 error,
                 user,
                 token
            })

        }   
    catch(error){
        console.log(error)
        res.status(400).send({
            message:'Error in Register Controller',
            success:false,
            error
        })
    }
}
module.exports=registerController;


//login controller
const loginController = async (req, res, next) => {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
        return res.status(400).send({
            success: false,
            message: 'Please provide both email and password'
        });
    }
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(401).send({
                success: false,
                message: 'Invalid email or password'
            });
        }
      //compare passwords
      const isMatch=await user.comparePassword(password)
        if(!isMatch){
            return res.status(401).send({
                success: false,
                message: 'Invalid email or password'
            });
        }
        
        // If user found, create and send a token, or whatever your authentication logic is
        const token=user.createJWT();
        res.status(200).json(
            {
                success:true,
                message:'Login sucessFully',
                user,
                token,
            }
        )
}

module.exports = loginController;