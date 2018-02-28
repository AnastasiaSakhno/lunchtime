import React from 'react'
import PropTypes from 'prop-types'
import UserWeekMenu from '../UserWeekMenu'

const UsersMenuSheet = ({ dateStart, data, onSubmit }) => {
  const map = data.map((userWeekMenu) => (
    <UserWeekMenu { ...userWeekMenu } onSubmit={ onSubmit } dateStart={ dateStart }/>
  ))

  // const date = new Date(dateStart)
  // const weekDates = Array.from(new Array(5), (_, index) => new Date(date.getTime() + 86400000 * index))
  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']

  const tableHeaders = weekDays.map((day) => (
    <th scope="col">{ day }</th>
  ))

  return (
    <table className="table table-bordered">
      <thead>
        <th scope="col">User</th>
        { tableHeaders }
      </thead>
      <tbody>{ map }</tbody>
    </table>
  )
}

const { string, number, array, arrayOf, shape, func } = PropTypes

UsersMenuSheet.propTypes = {
  dateStart: string.isRequired,
  data: arrayOf(
    shape({
      id: number,
      user: shape({
        id: number,
        name: string
      }).isRequired,
      dayMenuList: array
    })
  ).isRequired,
  onSubmit: func.isRequired
}

export default UsersMenuSheet
