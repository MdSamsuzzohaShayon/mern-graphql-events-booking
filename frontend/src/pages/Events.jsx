import React, { Component } from 'react';
import { Container, Button, Header, Segment, Form } from 'semantic-ui-react';
import ModalCom from "../components/ModalCom";




class Events extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
        // https://reactjs.org/docs/refs-and-the-dom.html
        this.titleElRef = React.createRef();
        this.priceElRef = React.createRef();
        this.dateElRef = React.createRef();
        this.descriptionElRef = React.createRef();
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
        if (title.trim().length === 0 || price.trim().length === 0 || date.trim().length === 0 || description.trim().length === 0) {
            return;
        }
        const event = { title, price, date, description };
        console.log("Event: ", event);
        this.setState({
            open: false
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
                <br />
                <Container >


                    <br /><br />
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

                </Container>
            </React.Fragment>

        )
    }
}

export default Events;
