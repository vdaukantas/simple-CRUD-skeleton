import React from 'react';

const FilterDropDown = (props) => {
    return (
        <div className="input-group mb-3">
            <div className="input-group-prepend">
                <label className="input-group-text" htmlFor="inputGroupSelect01">Show</label>
            </div>
            <select className="custom-select" id="inputGroupSelect01" name="sort" onChange={props.handleFiltering}>
                <option value="all">All</option>
                <option value="completed">Completed</option>
                <option value="inProgress">In progress</option>
            </select>
        </div>
    )
};

export default FilterDropDown;