import { UnAuthenticatedError, UnauthorizedError } from "../errors/customError.js";
import { verifyJWT } from "../utils/tokenUtils.js";

export const authenticateUser =  (req,res,next) => {
    //console.log(req.cookies);
    const {token} = req.cookies;
    if(!token) throw new UnAuthenticatedError('authentication invalid')
    
    
    try {
        const {userId, role} = verifyJWT(token);
        req.user = {userId,role}
        //console.log(req.user);
        next();
    } catch (error) {
        throw new UnAuthenticatedError('authentication invalid');
    }
}



export const authorizePermissions = (...roles) => {
    
    return (req,res,next) => {
        //console.log(req.user)
        //console.log(roles)
        if(!roles.includes(req.user.role)) {
            throw new UnauthorizedError('Unauthorized to this route')
        }

        next();
    }
    
}

