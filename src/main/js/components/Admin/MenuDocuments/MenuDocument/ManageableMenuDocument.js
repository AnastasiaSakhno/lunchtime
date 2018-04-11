import React from 'react'
import {string, number, object, func} from 'prop-types'
import {href} from '../../../../utils/object'

const ManageableMenuDocument = ({currentUser, restaurant, user, uploadedAt, fileData, onSubmit}) => {
  let file = null

  const handleSubmit = (e) => {
    e.preventDefault()

    onSubmit({file: file, restaurant: href(restaurant), user: href(currentUser)})

    e.target.reset()
  }

  const onChange = (e) => {
    file = e.target.files[0]
  }

  let uploadedText = `Uploaded at: ${ new Date(uploadedAt) } by ${ user.name }`

  let text = `Restaurant name: \
      ${ restaurant.name }, \
      ${ uploadedAt ? uploadedText : '' }`

  return (
    <div className='col'>
      <form
        className='menu-document-form'
        onSubmit={handleSubmit}>
        {text}
        <input type='file' onChange={onChange}/>
        <input type='submit' className='btn btn-dark' value='Upload'/>
      </form>
      <div dangerouslySetInnerHTML={{__html: fileData}}/>
    </div>
  )
}

ManageableMenuDocument.propTypes = {
  currentUser: object.isRequired,
  restaurant: object.isRequired,
  user: object,
  fileName: string,
  fileData: string,
  uploadedAt: number,
  onSubmit: func.isRequired
}

export default ManageableMenuDocument
