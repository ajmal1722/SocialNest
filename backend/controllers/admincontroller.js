import Admin from "../models/adminSchema.js";

export const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        
    } catch (error) {
        console.error('Error during admin login:', error);
        return res.status(500).json({ error: error.message })
    }
}