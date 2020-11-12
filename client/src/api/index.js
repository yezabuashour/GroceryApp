import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
})

export const insertMeal = payload => api.post(`/meal`, payload)
export const getAllMeals = () => api.get(`/meals`)
export const updateMealById = (id, payload) => api.put(`/meal/${id}`, payload)
export const deleteMealById = id => api.delete(`/meal/${id}`)
export const getMealById = id => api.get(`/meal/${id}`)

const apis = {
    insertMeal,
    getAllMeals,
    updateMealById,
    deleteMealById,
    getMealById,
}

export default apis