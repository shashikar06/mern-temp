import { StatusCodes } from "http-status-codes"
import { UnAuthenticatedError, UnauthorizedError } from '../errors/customError.js';
import User from '../models/UserModel.js'
import { hashPassword } from '../utils/passwordUtils.js';
import { comparePassword } from '../utils/passwordUtils.js';
import { createJWT } from '../utils/tokenUtils.js';


export const register = async (req,res) => {
    
    const isFirstAccount = (await User.countDocuments()) === 0;
    req.body.role = isFirstAccount ? 'admin' : 'user';

    const hashedPassword = await hashPassword(req.body.password)
    req.body.password = hashedPassword
    
    const user = await User.create(req.body)

    res.status(201).json({msg: 'user created'})
}


export const login = async (req,res) => {

    const user = await User.findOne({email:req.body.email})

    if(!user){
        throw new UnAuthenticatedError('INVALID CREDENTIALS')
    }

    const isPasswordCorrect = await comparePassword(req.body.password,user.password);

    if(!isPasswordCorrect){
        throw new UnAuthenticatedError('INVALID CREDENTIALS')
    }

    
    const token = createJWT({userId: user._id, role: user.role})
    const oneDay = 1000 * 60 * 60 * 24
    res.cookie('token',token,{
        httpOnly:true,
        expires: new Date(Date.now() + oneDay),
        secure: process.env.NODE_ENV === 'production'
    });
    res.status(StatusCodes.OK).json({msg:'USER LOGGED IN'})
}

export const logout = (req,res) => {
    res.cookie('token','logout', {
        httpOnly: true,
        expires: new Date(Date.now())
    });
    res.status(200).json({msg:'LOGGED OUT SUCCESSFULLY'})
}