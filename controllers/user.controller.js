import { User } from "../models/user.model.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const register=async(req,res)=>{
    try{
        const {fullname0,email,phoneNo,password,role}=req.body;  
        if(!fullname || !email || !phoneNo || !password || !role){
            return res.status(400).json({
                message: "Some Fields are missing",
                success: false 
            });
        }
        const user=await User.findOne({email});
        if(user){
            return  res.status(400).json({
                message: "Already user exits with mail",
                success: false
            })
        }
       const hashedPassword=await bcrypt.hash(password,10);
       await User.create({
        fullname,
        email,
        phoneNo,
        password: hashedPassword,
        role
       })

       return res.status(200).json({
        message: "Account created successfully",
        success: true
       })
    }
    catch(error){
        console.log(error);
    }
}


export const login=async(req,res)=>{
    try{
        const{email,password,role}=req.body;
        if(!email || !password || !role){
            return res.status(400).json({
                message: "Some Fields are missing",
                success: false
            })
        } 
        
        let user=await User.findOne({email}) 
        if(!user){
            return res.status(400).json({
                message: "Invalid username or password",
                success: false
            });
        }

        const checkPass=await bcrypt.compare(password,user.password);

        if(!checkPass){
            return res.status(400).json({
                message: "Invalid username or password",
                success: false
            });

        }

        if(role !== user.role){
            return res.status(400).json({
                message: "Account doesnt exit with current role",
                success: false
            });

        }

        const tokenData={
            userId: user._id
        }
        const jwtToken=await jwt.sign(tokenData,process.env.SECRET_KEY,{expiresIn: '1d'})

        user= {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNo: user.phoneNo,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).cookie("token",jwtToken,{maxAge: 1*24*60*60*1000,httpsOnly: true,sameSite: 'strict'}).json({
            message: `Welcome ${user.fullname}`,
            user,
            success: true 
        })

    }
    catch(error){
          console.log(error);
    }
    
}


export const Logout=async(req,res)=>{
    try{
        return res.status(200).cookie("token","",{maxAge:0}).json({
            message: "logged out successfaully",
            success: true
        })
        
    }
    catch(error){
      console.log(error);
    }
}


export const UpdateProfile=async(req,res)=>{
    try{
      const{fullname,email,phoneNo,bio,skills}=req.body;
      const file=req.file;

    //   if(!fullname || !email || !phoneNo || !bio || !skills){
    //     return res.status(400).json({
    //         message: "Some Fields are missing",
    //         success: false 
    //     });
    // }


    let skillsArray;
    if(skills){
        skillsArray=skills.split(",");
    }
    
    const userId=req.id;
    const user=await User.findById(userId);

    if(!user){
        return res.status(400).json({
            message: "User not found",
            success: false
        })
    }
    
    if(fullname) user.fullname=fullname;
    if(email) user.email=email;
    if(phoneNo) user.phoneNo=phoneNo;
    if(bio)user.profile.bio=bio;
    if(skills)user.profile.skills=skillsArray;
    
    await user.save();

    
    user={
        id: user._id,
        fullname: User.fullname,
        email: User.email
    }
    
    return res.status(200).json({
        message: "Profile updated successfully",
        user,
        success: true
    })
    }
    catch(error){
        console.log(error);
    }
}