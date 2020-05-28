import base64url from 'base64url';

export default tokenJson => {
    const token = JSON.parse(tokenJson);
    const jwt = JSON.parse(base64url.decode(token.id_token.split('.')[1]));
    console.log(jwt)

    return { id: 'my-profile', ...jwt }
}
