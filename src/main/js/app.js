'use strict'

const React = require('react')
const ReactDOM = require('react-dom')

class App extends React.Component {

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

ReactDOM.render(
	<App />,
	document.getElementById('react')
)
