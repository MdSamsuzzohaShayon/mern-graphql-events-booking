// THIS WILL ONLY WORK ON CALL BASED COMPONENT 

import React from 'react';
import { Button,  Modal } from "semantic-ui-react";



const ModalCom = props => {
    return (
        <Modal
            onClose={props.onClose}
            onOpen={props.onOpen}
            open={props.open}
            trigger={props.trigger}
        >
            <Modal.Header>{props.title} </Modal.Header>
            <Modal.Content >
                {props.modalContent}
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