export default tokenJson => {
    const token = JSON.parse(tokenJson);
    const jwt = JSON.parse(atob(token.id_token.split(".")[1]));

    return { id: 'my-profile', ...jwt }
}
