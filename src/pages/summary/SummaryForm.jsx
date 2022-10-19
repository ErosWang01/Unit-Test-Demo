import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

export default function SummaryForm({setOrderPhase}) {
    const [tcChecked, setTcChecked] = useState(false);

    function handleSubmit(event) {
        event.preventDefault();
        setOrderPhase('completed');
    }

    const popover = (
        <Popover id="popover-basic">
          <Popover.Body>No ice cream will actually be delivered</Popover.Body>
        </Popover>
      );
      
    const checkboxLabel = (
        <OverlayTrigger placement="right" overlay={popover}>
            <span>
                I agree to <span>terms and conditions</span>
            </span>
        </OverlayTrigger>
    );

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId='terms-and-conditions'>
                <Form.Check
                    type='checkbox'
                    checked={tcChecked}
                    onChange={(e)=> setTcChecked(e.target.checked)}
                    label={checkboxLabel}
                />       
            </Form.Group>
            <Button variant='primary' type="submit" disabled={!tcChecked}>
                Confirm order
            </Button>
        </Form>
    );
}