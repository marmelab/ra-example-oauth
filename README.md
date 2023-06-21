# ra-example-oauth

This example shows how to support OAuth in a react-admin v4 application.

## Requirements

1. A google application: ret up a project in the [Google API Console](https://console.developers.google.com/) to obtain OAuth 2.0 credentials, set a redirect URI, and (optionally) customize the branding information that your users see on the user-consent screen
2. [Configure OAuth](https://developers.google.com/identity/openid-connect/openid-connect) for this application with `http://localhost:5173/auth-callback` as the authorized origin and `http://localhost:5173/auth-callback` as the authorized redirect URI. Copy the client ID and secret.
3. Rename  the `.env.template` files in both the `app` and `api` directory and update the following variables:
    - `VITE_OIDC_CLIENT_ID`: Paste the client ID you copied at step 2
    - `OIDC_CLIENT_ID`: Paste the client ID you copied at step 2
    - `OIDC_CLIENT_SECRET`: Paste the secret you copied at step 2

## Installation

Run the following command:

```sh
make install
```

## Development

1. Start the API by running:
    ```sh
    make run-api
    ```

2. In another terminal, start the application by running:
    ```sh
    make run-app
    ```
