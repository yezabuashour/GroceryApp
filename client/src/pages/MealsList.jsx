import React, { Component } from 'react'
import ReactTable from 'react-table-v6'
import api from '../api'

import styled from 'styled-components'

import 'react-table-v6/react-table.css'

const Wrapper = styled.div`
    padding: 0 40px 40px 40px;
`

class MealsList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            meals: [],
            columns: [],
            isLoading: false,
        }
    }

    componentDidMount = async () => {
        this.setState({ isLoading: true })

        await api.getAllMeals().then(meals => {
            this.setState({
                meals: meals.data.data,
                isLoading: false,
            })
        })
    }

    render() {
        const { meals, isLoading } = this.state
        console.log('TCL: MealsList -> render -> meals', meals)

        const columns = [
            {
                Header: 'ID',
                accessor: '_id',
                filterable: true,
            },
            {
                Header: 'Name',
                accessor: 'name',
                filterable: true,
            },
            {
                Header: 'Ethnicity',
                accessor: 'ethnicity',
                filterable: true,
            },
            {
                Header: 'Rating',
                accessor: 'rating',
                filterable: true,
            },
            {
                Header: 'Ingredients',
                accessor: 'ingredients',
                Cell: props => <span>{props.value.join(' / ')}</span>,
            },
        ]

        let showTable = true
        if (!meals.length) {
            showTable = false
        }

        return (
            <Wrapper>
                {showTable && (
                    <ReactTable
                        data={meals}
                        columns={columns}
                        loading={isLoading}
                        defaultPageSize={10}
                        showPageSizeOptions={true}
                        minRows={0}
                    />
                )}
            </Wrapper>
        )
    }
}

export default MealsList