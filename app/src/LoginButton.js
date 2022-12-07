import React, { useEffect, useState } from 'react';
import { useSafeSetState, useLogin } from 'react-admin'
import PropTypes from 'prop-types';
import { Button, CardActions, CircularProgress, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(
    (theme) => ({
        button: {
            width: '100%',
        },
        icon: {
            marginRight: theme.spacing(1),
        },
    }),
    { name: 'RaLoginButton' }
);

function LoginButton ({ 
    redirectTo,
    ...rest
}) {
    const classes = useStyles();
    const login = useLogin();
    const [loading, setLoading] = useSafeSetState(false);

    const handleLogin = (code, state) => {
        setLoading(true)
        login({ code, state })
            .catch(error => {})
    }

    useEffect(() => {
        const { searchParams } = new URL(window.location.href);
        const code = searchParams.get('code');
        const state = searchParams.get('state');

        if (code && state) {
            handleLogin(code, state);
        }
    }, [])

    return (
        <CardActions>
            <Button
                {...rest}
                onClick={handleLogin}
                variant="contained"
                color="primary"
                disabled={loading}
                className={classes.button}
            >
                {loading && (
                    <CircularProgress
                        className={classes.icon}
                        size={18}
                        thickness={2}
                    />
                )}
              Logging in with Google
            </Button>
        </CardActions>
    );
};

LoginButton.propTypes = {
    redirectTo: PropTypes.string,
};

LoginButton.defaultProps = {
  redirectTo: '/'
}

export default LoginButton;
