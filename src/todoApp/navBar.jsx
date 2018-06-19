import React from 'react';

const NavBar = (props) => {
    return (
        <nav className="navbar navbar-light bg-light mb-4">
            <a className="navbar-brand">TodoApp-Capstone</a>
            <form className="form-inline">
                {props.logOutButton ? <button className="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={props.logOut}>Logout</button> : <div></div>}
            </form>
        </nav>
    )
};

export default NavBar;