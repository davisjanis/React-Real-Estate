import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';

//sign up functionality for MongoDB
export const signup = async (req, res, next) => {

    //destructurize req.body for creating new user
    const { username, email, password } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    // creates new user based on userSchema model and saves in DB
    // Mongoose translates the model instance into a BSON document.
    //Mongoose then sends an insert command to MongoDB.
    const newUser = new User({ username, email, password: hashedPassword });
    try {
        await newUser.save()
       res.status(201).json("User created successfully!");

    } catch (error) {
        //next(error) triggers middleware from index.js
        next(error);
    }
     
};