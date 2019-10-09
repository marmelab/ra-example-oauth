export default queryString => queryString
    .substring(1)
    .split('&')
    .reduce((acc, directive) => {
        const [key, value] = directive.split('=');
        acc[decodeURIComponent(key)] = decodeURIComponent(value);
        return acc;
    }, {});
