import Options from './Options';
import Button from 'react-bootstrap/Button'
import { useOrderDetail } from '../../contexts/OrderDetails';
import { formatCurrency } from '../../utilities';


export default function OrderEntry ({setOrderPhase}) {
    const { totals } = useOrderDetail();
    return(
        <div>
            <h1>Design Your Sundae!</h1>
            <Options optionType='scoops' />
            <Options optionType='toppings' />
            <h2>Grand total: {formatCurrency(totals.scoops + totals.toppings)}</h2>
            <Button onClick={()=> setOrderPhase('review')}>Order Sundae!</Button>
        </div>
    )
}