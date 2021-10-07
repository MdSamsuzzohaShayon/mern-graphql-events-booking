import React, { Component } from 'react';
import keys from '../config/keys';
import { Container, Form, Button } from 'semantic-ui-react';
import AuthContext from "../context/auth-context";


class Auth extends Component {



    // REFERANCES OR REF API BUILT INTO REACT 
    // https://reactjs.org/docs/refs-and-the-dom.html
    constructor(props) {
        super(props);
        this.state = {
            isLogin: true
        }
        this.emailEl = React.createRef();
        this.passwordEl = React.createRef();

    }


    static contextType = AuthContext;



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



        
        // SENDING REQUEST TO BACKEND GRAPHQL API 

        // QUERY FOR LOGIN 
        // login(email: String!, password: String!): AuthData!
        let requestBody = {
            query: `
                query Login($email: String!, $password: String!){
                    login(email: $email, password: $password){
                        userId
                        token
                        tokenExpiration
                    }
                }
            `,
            variables:{
                email,
                password
            }
        };




        if (!this.state.isLogin) {
            // MUTATION  FOR SIGN UP 
            // createUser(userInput: UserInput): User
            requestBody = {
                query: `
                mutation CreateUser($email: String!, $password: String!){
                    createUser(userInput: {email: $email, password: $password}){
                        _id
                        email
                    }
                }
            `,
            variables: {
                email,
                password
            }
            };
        }










        fetch(keys.API_ENDPOINT, {
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
                if (resData.data.login.token) {
                    this.context.login(resData.data.login.token, resData.data.login.userId, resData.data.login.tokenExpiration);
                }
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