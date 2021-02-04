import React, { useState } from 'react';
import { Segment, List, Button, Header, Grid, Divider, Modal } from 'semantic-ui-react';



const EventList = (props) => {
    const [open, setOpen] = useState(false);




    function bookEventHandler(event) {
        if(!props.context.token){
            setOpen(prevOpen => prevOpen=false);
            return;
        }
        console.log("Token: ", props.context.token);
        // e.preventDefault();
        setOpen(prevOpen => prevOpen=false);
        // type Booking{
        //     _id: ID!
        //     event: Event!
        //     user: User!
        //     createdAt: String!
        //     updatedAt: String!
        // }
        // bookEvent(eventId: ID!): Booking!

        const requestBody = {
            query: `
                mutation {
                    bookEvent (eventId: "${event._id}"){
                    createdAt
                    updatedAt
                    }
                }
        `,
        };


        fetch("http://localhost:8000/graphql", {
            method: "POST",  //GRAPHQL WORKS WITH ONLY POST REQUEST
            body: JSON.stringify(requestBody),
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + props.context.token
            }
        })
            .then(res => {
                if (res.status !== 200 && res.status !== 201) {
                    throw new Error('Failed!');
                }
                return res.json();
            })
            .then(resData => {
                // const events = resData.data.events;
                // USING CUSTOM LEADER 
                setTimeout(() => {
                    // this.setState({ events, isLoading: false });
                    console.log(resData);
                }, 1000);
            })
            .catch(err => {
                console.log(err);
                // this.setState({ isLoading: false });
            });
    }


    const events = props.events.map(event => {
        return (
            <List.Item
                key={event._id}
            >
                <Segment color="teal">
                    <Header as="h3" color="teal"  >
                        {event.title}
                    </Header>
                    <Grid columns={2} relaxed='very' stackable>
                        <Grid.Column>
                            <Header as="h5" color="red" >Price $ {event.price}</Header>
                        </Grid.Column>

                        <Grid.Column verticalAlign='middle'>
                            <Header as="h5" color="teal" textAlign="right">Date {new Date(event.date).toLocaleDateString()}</Header>
                        </Grid.Column>
                    </Grid>

                    <Divider vertical>And</Divider>



                    {props.authUserId === event.creator._id ? <p><br />you are owner of this event</p> : <Modal
                        onClose={() => setOpen(false)}
                        onOpen={() => setOpen(true)}
                        open={open}
                        trigger={<Button color="teal">View Details</Button>}
                    >
                        <Modal.Header>Event Details</Modal.Header>
                        <Modal.Content >

                            <Modal.Description>
                                <Header>{event.title}</Header>
                                <Header as="h5" color="red" >Price $ {event.price}</Header>
                                <p>
                                    {event.description}
                                </p>
                                <Header as="h3" color="teal">{new Date(event.date).toLocaleDateString()}</Header>
                            </Modal.Description>
                        </Modal.Content>
                        <Modal.Actions>

                            <Button color='black' onClick={() => setOpen(false)}>
                                Cancel
                            </Button>

                            {/* BOOK EVENT  */}
                            <Button
                                content={props.context.token? "Book Event" : "Confirm"}
                                labelPosition='right'
                                icon='checkmark'
                                onClick={e => bookEventHandler(event)}
                                positive
                            />
                        </Modal.Actions>
                    </Modal>}




                </Segment>

            </List.Item>
        );
    });
    return (

        <List size="large" animated>
            {events}
        </List>
    )
};

export default EventList;
