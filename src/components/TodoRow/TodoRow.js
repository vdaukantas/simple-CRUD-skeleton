import React from 'react';
import EditableLabel from 'react-inline-editing';
import './TodoRow.css';

const TodoRow = (props) => {
    const { id, title, completed } = props.todo;
    const taskTitleClasses = `${completed ? "completed" : ""} task-title`

    const getTaskDetails = (taskTitle) => {
        props.handleTaskEdit(id, taskTitle);
    }

    return (
        <tr className="task-row">
            <td className="align-top">
                <div className="task">
                    <div className="task-status-wrapper">
                        {completed ?
                            (<i className="fas fa-check-square task-button checkbox" data-id={id} onClick={props.handleTaskUndone}></i>) :
                            (<i className="far fa-check-square task-button checkbox" data-id={id} onClick={props.handleTaskDone}></i>)}
                    </div>
                    <div className="task-edit-wrapper">
                        <EditableLabel
                            text={title}
                            labelClassName={taskTitleClasses}
                            inputClassName="task-edit"
                            inputWidth="100%"
                            onFocusOut={getTaskDetails} />
                    </div>
                </div>
            </td>
            <td className="text-right align-top">
                <i className="fas fa-trash-alt task-button" data-id={id} onClick={props.handleTaskDelete}></i>
            </td>
        </tr>
    )
};

export default TodoRow;  