const dataProvider = (type, resource, params) => {
    switch (type) {
        case 'GET_LIST':
            return { data: [{ id: 'id', name: 'Resource', date: new Date() }], total: 1 };
        default:
            return null;
    }
}

export default dataProvider;
