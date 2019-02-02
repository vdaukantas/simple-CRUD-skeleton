import React from 'react';
import { Link } from "react-router-dom";

const UsersRow = (props) => {
    const { id, email, phone, name} = props.user;

    return (
        <tr>
            <th scope="row">{id}</th>
            <td><Link to={`/user/${id}`}>{name}</Link></td>
            <td>{email}</td>
            <td>{phone}</td>
        </tr>
    )
};

export default UsersRow; 