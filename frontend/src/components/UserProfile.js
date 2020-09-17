import React, { useState, Component } from "react";
import axios from "axios";
import Cookie from "js-cookie";
import CSRFToken from './csrftoken';
import { Button, FormGroup, FormControl, FormLabel, Card, Table, Modal } from "react-bootstrap";
import "./style.css";

class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
          data: [],
          loaded: false,
          modal_show: false,
          email: '',
          username: ''
        };

        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleClose() {
        this.setState(state => ({
            modal_show: false
        }));
    }

    handleShow() {
        this.setState(state => ({
            modal_show: true
        }));
    }

    handleChange(event) {
        var i_name = event.target.name;
        var i_value = event.target.value;
        this.setState(state => ({
            [i_name]: i_value
        }));
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.handleEdit(event, this.state);
        this.setState(state => ({
            modal_show: false
        }));
    }

    componentDidMount() {
        this.setState(state => ({
            email: this.props.user.email,
            username: this.props.user.username
        }));
    }

    render() {
        return <div className='userProfile'>
            <Card>
                <Card.Body>
                    <Card.Title>Profil</Card.Title>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Username</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{this.state.username}</td>
                                <td>{this.state.email}</td>
                            </tr>
                        </tbody>
                    </Table>
                    <Button variant="primary" onClick={this.handleShow}>Mettre à jour</Button>

                    <Modal show={this.state.modal_show} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Modal heading</Modal.Title>
                        </Modal.Header>
                        <form onSubmit={(event) => this.handleSubmit(event)}>
                        <Modal.Body>
                            <CSRFToken />
                            <FormGroup controlId="email">
                                <FormLabel>Email</FormLabel>
                                <FormControl
                                    autoFocus
                                    name="email"
                                    type="text"
                                    defaultValue={this.state.email}
                                    onChange={this.handleChange}
                                />
                            </FormGroup>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.handleClose}>
                                Close
                            </Button>
                            <Button block variant="primary" type="submit">
                                Save Changes
                            </Button>
                        </Modal.Footer>
                        </form>
                    </Modal>
                </Card.Body>    
            </Card>
        </div>
    }
}

export default UserProfile;