import React from 'react';
import { List, Segment, Button, Header, Grid } from 'semantic-ui-react';

const BookingList = props => {
    return (
        <React.Fragment>
            <List>
                {props.bookings.map(booking => {
                    return (
                        <List.Item key={booking._id}>
                            <Segment >
                                <Grid columns={2}> 
                                    <Grid.Column>
                                        <Header as="h3" color="teal">
                                            {booking.event.title} -
                                            {new Date(booking.createdAt).toLocaleDateString()}
                                        </Header>
                                    </Grid.Column>
                                    <Grid.Column textAlign="right">
                                        <Button color="red" >Cancel</Button>
                                    </Grid.Column>
                                </Grid>
                            </Segment>
                        </List.Item>
                    );
                })}
            </List>
        </React.Fragment>
    )
}

export default BookingList;
