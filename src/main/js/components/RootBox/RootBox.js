import React from 'react'

const RootBox = () => {
  return (
    <div className="container-fluid">
      <Root/>
    </div>
  )
}

class Root extends React.Component {

  constructor(props) {
    super(props)
    this.state = {users: []}
  }

  componentDidMount() {
    fetch('/api/users')
      .then(resp => resp.json())
      .then(data => this.setState({users: data._embedded.users}))
  }

  render() {
    return (
      <UsersList users={this.state.users}/>
    )
  }
}

class UsersList extends React.Component{
  render() {
    var users = this.props.users.map(user =>
      <User key={user._links.self.href} user={user}/>
    )
    return (
      <table>
        <tbody>
        <tr>
          <th>Full Name</th>
          <th>Email</th>
          <th>Role</th>
        </tr>
        {users}
        </tbody>
      </table>
    )
  }
}

class User extends React.Component{
  render() {
    return (
      <tr>
        <td>{this.props.user.fullName}</td>
        <td>{this.props.user.email}</td>
        <td>{this.props.user.role}</td>
      </tr>
    )
  }
}

export default RootBox
