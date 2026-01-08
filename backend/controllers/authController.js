import prisma from '../src/prisma.js';
import jwt from 'jsonwebtoken';

function generateToken(userId){
    return jwt.sign({userId},process.env.JWT_SECRET,{expiresIn:'3d'});
}

function setCookie(res,token){
    res.cookie('token',token,{
        httpOnly: true,
        maxAge: 3*24*60*60*1000
    });
}

export const register = async (req,res) => {
    const {email,password,role} = req.body;
    if(!email || !password || !role)
        return res.status(401).json({message:'Insufficient data'});
    const user = await prisma.user.findUnique({
        where:{email}
    });
    if(!user)
        return res.status(401).json({message:'User already exists'});
    const newUser = await prisma.user.create({
        data:{
            email,
            password,
            role
        }
    });
    if(role=="RECRUITER"){
        const {companyName} = req.body;
        if(!companyName)
            return res.status(401).json({message:'Insufficient data'});
        await prisma.recruiter.create({
            data:{
                userId:newUser.id,
                companyName
            }
        });
    }else if(role=="PCOORDINATOR"){
        const {department,college} = req.body;
        if(!department || !college)
            return res.status(401).json({message:'Insufficient data'});
        await prisma.pcoordinator.create({
            data:{
                userId:newUser.id,
                department,
                college
            }
        });
    }else if(role=="STUDENT"){
        const {name,branch,department} = req.body;
        if(!name || !branch || !department)
            return res.status(401).json({message:'Insufficient data'}); 
        await prisma.student.create({
            data:{
                userId:newUser.id,  
                name,
                branch,
                department
            }
        });
    };
    const token = generateToken(newUser.id);
    setCookie(res,token);
    return res.status(201).json({message:'User registered successfully'});
}

export const login = async (req,res) => {
    const {email,password,role} = req.body;
    if(!email || !password || !role)
        return res.status(401).json({message:'Insufficient data'}); 
    const user = await prisma.user.findUnique({
        where:{email}
    });
    if(!user || user.role!==role || user.password!==password)
        return res.status(401).json({message:'Invalid Credentials'});
    const token = generateToken(user.id);
    setCookie(res,token);
    return res.status(201).json({message:'Login successful'});
};

export const logout = async (req,res) => {
    res.clearCookie('token');
    return res.status(200).json({message:'Logout successful'});
};

    