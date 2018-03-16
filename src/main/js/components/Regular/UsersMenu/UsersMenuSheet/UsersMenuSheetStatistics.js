import React, {Component} from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import {groupBy} from 'ramda'

class UsersMenuSheetStatistics extends Component {
  render() {
    let groupedByMenuNames = groupBy(udm => udm.menu.name)(this.props.data)
    let groupedByMenuNamesAndDate = Object.entries(groupedByMenuNames).map(entry => {
      const [menu, arr] = entry
      let groupedByDate = groupBy(udm => {
        return `${udm.date.year}-${('0' + udm.date.monthOfYear).slice(-2)}-${udm.date.dayOfMonth}`
      })(arr)
      return {menu: {name: menu}, groupedByDate: groupedByDate}
    })

    const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']

    const headers = weekDays.map(day => {
      return <th scope="col" key={`total_${day}`} className='col-2'>{day}</th>
    })

    let weekStatistics = this.props.menuList.map(menu => {
      let menuStatistics = groupedByMenuNamesAndDate.find(gmd => gmd.menu.name === menu.name)
      let dayMenuStatistics = weekDays.map((day, index) => {
        let date = moment(this.props.startDate).day(index + 1).format('YYYY-MM-DD')
        let arr = menuStatistics ? menuStatistics.groupedByDate[date] : []
        return (<td className='col-2' key={`total_statistics_${menu.name}_${day}`}>
          {`${menu.name} ${arr ? arr.length : 0}`}
        </td>)
      })
      return (<tr className='row' key={`total_statistics_row_${menu.name}`}>
        <td className='col-2' key={`total_statistics_col_${menu.name}`}/>
        {dayMenuStatistics}
      </tr>)
    })

    return (
      <table className="table table-sm table-bordered table-hover">
        <thead className="thead-dark">
          <tr className='row'>
            <th scope="col" className='col-2'/>
            {headers}
          </tr>
        </thead>
        <tbody>{weekStatistics}</tbody>
      </table>
    )
  }
}

const {string, array} = PropTypes

UsersMenuSheetStatistics.propTypes = {
  startDate: string,
  data: array,
  menuList: array.isRequired
}

export default UsersMenuSheetStatistics
