const jwt = require("jsonwebtoken");

const secretKey = "your_secret_key_here";
module.exports = authMiddleWare = async (req,res, next) => {
    
    try {
        const token = req?.headers?.authorization;
        if(!!!token){
            return res.status(409).json({ message: "Token is not included in headers" });
        }
        const decoded = await jwt.verify(token, secretKey);
        req.user = decoded;
        next();
        
        // JWT is valid
    } catch (error) {
 
        return res.status(409).json({ error: error });
        // JWT is invalid
    }
}
