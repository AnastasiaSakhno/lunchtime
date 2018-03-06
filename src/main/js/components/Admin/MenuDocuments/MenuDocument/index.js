import React, {Component} from 'react'
import PropTypes from 'prop-types'

class MenuDocument extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired
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

    return (
      <div className='col'>
        <form className='menu-document-form' ref={el => {
          this.form = el
        }}>
          {text}
          <input type='file' onChange={this.onChange}/>
          <button className='btn btn-primary' onSubmit={this.handleSubmit}>Upload</button>
        </form>
        <div dangerouslySetInnerHTML={{__html: this.props.content}}/>
      </div>
    )
  }
}

const {string, number, } = PropTypes

MenuDocument.propTypes = {
  restaurantName: string.isRequired,
  fileName: string,
  uploadedAt: number,
  userName: string,
  content: string
}

export default MenuDocument
