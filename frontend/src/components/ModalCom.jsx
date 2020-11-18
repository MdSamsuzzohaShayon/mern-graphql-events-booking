import React from 'react';
import { Button, Header, Modal, Image} from "semantic-ui-react";
import './Modal.css';


const ModalCom = props => {
    return (
        <Modal
            onClose={props.onClose}
            onOpen={props.onOpen}
            open={props.open}
            trigger={props.trigger}
        >
            <Modal.Header>Select a Photo</Modal.Header>
            <Modal.Content image>
                <Image size='medium' src='/images/avatar/large/rachel.png' wrapped />
                <Modal.Description>
                    <Header>Default Profile Image</Header>
                    <p>
                        We've found the following gravatar image associated with your e-mail
                        address.
          </p>
                    <p>Is it okay to use this photo?</p>
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
                <Button color='black' onClick={props.onClose}>
                    Close
        </Button>
                <Button
                    content="Yep, that's me"
                    labelPosition='right'
                    icon='checkmark'
                    onClick={props.onOpen}
                    positive
                />
            </Modal.Actions>
        </Modal>
    );
}


export default ModalCom;