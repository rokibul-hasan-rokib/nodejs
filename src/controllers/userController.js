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

export const registerController = async(req, res) => {
    const {name, email, password, phone, address} = req.body;
    try {
        const existingUser = await User.findOne({name});
        if(!existingUser){
            return res.status(400).json({
                message: "Username is already here",
                success: true
            })
        }
        const newUser = new User(req.body);
        await newUser.save();

        const token = JWT.sign({
            user: {id: newUser._id, username: newUser.name}
        }, process.env.JWT_SECRET,
    {
        expiresIn: '7d',
    }
    );
    res.status(200).send({
        success: true,
        message: "User Register  Successfully",
        newUser,
        token,
    });
    } catch (error) {
        console.log(error),
        res.status(500).json({
            message: "Internal Server Errro",
            error,
        })
    } 
   
}