import React, { Component } from 'react';
import keys from '../config/keys';
import { Container, Tab, Loader, Dimmer,Segment } from 'semantic-ui-react';
import AuthContext from '../context/auth-context';
import BookingList from '../components/BookingList';
import BookingCart from '../components/BookingCart';

class Bookings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            bookings: []
        };
    }

    isActive = true;


    static contextType = AuthContext;






    componentDidMount() {
        this.fetchBookings();
    }


    fetchBookings = () => {
        console.log("Fetch bookings");
        this.setState({ isLoading: true });

        // type Booking{
        //     _id: ID!
        //     event: Event!
        //     user: User!
        //     createdAt: String!
        //     updatedAt: String!
        // }
        // bookings: [Booking!]!

        // GETTING ALL bookings
        const requestBody = {
            query: `
                query {
                    bookings{
                    _id
                    createdAt
                    event{
                        _id
                        title
                        date
                        price
                    }
                    }
                }
        `,
        };


        fetch(keys.API_ENDPOINT, {
            method: "POST",  //GRAPHQL WORKS WITH ONLY POST REQUEST
            body: JSON.stringify(requestBody),
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + this.context.token
            }
        })
            .then(res => {
                // console.log("Response: ", res);
                if (res.status !== 200 && res.status !== 201) {
                    throw new Error('Failed!');
                }
                return res.json();
            })
            .then(resData => {
                // console.log("Response Data: ", resData);
                const bookings = resData.data.bookings;
                // USING CUSTOM LEADER 
                if (this.isActive) {
                    setTimeout(() => {
                        this.setState({ bookings, isLoading: false });
                    }, 600);
                }
            })
            .catch(err => {
                console.log(err);
                if (this.isActive) {
                    this.setState({ isLoading: false });
                }
            });

    }



    componentWillUnmount() {
        this.isActive = false;
    }





    deleteBookingHandler = bookingId => {
        // console.log("Cancel bookings hanlder", bookingId);
        this.setState({ isLoading: true });

        // type Event{
        //     _id: ID!
        //     title: String!
        //     description: String!
        //     price: Float!
        //     date: String!
        //     creator: User!
        // }
        // cancelBooking(bookingId: ID!): Event!

        // GETTING ALL bookings
        const requestBody = {
            query: `
                    mutation CancelBooking($id: ID!) {
                        cancelBooking(bookingId: $id){
                            _id
                            title
                        }
                    }
            `,
            variables: {
                id: bookingId
            }
        };


        fetch(keys.API_ENDPOINT, {
            method: "POST",  //GRAPHQL WORKS WITH ONLY POST REQUEST
            body: JSON.stringify(requestBody),
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + this.context.token
            }
        })
            .then(res => {
                // console.log("Response: ", res);
                if (res.status !== 200 && res.status !== 201) {
                    throw new Error('Failed!');
                }
                return res.json();
            })
            .then(resData => {
                console.log("Response from cancel booking");
                // USING CUSTOM LEADER 
                setTimeout(() => {
                    this.setState(prevState => {
                        const updatedBookings = prevState.bookings.filter(booking => {
                            return booking._id !== bookingId;
                        });
                        return { bookings: updatedBookings, isLoading: false }

                    });
                }, 600);
            })
            .catch(err => {
                console.log(err);
                if (this.isActive) {
                    this.setState({ isLoading: false });
                }
            });
    }

    render() {
        // console.log("State", this.state);

        // console.log("Token: ", this.context.token);

        let content = <Dimmer active> <Loader size='massive' >Loading</Loader></Dimmer>;
        if (!this.state.isLoading) {
            const panes = [
                { menuItem: 'List', render: () => <Tab.Pane><BookingList bookings={this.state.bookings} onDelete={this.deleteBookingHandler} /></Tab.Pane> },
                { menuItem: 'Charts', render: () => <Tab.Pane><BookingCart bookings={this.state.bookings} /></Tab.Pane> },
            ]
            content = (
                <React.Fragment>
                    <Container>
                        <Segment color="teal">
                            <Tab panes={panes} />
                        </Segment>
                    </Container>
                </React.Fragment>
            );
        }
        return (
            <React.Fragment>
                {content}
            </React.Fragment>
        )
    }
}

export default Bookings;
