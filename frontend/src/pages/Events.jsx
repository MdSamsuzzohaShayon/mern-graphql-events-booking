import React, { Component } from 'react';
import { Container, Button, Header, Segment, Form } from 'semantic-ui-react';
import EventList from "../components/EventList";
import ModalCom from "../components/ModalCom";
import AuthContext from "../context/auth-context";






class Events extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            events: []
        };
        // https://reactjs.org/docs/refs-and-the-dom.html
        this.titleElRef = React.createRef();
        this.priceElRef = React.createRef();
        this.dateElRef = React.createRef();
        this.descriptionElRef = React.createRef();
    }


    // ACCESSING TOKEN FROM CONTEXT API 
    static contextType = AuthContext;




    componentDidMount() {
        this.fetchEvents();
    }



    closeTheModal = () => {
        this.setState({
            open: false
        });
    }

    openTheModal = () => {
        console.log("closing the modal");
        this.setState({
            open: true
        });
    }





    modalHandleSubmit = () => {
        console.log("modal handle submit");
        const title = this.titleElRef.current.value;
        const price = +this.priceElRef.current.value;  // PLUS SIGN CONVERT IT TO NUMBER VARIABLE
        const date = this.dateElRef.current.value;
        const description = this.descriptionElRef.current.value;
        if (title.trim().length === 0 || price <= 0 || date.trim().length === 0 || description.trim().length === 0) {
            return;
        }
        const event = { title, price, date, description };
        console.log("Event: ", event);




        // createEvent(eventInput: EventInput): Event
        /*
        input EventInput{
            title: String!
            description: String!
            price: Float!
            date: String!
        }
        */
        // REQUEST BODY WILL BE ALWAYS SAME SO WEB DON'T NEED TO CHECK LOGIN OR NOT
        const requestBody = {
            query: `
          mutation {
            createEvent(eventInput: {title: "${title}", description: "${description}", price: ${price}, date: "${date}"}) {
              _id
              title
              description
              date
              price
              creator {
                _id
                email
              }
            }
          }
        `
        };



        const token = this.context.token;
        fetch("http://localhost:8000/graphql", {
            method: "POST",  //GRAPHQL WORKS WITH ONLY POST REQUEST
            body: JSON.stringify(requestBody),
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            }
        })
            .then(res => {
                if (res.status !== 200 && res.status !== 201) {
                    throw new Error('Failed!');
                }
                return res.json();
            })
            .then(resData => {
                this.fetchEvents();
            })
            .catch(err => {
                console.log(err);
            });

    }


    fetchEvents = () => {
        // events: [Event!]!
        /*
        type Event{
        _id: ID!
        title: String!
        description: String!
        price: Float!
        date: String!
        creator: User!
    }
        */
        // GETTING ALL EVENTS
        const requestBody = {
            query: `
                query {
                    events{
                    _id
                    title
                    description
                    date
                    price
                    creator {
                        _id
                        email
                    }
                    }
                }
        `
        };


        fetch("http://localhost:8000/graphql", {
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
                const events = resData.data.events;
                this.setState({ events });
            })
            .catch(err => {
                console.log(err);
            });
    }



    formContent = () => {
        console.log("form content");
        return (
            <Form onSubmit={this.modalHandleSubmit} >
                <Form.Field>
                    <label className="ui header blue" >Title</label>
                    <input ref={this.titleElRef} type="text" placeholder='Enter events title' />
                </Form.Field>
                <Form.Group widths="equal">
                    <Form.Field>
                        <label className="ui header blue" >Price</label>
                        <input ref={this.priceElRef} type="number" placeholder='Entry events price' />
                    </Form.Field>
                    <Form.Field>
                        <label className="ui header blue" >Date</label>
                        <input ref={this.dateElRef} type="datetime-local" placeholder='enter events date' />
                    </Form.Field>
                </Form.Group>
                <Form.Field>
                    <label className="ui header blue" >Description</label>
                    <textarea rows={2} ref={this.descriptionElRef} type="text" placeholder='Enter events title' />
                </Form.Field>
                <Button className="ui blue button" type='submit'>Submit</Button>

                {/* <Form.TextArea label='Description' rows='2' placeholder='Long descriptions...' /> */}
            </Form>
        );
    }



    // GRAPHQL SCEMA FOR CREATING EVENTS 
    // createEvent(eventInput: EventInput): Event
    // input EventInput{
    //     title: String!
    //     description: String!
    //     price: Float!
    //     date: String!
    // }

    render() {
        return (
            <React.Fragment>

                <Container >
                    <br />


                    <br /><br />
                    {/* IF THE TOKEN IS EXIST WE ARE GOING TO RENDER THE SEGMENT OF CREATE EVENT  */}
                    {this.context.token &&
                        <Segment >
                            <br />
                            <Header textAlign="center">
                                <h2>Share your own events</h2>
                                <ModalCom
                                    onSubmit={this.modalHandleSubmit}
                                    title="Add event"
                                    open={this.state.open}
                                    onOpen={this.openTheModal}
                                    onClose={this.closeTheModal}
                                    trigger={<Button color="teal">
                                        Create Event</Button>}
                                    formContent={this.formContent()}
                                >

                                </ModalCom>
                            </Header>
                            <br />
                        </Segment>
                    }
                        <EventList events={this.state.events} />
                </Container>
            </React.Fragment>

        )
    }
}

export default Events;
