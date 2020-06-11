import React, {Component} from 'react';
import {Link} from "@reach/router";
import { connect } from 'react-redux'
import './css/Navbar.css';
import {setUser} from "./store/actions";

class Navbar extends Component {

    signOut() {
        this.props.setUser({username: null, fullName: null})
    }

    render() {
        return (
            <div className="container">
                <div className="navbar__link-wrapper">
                    {this.props.username &&  <p className="navbar__text">Welcome {this.props.username}</p>}
                    {this.props.username &&  <p className="navbar__text navbar__link" onClick={() => this.signOut()}>Sign out</p>}
                    {!this.props.username &&  <Link className="navbar__text navbar__link" to={`/login`}>Sign In</Link>}
                    {!this.props.username &&  <Link className="navbar__text navbar__link" to={`/register`}>Register</Link>}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { username: state.username};
};

const mapDispatchToProps = dispatch => ({
    setUser: user => dispatch(setUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);