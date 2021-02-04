import React, { useState } from 'react';
import { Segment, List, Button, Header, Grid, Divider, Card, Modal } from 'semantic-ui-react';



const EventList = (props) => {
    const [open, setOpen] = useState(false);

    // function closeTheModal(e) {
    //     e.preventDefault();
    //     console.log("Opening the modal");
    //     setOpen(prevOpen => prevOpen = false);
    // }

    // function openTheModal(e) {
    //     e.preventDefault();
    //     console.log("closing the modal");
    //     setOpen(prevOpen => prevOpen = true);
    // }

    // function showModalContent(e) {
    //     e.preventDefault();
    //     console.log("Modal content");
    //     return (
    //         <Card>
    //             <Card.Content>
    //                 <Card.Header>Daniel</Card.Header>
    //                 <Card.Meta>Joined in 2016</Card.Meta>
    //                 <Card.Description>
    //                     Daniel is a comedian living in Nashville.
    //                 </Card.Description>
    //             </Card.Content>
    //             <Card.Content extra>
    //                 <a>
    //                     <Icon name='user' />
    //     10 Friends
    //   </a>
    //             </Card.Content>
    //         </Card>
    //     );
    // }




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
                                Nope
                            </Button>
                            <Button
                                content="Yep, that's me"
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
