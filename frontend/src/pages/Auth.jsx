import React, { Component } from 'react';
import { Container, Form, Button } from 'semantic-ui-react';

class Auth extends Component {


    state = {
        isLogin: true
    };




    // REFERANCES OR REF API BUILT INTO REACT 
    // https://reactjs.org/docs/refs-and-the-dom.html
    constructor(props) {
        super(props);
        this.emailEl = React.createRef();
        this.passwordEl = React.createRef();

    }



    switchModeHandler = () => {
        this.setState(prevState => {
            // REVERT THE VALUE 
            return { isLogin: !prevState.isLogin }
        });
    }

    submitHandler = (event) => {
        event.preventDefault();
        const email = this.emailEl.current.value;
        const password = this.passwordEl.current.value;


        if (email.trim().length === 0 || password.trim().length === 0) {
            return;
        }

        console.log(email, password);



        const host = "http://localhost:8000/graphql";
        // SENDING REQUEST TO BACKEND GRAPHQL API 

        // QUERY FOR LOGIN 
        // login(email: String!, password: String!): AuthData!
        let requestBody = {
            query: `
                query{
                    login(email: "${email}", password: "${password}"){
                        userId
                        token
                        tokenExpiration
                    }
                }
            `
        };



        if (!this.state.isLogin) {
            // MUTATION  FOR SIGN UP 
            // createUser(userInput: UserInput): User
            requestBody = {
                query: `
                mutation{
                    createUser(userInput: {email: "${email}", password: "${password}"}){
                        _id
                        email
                    }
                }
            `
            };
        }










        fetch(`${host}`, {
            method: "POST",  //GRAPHQL WORKS WITH ONLY POST REQUEST
            body: JSON.stringify(requestBody),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => {
                if (res.status !== 200 && res.status !== 201) {
                    throw new Error('Failed!');
                }
                return res.json();
            })
            .then(resData => {
                console.log(resData);
            })
            .catch(err => {
                console.log(err);
            });

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
                        <Button color="teal" onClick={this.switchModeHandler} type="button">Switch to {this.state.isLogin ? "Signup" : "Login"}</Button>
                    </Button.Group>
                </Form>
            </Container>

        );
    }
}


export default Auth;