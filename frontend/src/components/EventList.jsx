import React from 'react';
import { Segment, List, Button, Header } from 'semantic-ui-react';


const EventList = (props) => {
    const events = props.events.map(event => {
        return (
            <List.Item 
            key={event._id} 
            >
                <Segment color="teal">
                    <Header as="h3" color="teal"  >
                        {event.title}
                    </Header>
                    <br />
                    price : $123
                    
                    <br />
                    {props.authUserId === event.creator._id ? <p><br />you are owner of this event</p> : <Button color="teal">View Details</Button>}
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
