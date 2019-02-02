import React, { Component } from 'react';
import { fetchUser } from "../../actions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { RadialChart } from 'react-vis';
import './UserDetails.css';

import TodoList from '../TodoList/TodoList';

class UserDetails extends Component {
    componentDidMount() {
        const { id } = this.props.match.params;
        this.props.fetchUser(id);
    }

    showProgressChart(list) {
        const tasksCompleted = list.filter(task => task.completed).length;
        const tasksInProgress = list.filter(task => !task.completed).length;
        const tasksTotal = list.length;

        return (
            <div>
                <RadialChart
                    colorType="literal"
                    className="progress-chart"
                    innerRadius={45}
                    radius={70}
                    data={[{ angle: tasksInProgress, color: '#fbda79' }, { angle: tasksCompleted, color: '#6dad6d' }]}
                    width={150}
                    height={150} />

                <div className="text-center progress-chart-label">
                    Completed {tasksCompleted} out of {tasksTotal} tasks
                </div>
            </div>
        );
    }

    render() {
        const { user, todoList } = this.props;

        if (!user) {
            return <div className="text-center">Loading...</div>;
        }

        const { id, email, phone, name } = user;

        return (
            <div className="container page-container">
                <Link to="/">Back To User List</Link>

                <h1 className="text-center user-title">{name}</h1>

                <div className="row user-overview">
                    <div className="col">
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item"><strong>User ID:</strong> {id}</li>
                            <li className="list-group-item"><strong>Email:</strong> {email}</li>
                            <li className="list-group-item"><strong>Phone:</strong> {phone}</li>
                        </ul>
                    </div>

                    <div className="col">
                        {todoList ? this.showProgressChart(todoList) : null}
                    </div>

                </div>

                <div className="row">
                    <div className="col">
                        <TodoList userId={id} />
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps({ users, todoList }, ownProps) {
    return {
        user: users[ownProps.match.params.id],
        todoList: todoList.todoList
    };
}

export default connect(mapStateToProps, { fetchUser })(UserDetails);