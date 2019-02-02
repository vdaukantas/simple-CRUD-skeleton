import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    fetchTodoList,
    doListFiltering,
    doTaskDelete,
    doTaskAdd,
    doTaskDone,
    doTaskUndone,
    doTaskEdit
} from '../../actions';

import TodoRow from '../../components/TodoRow/TodoRow';
import FilterDropDown from '../../components/FilterDropdown/FilterDropdown';
import FieldNewTask from '../../components/FieldNewTask/FieldNewTask';

class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state = { newTask: '' };
    }

    componentDidMount() {
        const id = this.props.userId;

        this.props.fetchTodoList(id);
    }

    renderTodoList() {
        const { todoList, filterBy } = this.props;
        const filteredTodoList = todoList.filter(todo => {
            switch (filterBy) {
                case 'all':
                    return todo;
                case 'inProgress':
                    return todo.completed !== true;
                case 'completed':
                    return todo.completed === true;
                default:
                    return todo;
            }
        });

        return (
            filteredTodoList.map(todo => {
                return (
                    <TodoRow
                        key={todo.id}
                        todo={todo}
                        handleTaskDelete={this.handleTaskDelete}
                        handleTaskEdit={this.handleTaskEdit}
                        handleTaskDone={this.handleTaskDone}
                        handleTaskUndone={this.handleTaskUndone} />
                )
            })
        )
    }

    handleTaskDone = (e) => {
        this.props.doTaskDone(e.target.dataset.id);
    }

    handleTaskUndone = (e) => {
        this.props.doTaskUndone(e.target.dataset.id);
    }

    handleFiltering = (e) => {
        this.props.doListFiltering(e.target.value);
    }

    handleTaskDelete = (e) => {
        this.props.doTaskDelete(e.target.dataset.id, () => {
            console.log('task deleted');
        })
    }

    handleTaskEdit = (taskId, taskTitle) => {
        this.props.doTaskEdit(taskId, taskTitle);
    }

    handleTaskAdd = (e) => {
        e.preventDefault();

        this.props.doTaskAdd(
            {
                title: this.state.newTask,
                user: this.props.userId,
                //random id hardcoded for this example
                //cause some request errors
                id: Math.floor((Math.random() * 1000) + 500)
            }, () => {
                console.log('Task added');
            });

        this.setState({ newTask: '' })
    }

    handleNewTaskChange = (e) => {
        this.setState({ newTask: e.target.value })
    }

    render() {
        const { todoList } = this.props;

        if (!todoList) {
            return <div className="text-center">Loading...</div>;
        }

        return (
            <div>
                <div className="clearfix">
                    <div className="float-right">
                        <FilterDropDown handleFiltering={this.handleFiltering} />
                    </div>
                </div>

                <div>
                    <FieldNewTask
                        handleSubmit={this.handleTaskAdd}
                        handleChange={this.handleNewTaskChange}
                        newTask={this.state.newTask} />
                </div>

                <table className="table todo-table">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">Task</th>
                            <th scope="col" className="text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderTodoList()}
                    </tbody>
                </table>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        todoList: state.todoList.todoList,
        filterBy: state.todoList.filterBy
    };
}

export default connect(mapStateToProps, {
    fetchTodoList,
    doListFiltering,
    doTaskDelete,
    doTaskAdd,
    doTaskDone,
    doTaskUndone,
    doTaskEdit
})(TodoList);