import jwt, { decode } from 'jsonwebtoken'
import "dotenv/config.js"


export const authenticate = (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers['authorization']?.split(' ')[1];
        if (!token) {
            return res.status(401).json({
                error: "You don't have permission to access this page"
            });
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;
        next();
    } catch (e) {
        return res.status(403).json({
            error: "Invalid or expired token, login again!"
        });
    }
};


