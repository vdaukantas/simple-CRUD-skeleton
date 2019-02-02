import React from 'react';

const FieldNewTask = (props) => {
    return (
        <form action="" onSubmit={props.handleSubmit}>
            <div className="input-group mb-3">
                <input
                    type="text"
                    value={props.newTask}
                    className="form-control"
                    placeholder="Enter a new task"
                    aria-label="Enter a new task"
                    aria-describedby="button-addon2"
                    onChange={props.handleChange} />
                <div className="input-group-append">
                    <button className="btn btn-dark" type="submit" id="button-addon2">Add</button>
                </div>
            </div>
        </form>
    )
};

export default FieldNewTask;