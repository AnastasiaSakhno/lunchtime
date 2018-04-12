import React from 'react'
import {string, number, object, func} from 'prop-types'

import {formattedDate} from '../../../../utils/date'

const ManageableMenuDocument = ({restaurant, user, uploadedAt, content, onSubmit}) => {
  let file = null

  const handleSubmit = (e) => {
    e.preventDefault()

    onSubmit({file: file, restaurant: restaurant})

    e.target.reset()
  }

  const onChange = (e) => {
    file = e.target.files[0]
  }

  let text = `Restaurant name: \
      ${ restaurant.name }, \
      ${ uploadedAt ? `Uploaded at ${ formattedDate(uploadedAt) } by ${ user.fullName }` : '' }`

  return (
    <div className='col'>
      <form
        className='menu-document-form'
        onSubmit={handleSubmit}>
        {text}
        <input type='file' onChange={onChange}/>
        <input type='submit' className='btn btn-dark' value='Upload'/>
      </form>
      <div dangerouslySetInnerHTML={{__html: content}}/>
    </div>
  )
}

ManageableMenuDocument.propTypes = {
  restaurant: object.isRequired,
  user: object,
  fileName: string,
  content: string,
  uploadedAt: object,
  onSubmit: func.isRequired
}

export default ManageableMenuDocument
