import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { userLogin as userLoginAction } from 'react-admin';

import { withStyles, createStyles } from '@material-ui/core/styles';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import parseQueryString from './parseQueryString';

const styles = ({ spacing }) =>
    createStyles({
        button: {
            width: '100%',
        },
        icon: {
            marginRight: spacing.unit,
        },
    });

// We are forced to get the token at the top level
// Because react-admin redirects to /login and we lose the query params
const { hash } = new URL(window.location.href);
let token = hash ? parseQueryString(hash) : null;

const LoginForm = ({ classes, userLogin }) => {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // If token is present, we came back from the provider
        if (token) {
            setLoading(true);
            userLogin({ token });
            token = null;
        }
    }, [userLogin]);

    const handleLogin = () => {
        setLoading(true);
        userLogin(); // Do not provide token, just trigger the 
    };

    return (
        <div>
            <CardActions>
                <Button
                    className={classes.button}
                    variant="raised"
                    type="submit"
                    color="primary"
                    onClick={handleLogin}
                    disabled={loading}
                >
                    {loading && (
                        <CircularProgress
                            className={classes.icon}
                            size={18}
                            thickness={2}
                        />
                    )}
                    Login With Google
                </Button>
            </CardActions>
        </div>
    );
}

const mapDispatchToProps = {
    userLogin: userLoginAction,
}

export default connect(undefined, mapDispatchToProps)(withStyles(styles)(LoginForm));
