import React, { Component } from 'react';
import { Container, Button, Header, Segment } from 'semantic-ui-react';
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
                                    Create Event</Button>}>

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
