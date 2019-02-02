import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUsers } from '../../actions';

import UsersRow from '../../components/UsersRow/UsersRow';

class Users extends Component {
    componentDidMount() {
        this.props.fetchUsers();
    }

    renderUsers() {
        return (
            this.props.users.map(user => {
                return (
                    <UsersRow key={user.id} user={user} />
                )
            })
        )
    }

    render() {
        const { users } = this.props;

        if (!users) {
            return <div className="text-center">Loading...</div>;
        }

        return (
            <div className="container page-container">
                <table className="table">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">User ID</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Phone</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderUsers()}
                    </tbody>
                </table>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { users: state.users.users };
}

export default connect(mapStateToProps, { fetchUsers })(Users);