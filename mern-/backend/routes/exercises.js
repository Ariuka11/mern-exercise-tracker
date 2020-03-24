const express = require('express')
const router = express.Router()

let Exercise = require('../models/exercise.model')

router.get('/', async(req, res, next) => {
    try {
        res.json(await Exercise.find())
    } catch(err) {
        next(err)
    }
})

router.post('/', async(req, res, next) => {
    try {
        const {username, description} = req.body
        const {duration} = Number(req.body)
        const {date} = Date.parse(req.body)
        
        const newExercise = new Exercise({
            username,
            description,
            duration,
            date,
        });

        await newExercise.save()
        res.json('Exercise added')
    } catch(err) {
        next(err)
    }
})


module.exports = router