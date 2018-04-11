import React from 'react'
import {string, number, object} from 'prop-types'

const ReadonlyMenuDocument = ({restaurant, user, uploadedAt, fileData}) => {
  let text = `Restaurant name: \
      ${ restaurant.name }, \
      ${ uploadedAt ? `Uploaded at: ${ new Date(uploadedAt) } by ${ user.name }` : '' }`

  return (
    <div className='col'>
      <div>{text}</div>
      <div dangerouslySetInnerHTML={{__html: fileData}}/>
    </div>
  )
}

ReadonlyMenuDocument.propTypes = {
  restaurant: object.isRequired,
  user: object,
  uploadedAt: number,
  fileData: string
}

export default ReadonlyMenuDocument
