import React, {Component} from 'react';
import {Link, navigate} from "@reach/router";
import { connect } from 'react-redux'
import { setUser } from './store/actions'
import './css/Login.css';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            error: false
        };

        this.updateUsername = this.updateUsername.bind(this);
        this.updatePassword = this.updatePassword.bind(this);
    }

    updateUsername(e) {
        this.setState({username: e.target.value});
    }

    updatePassword(e) {
        this.setState({password: e.target.value});
    }

    submit() {

        fetch(`${process.env.REACT_APP_API_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({username: this.state.username, password: this.state.password})
        })
            .then(response => response.json())
            .then(response => {
                if(response !== null && response.username !== null && response.password !== null){
                    this.props.setUser({username: response.username, fullName: response.fullName})
                    navigate("/");
                } else {
                    this.setState({error: true});
                }
            });
    }

    render() {
        return (
            <div className="login">
                <Link className="login__back-arrow" to="/">🡨</Link>
                <div className="login__input-wrapper">
                    <input className="login__input" placeholder="Username" type="text"
                           onChange={this.updateUsername}/>
                    <input className="login__input" placeholder="Password" type="password"
                           onChange={this.updatePassword}/>
                    <button className="login__button" onClick={() => this.submit()}>Sign In</button>
                    {
                        this.state.error && <p className="error">Login failed! :( Please try again!</p>
                    }
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    setUser: user => dispatch(setUser(user))
});

export default connect(null, mapDispatchToProps)(Login);