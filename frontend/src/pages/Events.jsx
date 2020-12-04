import React, { Component } from 'react';
import { Container, Button, Header, Segment, Form } from 'semantic-ui-react';
import ModalCom from "../components/ModalCom";




class Events extends Component {
    state = {
        open: false
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



    formContent = () => {
        console.log("form content");
        return (
            <Form>
                <Form.Field>
                    <label className="ui header blue" >Title</label>
                    <input type="text" placeholder='Enter events title' />
                </Form.Field>
                <Form.Group widths="equal">
                    <Form.Field>
                        <label className="ui header blue" >Price</label>
                        <input type="number" placeholder='Entry events price' />
                    </Form.Field>
                    <Form.Field>
                        <label className="ui header blue" >Date</label>
                        <input type="date" placeholder='enter events date' />
                    </Form.Field>
                </Form.Group>
                <Form.TextArea label='Description' rows='2' placeholder='Long descriptions...' />
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
                <br />
                <Container >


                    <br /><br />
                    <Segment >
                        <br />
                        <Header textAlign="center">
                            <h2>Share your own events</h2>
                            <ModalCom
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

                </Container>
            </React.Fragment>

        )
    }
}

export default Events;
