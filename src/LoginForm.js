import React, { useRef, useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { userLogin as userLoginAction } from 'react-admin';
import { UserManager } from 'oidc-client';

import { withStyles, createStyles } from '@material-ui/core/styles';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

const issuer = 'https://accounts.google.com/';
const clientId = process.env.REACT_APP_CLIENT_ID;
const redirectUri = process.env.REACT_APP_REDIRECT_URI;

const styles = ({ spacing }) =>
    createStyles({
        button: {
            width: '100%',
        },
        icon: {
            marginRight: spacing.unit,
        },
    });


const parseFragment = hash => hash
    .substring(1)
    .split('&')
    .reduce((acc, directive) => {
        const [key, value] = directive.split('=');
        acc[decodeURIComponent(key)] = decodeURIComponent(value);
        return acc;
    }, {});

const { hash } = new URL(window.location.href);
let token = hash ? parseFragment(hash) : null

const LoginForm = ({ classes, userLogin }) => {
    const [loading, setLoading] = useState(!!token);

    const userManager = useRef(
        new UserManager({
            authority: issuer,
            client_id: clientId,
            redirect_uri: redirectUri,
            response_type: 'token',
            scope: 'openid email profile', // Allow to retrieve the email and user name later api side
        })
    );

    // 1. Redirect to the issuer to ask authentication
    const signinRedirect = useCallback(
        () => {
            if (token) {
                return;
            }
            setLoading(true);
            userManager.current.signinRedirect();
        },
        []
    );

    useEffect(() => {
        const handleOpenIdAuthentication = async () => {
            // 1. If the user isn't redirected from 
            if (!token) {
                return;
            }

            // 2. We came back from the issuer with #token infos in query params
            userLogin({ token });
            userManager.current.clearStaleState();
            token = null;
        };

        handleOpenIdAuthentication();
    }, [userLogin]);

    return (
        <div>
            <CardActions>
                <Button
                    className={classes.button}
                    variant="raised"
                    type="submit"
                    color="primary"
                    onClick={signinRedirect}
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
