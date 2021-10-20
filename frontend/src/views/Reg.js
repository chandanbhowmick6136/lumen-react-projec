import React from 'react';
import * as _ from "lodash";
import User from "../User";

class Reg extends React.Component {
    constructor() {
        super();
        this.state = {
            email: '',
            name: '',
            password: ''
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className="row justify-content-md-center">
                    <div className="col-md-auto">
                        <div class="shadow-sm p-3 mb-5 bg-white rounded mt-5">
                            <div className="form-group">
                                <label htmlFor="email">Name</label>
                                <input type="email" className="form-control" id="name"
                                       aria-describedby="nameHelp" placeholder="Enter name"
                                       value={this.state.name}
                                       onChange={this.onInputChanged}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email address</label>
                                <input type="email" className="form-control" id="email"
                                       aria-describedby="emailHelp" placeholder="Enter email"
                                       value={this.state.email}
                                       onChange={this.onInputChanged}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input type="password" className="form-control" id="password"
                                       placeholder="Password"
                                       value={this.state.password}
                                       onChange={this.onInputChanged}/>
                            </div>
                            
                            <button className="btn btn-primary"
                                    onClick={() => this.register()}>Register
                            </button>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }

    /**
     * Handle input changes
     */
    onInputChanged = ({target: {value, id: field}}) => {
        this.setState((prevState) => {
            _.set(prevState, field, value);
            return prevState;
        });
    };

    // Proceed with user login
    register() {
        // Try do do login, if success redirect user, if not show an error
        User.register(this.state).then(user => {
            this.props.history.push("/dashboard");
        }).catch(errorMessage => {
            alert(errorMessage);
        });
    }

}


export default Reg;
