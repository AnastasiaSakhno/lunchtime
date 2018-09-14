import React from 'react'
import {bool, string, object, func} from 'prop-types'
import {branch, renderComponent, renderNothing} from 'recompose'
import {Popover, PopoverBody} from 'reactstrap'

const WholeWeekDuplication = ({active, target, date, user, menu, duplicateWholeWeekMenu, deactivate}) => (
  <Popover placement="bottom" isOpen={active} target={target}>
    <PopoverBody>
      <div className='form-check'>
        <input
          autoFocus={true}
          id='wholeWeekDuplicationInput'
          className='whole-week-duplication-input form-check-input'
          type='checkbox'
          onBlur={deactivate}
          onClick={() => duplicateWholeWeekMenu({active, date, user, menu})}/>
        <label className='form-check-label' htmlFor='wholeWeekDuplicationInput'>Duplicate menu</label>
      </div>
    </PopoverBody>
  </Popover>
)

WholeWeekDuplication.propTypes = {
  active: bool.isRequired,
  target: string,
  date: string,
  user: object,
  menu: object,
  duplicateWholeWeekMenu: func.isRequired,
  deactivate: func.isRequired
}

export default branch(
  (props) => props.active,
  renderComponent(WholeWeekDuplication),
  renderNothing
)()
