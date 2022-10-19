import Alert from 'react-bootstrap/Alert';

export default function AlterBanner ({message, variant}) {
    const alertMessage = message || 'An unexpected error code. Please try again later';
    const alertVariant = variant || 'danger';

    return (
        <Alert variant={alertVariant} style={{backgroundColor: 'red'}}>
            {alertMessage}
        </Alert> 
    )
}

