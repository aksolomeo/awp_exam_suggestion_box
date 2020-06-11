import React, {Component} from 'react';
import {Link} from "@reach/router";
import PostSuggestion from './PostSuggestion';
import {connect} from 'react-redux'
import './css/MainPage.css';

class MainPage extends Component {

    render() {

        return (
            <div>
                <div className="main-page-wrapper">
                    <h1 className="main-page__h1">Enter new suggestion</h1>
                    <PostSuggestion postSuggestion={(suggestion) => this.props.postSuggestion(suggestion)}/>
                    <ul className="main-page__ul">
                        <li className="main-page__li main-page__li-first-item">
                            <span className="uppercase text-align-left bold">Name</span>
                            <span className="uppercase text-align-center bold">Creator</span>
                            <span className="uppercase text-align-right bold">No Signatures</span>
                        </li>
                        {this.props.suggestions.map(function (item) {
                            return <li className="main-page__li" key={item._id}>
                                <Link className="main-page__link text-align-left "
                                      to={`/suggestion/${item._id}`}>{item.name}</Link>
                                <span className="text-align-center">{item.creatorFullName}</span>
                                <span className="text-align-right">{item.signatures.length}</span>
                            </li>
                        })}
                    </ul>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {username: state.username};
};

export default connect(mapStateToProps)(MainPage);