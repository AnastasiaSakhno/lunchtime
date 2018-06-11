import React from 'react'
import {string, object} from 'prop-types'

import {formattedDate} from '../../../../utils/date'

const ReadonlyMenuDocument = ({restaurant, user, uploadedAt, content}) => {
  let text = `Restaurant name: \
      ${ restaurant.name }, \
      ${ uploadedAt ? `Uploaded at ${ formattedDate(uploadedAt) } by ${ user.fullName }` : '' }`

  return (
    <div className='col'>
      <div>{text}</div>
      <div dangerouslySetInnerHTML={{__html: content}}/>
    </div>
  )
}

ReadonlyMenuDocument.propTypes = {
  restaurant: object.isRequired,
  user: object,
  uploadedAt: object,
  content: string
}

export default ReadonlyMenuDocument
