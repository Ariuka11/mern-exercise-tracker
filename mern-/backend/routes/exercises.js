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

router.post('/add', async(req, res, next) => {
    try {
        const {username, description} = req.body
        const duration = Number(req.body.duration)
        const date = Date.parse(req.body.date)

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

router.get('/:id', async (req, res, next) => {
    try {
        res.json(await Exercise.findById(req.params.id))
    } catch (err){
        next(err)
    }
})

router.delete('/:id', async (req, res, next) => {
    try {
        await Exercise.findByIdAndDelete(req.params.id)
        res.json("Exercise Deleted")
    } catch (err){
        next(err)
    }
})

// router.route('/update/:id').put((req, res) => {
//     Exercise.findById(req.params.id)
//       .then(exercise => {
//         exercise.username = req.body.username;
//         exercise.description = req.body.description;
//         exercise.duration = Number(req.body.duration);
//         exercise.date = Date.parse(req.body.date);
  
//         exercise.save()
//           .then(() => res.json('Exercise updated!'))
//           .catch(err => res.status(400).json('Error: ' + err));
//       })
//       .catch(err => res.status(400).json('Error: ' + err));
//   });

  router.route('/update/:id').put(async (req, res) => {
    try {
        const exercise = await Exercise.findById(req.params.id);
        exercise.username = req.body.username;
        exercise.description = req.body.description;
        exercise.duration = Number(req.body.duration);
        exercise.date = Date.parse(req.body.date);
        await exercise.save()
        res.json('Exercise updated!')
    } catch (err) {
       next(err)
    }
});

module.exports = router