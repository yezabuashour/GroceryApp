import React, { Component } from 'react'
import api from '../api'

import styled from 'styled-components'

const Title = styled.h1.attrs({
    className: 'h1',
})``

const Wrapper = styled.div.attrs({
    className: 'form-group',
})`
    margin: 0 30px;
`

const Label = styled.label`
    margin: 5px;
`

const InputText = styled.input.attrs({
    className: 'form-control',
})`
    margin: 5px;
`

const Button = styled.button.attrs({
    className: `btn btn-primary`,
})`
    margin: 15px 15px 15px 5px;
`

const CancelButton = styled.a.attrs({
    className: `btn btn-danger`,
})`
    margin: 15px 15px 15px 5px;
`

class MealsUpdate extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            name: '',
            ethnicity: '',
            rating: '',
            ingredients: '',
        }
    }

    handleChangeInputName = async event => {
        const name = event.target.value
        this.setState({ name })
    }

    handleChangeInputName = async event => {
        const ethnicity = event.target.value
        this.setState({ ethnicity })
    }

    handleChangeInputRating = async event => {
        const rating = event.target.validity.valid
            ? event.target.value
            : this.state.rating

        this.setState({ rating })
    }

    handleChangeInputIngredients = async event => {
        const ingredients = event.target.value
        this.setState({ ingredients })
    }

    handleUpdateMeal = async () => {
        const { id, name, ethnicity, rating, ingredients } = this.state
        const arrayIngredients = ingredients.split('/')
        const payload = { name, ethnicity, rating, ingredients: arrayIngredients }

        await api.updateMealById(id, payload).then(res => {
            window.alert(`Meal updated successfully`)
            this.setState({
                name: '',
                ethnicity: '',
                rating: '',
                ingredients: '',
            })
        })
    }

    componentDidMount = async () => {
        const { id } = this.state
        const meal = await api.getMealById(id)

        this.setState({
            name: meal.data.data.name,
            ethnicity: meal.data.data.ethnicity,
            rating: meal.data.data.rating,
            ingredients: meal.data.data.ingredients.join('/'),
        })
    }

    render() {
        const { name, ethnicity, rating, ingredients } = this.state
        return (
            <Wrapper>
                <Title>Create Meal</Title>

                <Label>Name: </Label>
                <InputText
                    type="text"
                    value={name}
                    onChange={this.handleChangeInputName}
                />

                <Label>Ethnicity: </Label>
                <InputText
                    type="text"
                    value={ethnicity}
                    onChange={this.handleChangeInputName}
                />

                <Label>Rating: </Label>
                <InputText
                    type="number"
                    step="0.1"
                    lang="en-US"
                    min="0"
                    max="10"
                    pattern="[0-9]+([,\.][0-9]+)?"
                    value={rating}
                    onChange={this.handleChangeInputRating}
                />

                <Label>Ingredients: </Label>
                <InputText
                    type="text"
                    value={ingredients}
                    onChange={this.handleChangeInputIngredients}
                />

                <Button onClick={this.handleUpdateMeal}>Update Meal</Button>
                <CancelButton href={'/meals/list'}>Cancel</CancelButton>
            </Wrapper>
        )
    }
}

export default MealsUpdate