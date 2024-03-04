const users = [
    {
        username: 'admin',
        password: '1234',
        permission: 'admin'
    },
    {
        username: 'inter',
        password: '1234',
        permission: 'defaults'
    }
];


export default {
    getUsers() {
        return users;
    },

};
