import React, { useState, Component } from "react";
import CSRFToken from './csrftoken';
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import "./style.css";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
          data: [],
          loaded: false,
          username: "",
          password: ""
        };

        this.handleChange = this.handleChange.bind(this);
        this.validateForm = this.validateForm.bind(this);
    }
  
    validateForm() {
      return this.state.username.length > 0 && this.state.password.length > 0;
    }
  
    handleChange(event) {
        var i_name = event.target.name;
        var i_value = event.target.value;
        this.setState(state => ({
            [i_name]: i_value
        }));
    }
  
    render() {
        if (!this.props.logged_in) {
            return (
            <div className="Login">
                <form onSubmit={(event) => this.props.handleLogin(event, this.state.username, this.state.password)}>
                    <CSRFToken />
                    <FormGroup controlId="username">
                        <FormLabel>Username</FormLabel>
                        <FormControl
                            autoFocus
                            name="username"
                            type="text"
                            defaultValue={this.state.username}
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    <FormGroup controlId="password">
                        <FormLabel>Password</FormLabel>
                        <FormControl
                            name="password"
                            type="password"
                            defaultValue={this.state.password}
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    <Button block disabled={!this.validateForm()} type="submit">
                        Login
                    </Button>
                </form>
            </div>)
        } else {
            return (
                <div className="Login">Déjà connecté</div>
            )
        }
    }
}

export default Login;