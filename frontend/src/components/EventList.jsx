import React, { useState } from 'react';
import { Segment, List, Button, Header, Grid, Divider, Card, Modal } from 'semantic-ui-react';



const EventList = (props) => {
    const [open, setOpen] = useState(false);






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
                                content="Book Event"
                                labelPosition='right'
                                icon='checkmark'
                                onClick={() => setOpen(false)}
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
