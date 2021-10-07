import React from 'react';
import { List, Button, Header, Grid, Divider } from 'semantic-ui-react';

const BookingList = props => {
    return (
        <React.Fragment>
            <List animated>
                {props.bookings.map(booking => {
                    return (
                        <List.Item key={booking._id}>
                                <Grid columns={2}> 
                                    <Grid.Column>
                                        <Header as="h3" color="teal">
                                            {booking.event.title} -
                                            {new Date(booking.createdAt).toLocaleDateString()}
                                        </Header>
                                    </Grid.Column>
                                    <Grid.Column textAlign="right">
                                        <Button color="red" onClick={props.onDelete.bind(this, booking._id)} >Cancel</Button>
                                    </Grid.Column>
                                </Grid>
                                <Divider ></Divider>
                        </List.Item>
                    );
                })}
            </List>
        </React.Fragment>
    )
}






export default BookingList;