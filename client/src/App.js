import React, {Component} from 'react';
import MainPage from './MainPage';
import Suggestion from './Suggestion';
import Register from "./Register";
import Navbar from "./Navbar";
import Login from "./Login";
import './css/App.css';
import {Router} from "@reach/router";

class App extends Component {

    API_URL = process.env.REACT_APP_API_URL;

    constructor(props) {
        super(props);
        this.state = {
            suggestions: []
        };
    }

    componentDidMount() {
        this.getSuggestions();
    }

    getSuggestions() {
        fetch(`${this.API_URL}/suggestion`)
            .then((response) => response.json())
            .then((data) => {
                this.setState({suggestions: data});
            });
    }

    getSuggestion(id) {
        const findFunction = suggestion => suggestion._id === id;
        return this.state.suggestions.find(findFunction);
    }

    postSuggestion(suggestion) {
        fetch(`${this.API_URL}/suggestion`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(suggestion)
        })
            .then(response => response.json())
            .then(() => {
                this.getSuggestions();
            });
    }

    postSignature(suggestionID, signature) {
        fetch(`${this.API_URL}/signature`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: signature.name,
                suggestionID: suggestionID
            })
        })
            .then(response => response.json())
            .then(() => {
                this.getSuggestions();
            });
    }

    createUser(user) {
        fetch(`${this.API_URL}/register`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(user)
        })
            .then(response => response.json());
    }

    render() {
        return (
            <div>
                <Navbar/>
                <Router className="container">
                    <MainPage
                        path="/"
                        suggestions={this.state.suggestions}
                        postSuggestion={(suggestion) => this.postSuggestion(suggestion)}/>
                    <Suggestion
                        path="/suggestion/:id"
                        getSuggestion={(id) => this.getSuggestion(id)}
                        postSignature={(suggestionID, signature) => this.postSignature(suggestionID, signature)}/>
                    <Register
                        path="/register"
                        createUser={(user) => this.createUser(user)}/>
                    <Login
                        path="/login"
                        login={(user) => this.login(user)}/>
                </Router>
            </div>
        );
    }
}

export default App;
