import { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import ScoopOption from './ScoopOption';
import ToppingOption from './ToppingOption';
import axios from 'axios';
import AlterBanner from '../common/AlertBanner';
import { pricePerItem } from '../../constants';
import { formatCurrency } from '../../utilities';
import { useOrderDetail } from '../../contexts/OrderDetails';

export default function Options ({optionType}) {
    const [items, setItems] = useState([]);
    const [error, setError]= useState(false);
    const { totals } = useOrderDetail();

    useEffect (()=> {
        axios
        .get(`http://localhost:3030/${optionType}`)
        .then(response => setItems(response.data))
        .catch((error) => {
            // handle error
            setError(true);
        })
    }, [optionType]);

    if (error) {
        return <AlterBanner />
    }

    const ItemComponent = optionType === 'scoops' ? ScoopOption : ToppingOption;
    const title = optionType[0].toUpperCase() + optionType.slice(1).toLowerCase();

    const optionItems = items.map(item => <ItemComponent key={item.name} name={item.name} imagePath={item.imagePath} />)
    return(
        <>
            <h2>{title}</h2>
            <p>{formatCurrency(pricePerItem[optionType])} each</p>
            <p>{title} total: {formatCurrency(totals[optionType])}</p>
            <Row>{optionItems}</Row>
        </> 
    )
}