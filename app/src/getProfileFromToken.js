import base64url from 'base64url';

export default tokenJson => {
    const token = JSON.parse(tokenJson);
    const jwt = JSON.parse(window.atob(token.id_token.split('.')[1]));

    return { id: 'my-profile', ...jwt }
}
