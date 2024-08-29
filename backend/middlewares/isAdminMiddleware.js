import jwt from "jsonwebtoken";
import Admin from "../models/adminSchema.js";

const verifyAdminAccessToken = async (req, res, next) => {
    // Get tokens from cookies or header
    let accessToken = req.cookies.adminAccessToken || req.headers["authorization"]?.split(" ")[1];
    let refreshToken = req.cookies.adminRefreshToken || req.headers["x-refresh-token"];

    if (!accessToken && !refreshToken) {
      return res.status(401).json({ error: "Not authorized, no token" });
    }

    try {
        if (accessToken) {
            jwt.verify(accessToken, process.env.JWT_ADMIN_SECRET, (err, decoded) => {
                if (err) throw new Error('Invalid acces token')
                    
                req.user = decoded.id;
                next()
            })
        } else {
            throw new Error('Access token missing or expired')
        }
    } catch (error) {
        if (refreshToken) {
            jwt.verify(refreshToken, process.env.REFRESH_ADMIN_SECRET, async (err, decoded) => {
                if (err) {
                    return res.status(401).json({ error: 'Invalid refresh token' });
                }

                const admin = await Admin.findById(decoded.id);
                if (!admin || admin.refreshToken !== refreshToken) {
                    return res.status(401).json({ error: 'Invalid refresh token' });
                }

                const newAccessToken = jwt.sign({ id: admin._id }, process.env.JWT_ADMIN_SECRET, { expiresIn: '15m' })
                res.cookie('adminAccessToken', newAccessToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'strict',
                    maxAge: 15 * 60 * 1000
                });

                req.user = decoded.id;
                next()
            })
        }else {
            return res.status(401).json({ error: 'Not authorized, no token' });
        }
    }
};

export default verifyAdminAccessToken