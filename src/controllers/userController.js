import User from "../models/userModel.js"

export const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find({_id:-1});
        res.status(200).send({
            success:true,
            message: "User Get successfully",
            users,
        });
    } catch (error) {
        res.status(404).json({
            success: ture,
            error,
        })
    }
}