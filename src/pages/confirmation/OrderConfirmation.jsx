import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { useOrderDetail } from '../../contexts/OrderDetails';

export default function OrderConfirmation ({setOrderPhase}) {
    const { resetOrder } = useOrderDetail();
    const [orderNumber, setOrderNumber] = useState(null);

    useEffect(()=> {
        axios.post(`http://localhost:3030/order`)
        .then((res)=> {
            setOrderNumber(res.data.orderNumber)
        })
        .catch((error)=> {
            // error handle
        })
    },[]);

    function handleClick() {
        resetOrder();
        setOrderPhase('inProgress')
    }

    if (orderNumber) {
        return(
            <div style={{testAlign: 'center'}}>
                <h1>Thank you!</h1>
                <p>Your order number is {orderNumber}</p>
                <p style={{fontSize: '25%'}}>
                    as per our terms and conditions, nothings will happen now
                </p>
                <Button onClick={handleClick}>Create new order</Button>
            </div>
        )
    } else {
        return <div>Loading</div>
    }
}