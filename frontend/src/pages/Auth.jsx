import React, { Component } from 'react';
import { Container, Form, Button } from 'semantic-ui-react';

class Auth extends Component {
    // REFERANCES OR REF API BUILT INTO REACT 
    // https://reactjs.org/docs/refs-and-the-dom.html
    constructor(props) {
        super(props);
        this.emailEl = React.createRef();
        this.passwordEl = React.createRef();

    }

    submitHandler = (event) => {
        event.preventDefault();
        const email = this.emailEl.current.value;
        const password = this.passwordEl.current.value;


        if (email.trim().length === 0 || password.trim().length === 0) {
            return;
        }

        console.log(email, password);






    }

    render() {
        return (
            <Container>
                <br /><br />
                <Form onSubmit={this.submitHandler}>
                    <Form.Group widths="equal">
                        <Form.Field>
                            <label className="ui header blue" >Email</label>
                            <input type="email" ref={this.emailEl} placeholder='Enter your email' />
                        </Form.Field>
                        <Form.Field>
                            <label className="ui header blue" >Password</label>
                            <input type="password" ref={this.passwordEl} placeholder='Enter your password' />
                        </Form.Field>
                    </Form.Group>
                    <Button.Group>
                        <Button color="teal" type="submit">Submit</Button>
                        <Button.Or />
                        <Button color="teal" type="button">Switch to Sign Up</Button>
                    </Button.Group>
                </Form>
            </Container>

        );
    }
}


export default Auth;