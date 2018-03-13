import React, {Component} from 'react'
import PropTypes from 'prop-types'
import withCurrentUser from '../../../../HOC/withCurrentUser'
import {can, cancanUser, MenuDocument as MenuDocumentItem} from '../../../abilities'

const {object, func} = PropTypes

@withCurrentUser
class MenuDocument extends Component {
  static propTypes = {
    onSubmit: func.isRequired,
    currentUser: object
  }

  constructor(props) {
    super(props)
    this.state = {
      file: null
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  handleSubmit = (e) => {
    e.preventDefault()

    this.props.onSubmit({file: this.state.file, restaurant: this.props.restaurantName})

    this.form.reset()
  }

  onChange(e) {
    this.setState({file: e.target.files[0]})
  }

  render() {
    let uploadedText = `Uploaded at: ${ new Date(this.props.uploadedAt) } by ${ this.props.userName }`

    let text = `Restaurant name: \
      ${ this.props.restaurantName }, \
      ${ this.props.uploadedAt ? uploadedText : '' }`

    const user = cancanUser(this.props.currentUser)

    return (
      <div className='col'>
        {
          can(user, 'manage', MenuDocumentItem)
            ? <form
              className='menu-document-form'
              ref={el => {
                this.form = el
              }}
              onSubmit={this.handleSubmit}>
              {text}
              <input type='file' onChange={this.onChange}/>
              <input type='submit' className='btn btn-primary' value='Upload'/>
            </form>
            : ''
        }
        <div dangerouslySetInnerHTML={{__html: this.props.content}}/>
      </div>
    )
  }
}

const {string, number} = PropTypes

MenuDocument.propTypes = {
  restaurantName: string.isRequired,
  fileName: string,
  uploadedAt: number,
  userName: string,
  content: string
}

export default MenuDocument
