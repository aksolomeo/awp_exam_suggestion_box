import React, {Component} from 'react';
import { connect } from 'react-redux'
import './css/PostSuggestion.css';

class PostSuggestion extends Component {
    constructor(props) {
        super(props);
        this.state = {
             name: ''
        };

        this.updateSuggestion = this.updateSuggestion.bind(this);
    }

    updateSuggestion(e) {
        this.setState({ name: e.target.value });
    }

    submit() {
        if(this.state.name && this.props.fullName) {
            this.props.postSuggestion({ name: this.state.name, creatorFullName: this.props.fullName });
        }
    }

    render() {
        return (
            <div className="post-suggestion__input-wrapper">
                <input className="post-suggestion__input" type="text" onChange={this.updateSuggestion}/>
                <button className="post-suggestion__button" onClick={() => this.submit()}>Submit</button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { fullName: state.fullName};
};


export default connect(mapStateToProps)(PostSuggestion);