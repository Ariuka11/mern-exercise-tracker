const express = require('express')
const router = express.Router()

let User = require('../models/user.model')

router.get("/", async (req, res, next) => {
    try{
        const user = await User.find()
        res.json(user)
     } catch ( err){ 
         next(err)
     }
})

router.post("/add", async (req, res, next) => {
    try{
        const { username } = req.body
        const newUser = new User({ username })
        await newUser.save()
        res.json("user added")
     } catch ( err){ 
         next(err)
     }
})

// router.post('/add', (req, res) => {
//     const {username} = req.body
//     const newUser = new User({username})

//     newUser.save()
//         .then(() => res.json("user added"))
//         .catch(err => res.status(400).json("Error" + err))
// })


module.exports = router