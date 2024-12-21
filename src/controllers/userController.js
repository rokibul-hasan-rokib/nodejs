import User from "../models/userModel.js";
import JWT from 'jsonwebtoken';

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({ _id: -1 });
    res.status(200).send({
      success: true,
      message: "User Get successfully",
      users,
    });
  } catch (error) {
    res.status(404).json({
      success: ture,
      error,
    });
  }
};

export const userRegister = async (req, res) => {
  const { name, email, password, phone, address } = req.body;
  try {
    const existingUser = await User.findOne({ name });
    if (!existingUser) {
      return res.status(400).json({
        message: "Username is already here",
        success: true,
      });
    }
    const newUser = new User(req.body);
    await newUser.save();

    const token = JWT.sign(
      {
        user: { id: newUser._id, username: newUser.name },
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
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
      });
  }
};

export const userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "User is not found",
      });
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }
    const token = JWT.sign(
      {
        user: { id: user._id, useremail: user.email },
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );
    res.status(200).send({
      success: true,
      message: "User Login Successfull",
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const getUserById = async (req, res) => {
  try {
    const users = await User.findById(req.params.id);
    if (!users) {
      res.status(404).send({
        success: false,
        message: "User Not Found",
      });
    }
    res.status(200).send({
      success: true,
      message: "User Found Successfully",
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error,
    });
  }
};

export const deelteUser = async (req, res) => {
  try {
    const deleteUser = await User.findByIdAndDelete(req.params.id);
    if (!deleteUser) {
      res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    }
    res.status(200).send({
      success: true,
      message: "User Deleted Successfully",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error,
    });
  }
};
export const updateUser = async (req, res) => {
  const { name, email, newPassword, phone, address, role, status } = req.body;

  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        message: "User not Found",
      });
    }

    user.name = name;
    user.email = email;
    user.address = address;
    user.phone = phone;
    user.role = role;
    user.status = status;

    if (newPassword) {
      user.password = newPassword;
    }

    await user.save();

    res.status(200).send({
      success: true,
      message: "User updated successfully",
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
