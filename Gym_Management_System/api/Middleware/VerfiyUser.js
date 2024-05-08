import  Jwt  from "jsonwebtoken";
import { errorHandle } from "../Middleware/error.js";


export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;

    if(!token){
        return next(errorHandle(401, 'Unauthorized'));
    }
    Jwt.verify(token, process.env.JWT_SECRET, (err, user) =>{
   
        if(err) {
            return next( errorHandle(401, 'Unauthorized'));
        }
        req.user = user;
        next();
    });

};