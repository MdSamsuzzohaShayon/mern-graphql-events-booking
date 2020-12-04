import React from 'react';
import { Button, Form, Header, Modal, Image } from "semantic-ui-react";



const ModalCom = props => {
    return (
        <Modal
            onClose={props.onClose}
            onOpen={props.onOpen}
            open={props.open}
            trigger={props.trigger}
        >
            <Modal.Header>Create an event </Modal.Header>
            <Modal.Content >
                {props.formContent}
            </Modal.Content>
            <Modal.Actions>
                <Button color='black' onClick={props.onClose}> Close</Button>
                {/* FORM SUBMISSION BUTTON */}
                {/* <Button
                    content="Submit"
                    type="submit"
                    labelPosition='right'
                    icon='checkmark'
                    onClick={props.onOpen}
                    positive
                /> */}
            </Modal.Actions>
        </Modal>
    );
}


export default ModalCom;