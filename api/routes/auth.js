const bcrypt = require('bcryptjs');
const User = require("../models/User");
const router = require("express").Router();

//REGISTER  "type": "module",
router.post("/register", async(req, res) => {
    try {
        //generate new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        //create new user
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            phone: '',
            fio: '',
            birth_dt: ''
        });

        //save user and respond
        const user = await newUser.save();
        res.status(200).json(user);
        console.log("Added user for DB");
    }
    catch (err) {
        res.status(500).json(err);
    }
})

//LOGIN
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        !user && res.status(404).json("User not found");

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        !validPassword && res.status(400).json("Wrong password");

        res.status(200).json(user)
    }
    catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router;