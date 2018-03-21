import React from 'react'
import {string} from 'prop-types'

const ReadonlyMenuDocument = ({content}) => (
  <div className='col'>
    <div dangerouslySetInnerHTML={{__html: content}}/>
  </div>
)

ReadonlyMenuDocument.propTypes = {
  content: string
}

export default ReadonlyMenuDocument
