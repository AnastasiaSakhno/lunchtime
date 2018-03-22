import React from 'react'
import {string, number, func} from 'prop-types'

const ManageableMenuDocument = ({restaurantName, userName, uploadedAt, content, onSubmit}) => {
  let file = null

  const handleSubmit = (e) => {
    e.preventDefault()

    onSubmit({file: file, restaurant: restaurantName})

    e.target.reset()
  }

  const onChange = (e) => {
    file = e.target.files[0]
  }

  let uploadedText = `Uploaded at: ${ new Date(uploadedAt) } by ${ userName }`

  let text = `Restaurant name: \
      ${ restaurantName }, \
      ${ uploadedAt ? uploadedText : '' }`

  return (
    <div className='col'>
      <form
        className='menu-document-form'
        onSubmit={handleSubmit}>
        {text}
        <input type='file' onChange={onChange}/>
        <input type='submit' className='btn btn-primary' value='Upload'/>
      </form>
      <div dangerouslySetInnerHTML={{__html: content}}/>
    </div>
  )
}

ManageableMenuDocument.propTypes = {
  restaurantName: string.isRequired,
  fileName: string,
  uploadedAt: number,
  userName: string,
  content: string,
  onSubmit: func.isRequired
}

export default ManageableMenuDocument
