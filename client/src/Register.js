import React, {Component} from 'react';
import './css/Register.css';
import {Link, navigate} from "@reach/router";

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            pass: '',
            fullName: '',
            success: false,
            error: false
        };

        this.updateUsername = this.updateUsername.bind(this);
        this.updatePassword = this.updatePassword.bind(this);
        this.updateFullName = this.updateFullName.bind(this);
    }

    updateUsername(e) {
        this.setState({user: e.target.value});
    }

    updatePassword(e) {
        this.setState({pass: e.target.value});
    }

    updateFullName(e) {
        this.setState({fullName: e.target.value});
    }

    // Allow user to register only if all of the required fields are filled in
    submit() {
        if (this.state.user !== '' && this.state.pass !== '' && this.state.fullName !== ''){
            this.props.createUser({username: this.state.user, password: this.state.pass, fullName: this.state.fullName});
            this.setState({error: false});
            this.setState({success: true});
        } else {
            this.setState({success: false});
            this.setState({error: true})
        }

    }

    render() {
        return (
            <div className="register">
                <Link className="register__back-arrow" to="/">🡨</Link>
                <div className="register__input-wrapper">
                    <input className="register__input" placeholder="Username" type="text"
                           onChange={this.updateUsername}/>
                    <input className="register__input" placeholder="Password" type="password"
                           onChange={this.updatePassword}/>
                    <input className="register__input" placeholder="Full name" type="text"
                           onChange={this.updateFullName}/>
                    <button className="register__button" onClick={() => this.submit()}>Register</button>


                    {
                        this.state.success && <p className="register__success">You have successfully registered!</p>
                    }

                    {
                        this.state.error && <p className="error">Registration failed! Fill in all the
                            required fields and try again.</p>
                    }

                </div>
            </div>
        );
    }
}

export default Register;