import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { useOrderDetail } from '../../contexts/OrderDetails';
import AlterBanner from '../common/AlertBanner';

export default function OrderConfirmation ({setOrderPhase}) {
    const { resetOrder } = useOrderDetail();
    const [orderNumber, setOrderNumber] = useState(null);
    const [error, setError] = useState(false)

    useEffect(()=> {
        axios.post(`http://localhost:3030/order`)
        .then((res)=> {
            setOrderNumber(res.data.orderNumber)
        })
        .catch((error)=> {
           setError(true);
        })
    },[]);

    const newOrderButton = (
        <Button onClick={handleClick}>Create new order</Button>
    );

    if (error) {
        return (
            <>
                <AlterBanner message={null} variant={null} />
                {newOrderButton}
            </>
        )
    }

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
                {newOrderButton}
            </div>
        )
    } else {
        return <div>Loading</div>
    }
}