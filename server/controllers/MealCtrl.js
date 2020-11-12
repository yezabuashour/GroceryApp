const Meal = require('../models/GroceryModel')

createMeal = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a meal',
        })
    }

    const meal = new Meal(body)

    if (!meal) {
        return res.status(400).json({ success: false, error: err })
    }

    meal
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: meal._id,
                message: 'Meal created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Meal not created!',
            })
        })
}

updateMeal = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Meal.findOne({ _id: req.params.id }, (err, meal) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Meal not found!',
            })
        }
        meal.name = body.name
        meal.time = body.time
        meal.rating = body.rating
        meal
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: meal._id,
                    message: 'Meal updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Meal not updated!',
                })
            })
    })
}

deleteMeal = async (req, res) => {
    await Meal.findOneAndDelete({ _id: req.params.id }, (err, meal) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!meal) {
            return res
                .status(404)
                .json({ success: false, error: `Meal not found` })
        }

        return res.status(200).json({ success: true, data: meal })
    }).catch(err => console.log(err))
}

getMealById = async (req, res) => {
    await Meal.findOne({ _id: req.params.id }, (err, meal) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!meal) {
            return res
                .status(404)
                .json({ success: false, error: `Meal not found` })
        }
        return res.status(200).json({ success: true, data: meal })
    }).catch(err => console.log(err))
}

getMeals = async (req, res) => {
    await Meal.find({}, (err, meals) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!meals.length) {
            return res
                .status(404)
                .json({ success: false, error: `Meal not found` })
        }
        return res.status(200).json({ success: true, data: meals })
    }).catch(err => console.log(err))
}

module.exports = {
    createMeal,
    updateMeal,
    deleteMeal,
    getMeals,
    getMealById,
}