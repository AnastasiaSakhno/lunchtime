import React from 'react'
import {string, number, arrayOf, shape, func} from 'prop-types'
import MenuDocument from '../MenuDocument'

const MenuDocumentsList = ({data, onSubmit}) => {
  const map = data.map((md) => (
    <MenuDocument {...md} key={`menu_document_${md.restaurantName}`} onSubmit={onSubmit}/>
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
      restaurantName: string.isRequired,
      fileName: string,
      uploadedAt: number,
      userName: string,
      content: string
    })
  ).isRequired,
  onSubmit: func.isRequired
}

export default MenuDocumentsList
