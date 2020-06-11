import React, {Component} from 'react';
import { connect } from 'react-redux'
import './css/PostSignature.css';

class PostSignature extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            error: false
        };

        this.updateSignature= this.updateSignature.bind(this);
    }

    updateSignature(e) {
        this.setState({ name: e.target.value });
    }

    // If the signature doesn't match the FULL NAME of the signed-in user, throw an error
    async submit() {
        if(this.props.fullName === this.state.name) {
            this.props.postSignature({ name: this.state.name });
        } else {
            this.setState({ error: true });
        }
    }

    render() {
        return (
            <div className="post-signature__input-wrapper">
                <div>
                    <input className="post-signature__input" placeholder="Write your signature here (full name)" type="text" onChange={this.updateSignature}/>
                    <button className="post-signature__button" onClick={() => this.submit()}>Submit</button>
                </div>

                { this.state.error && <p className="error">Your signature is invalid! Please sign with a valid signature (HINT: your FULL NAME),
                or else you are gonna be reported to the authorities for faking your identity.</p>}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { fullName: state.fullName};
};

export default connect(mapStateToProps)(PostSignature);
