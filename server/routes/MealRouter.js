const express = require('express')

const MealCtrl = require('../controllers/MealCtrl')

const router = express.Router()

router.post('/meal', MealCtrl.createMeal)
router.put('/meal/:id', MealCtrl.updateMeal)
router.delete('/meal/:id', MealCtrl.deleteMeal)
router.get('/meal/:id', MealCtrl.getMealById)
router.get('/meals', MealCtrl.getMeals)

module.exports = router