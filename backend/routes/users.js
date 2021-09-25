const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt")


router.post("/register", async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        }) 
        const user = newUser.save()
        res.status(200).json(user._id)  
    } catch (error) {
        res.status(500).json(error)
    }
})

router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({username: req.body.username})
        !user && res.status(400).json("Username not found")

        const validPassword = bcrypt.compare(req.body.password, user.password)

        !validPassword && res.status(400).json("Wrong password")
        
    } catch (error) {
        res.status(500).json(erroe)
    }
})

module.exports = router;