import React, { Component } from 'react';
import { Container, Form, Input, Button } from 'semantic-ui-react';

class Auth extends Component {
    render() {
        return (
            <Container>
                <br/><br/>
                <Form>
                    <Form.Group widths="equal">
                        <Form.Field
                            control={Input}
                            label="Email"
                            placeholder="Enter your email"
                        />
                        <Form.Field
                            control={Input}
                            label="Password"
                            placeholder="Enter your password"
                            type="password"
                        />
                    </Form.Group>
                    <Button.Group>
                        <Button color="teal" type="submit">Submit</Button>
                        <Button.Or />
                        <Button color="teal" type="submit">Switch to Sign Up</Button>
                    </Button.Group>
                </Form>
            </Container>

        );
    }
}


export default Auth;