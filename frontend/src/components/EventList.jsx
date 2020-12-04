import React from 'react';
import {Segment, List } from 'semantic-ui-react';


const EventList = (props) => {
    const events = props.events.map(event => {
        return <List.Item key={event._id}> <Segment color="teal">{event.title} </Segment> </List.Item>;
    });
    return (
        <div>
            <List size="large" animated>
                {events}
            </List>
        </div>
    )
};

export default EventList;
