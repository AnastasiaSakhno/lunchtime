import React from 'react'
import {string, object, arrayOf, shape, func} from 'prop-types'
import MenuDocument from '../MenuDocument'

const MenuDocumentsList = ({data, onSubmit}) => {
  const map = data.map((md) => (
    <MenuDocument {...md} key={`menu_document_${md.restaurant.name}`} onSubmit={onSubmit}/>
  ))

  return (
    <div className="container-fluid menu-documents-list">
      <div className='row'>
        {map}
      </div>
    </div>
  )
}

MenuDocumentsList.propTypes = {
  data: arrayOf(
    shape({
      restaurant: object.isRequired,
      user: object,
      fileName: string,
      content: string,
      uploadedAt: object
    })
  ).isRequired,
  onSubmit: func.isRequired
}

export default MenuDocumentsList
