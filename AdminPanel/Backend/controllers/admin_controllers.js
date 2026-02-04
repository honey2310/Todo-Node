import { userCollection } from "../models/user_model.js";

export const getAllUser = async (req, res) => {
  try {
    const user = await userCollection.findOne();
    res.json({ status: true, message: "All user Fetch successfully!!" });
  } catch (err) {
    res.json({ status: false, message: "Fail to fetch users!!" });
  }
};

export const getuser = async (req, res) => {
  try {
    const users = await userCollection.find();
    return res.json({
      status: true,
      message: "user fetched successfully",
      users,
    });
  } catch (err) {
    return res.json({ status: false, message: err.message });
  }
};

export const updateuser = async (req, res) => {
  const { email } = req.body;
  try {
    await userCollection.findOneAndUpdate({ email }, { $set: req.body });
    return res.json({ status: true, message: "user updated successfully" });
  } catch (err) {
    return res.json({ status: false, message: err.message });
  }
};

export const getcurrentuser = async (req, res) => {
  try {
    const token = req.cookies.auth_token;
    console.log(token);
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    console.log(decoded._doc);
    return res.json({
      status: true,
      message: "user fetched successfully",
      user: decoded._doc,
    });
  } catch (err) {
    return res.json({ status: false, message: err.message });
  }
};
