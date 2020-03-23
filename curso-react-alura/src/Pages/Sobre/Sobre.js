import React, { Fragment } from 'react';
import Header from '../../Components/Header/Header';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

const useEstilos = makeStyles({
    titulo: {
        textAlign: 'center',
        color: 'blue'
    }
})
const Sobre = () => {
    const classes = useEstilos()
    return (
        <Fragment>
            <Header />
            <Container maxWidth="sm">
                <Typography className={classes.titulo} variant="h1" component="h2">
                    Sobre
                </Typography>
                <Typography variant="body1" componet='p'>
                    A casa do codigo lorem ipsumn ipsumn bla bla bla.
                    A casa do codigo lorem ipsumnipsumn bla bla bla.
                    A casa do codigo lorem ipsumn bla bla bla.
                    A casa do codigo lorem ipsumn bla bla bla.
                    A casa do codigo lorem ipsumn bla bla bla.
                    A casa do codigo lorem ipsumn bla bla bla.
                </Typography>
                
            </Container>
        </Fragment>
    );
}

export default Sobre;