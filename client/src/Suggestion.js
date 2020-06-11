import React, {Component} from 'react';
import PostSignature from './PostSignature';
import {Link} from "@reach/router";
import './css/Suggestion.css';

class Suggestion extends Component {
    render() {
        const id = this.props.id;
        const suggestion = this.props.getSuggestion(id);

        if (suggestion) {
            return (
                    <div>
                        <Link className="suggestion__back-arrow" to="/">🡨</Link>
                            <h1 className="suggestion__h1">{suggestion.name}</h1>
                            <PostSignature postSignature={(signature) => this.props.postSignature(this.props.id, signature)}/>
                            <ul className="suggestion__signature-list">
                                <li className="suggestion__signature-item suggestion__signature-first-item">
                                    <span className="text-align-left uppercase bold">Name</span>
                                    <span className="text-align-right uppercase bold">Date</span>
                                </li>
                            {
                                suggestion.signatures.map((signature) => {
                                    return <li className="suggestion__signature-item">
                                        <span className="text-align-left">{signature.name}</span>
                                        <span className="text-align-right">{new Date(signature.date).toLocaleString()}</span>
                                    </li>
                                })
                            }
                            </ul>
                    </div>
            );
        } else {
            return (<div>Loading</div>)
        }
    }
}

export default Suggestion;