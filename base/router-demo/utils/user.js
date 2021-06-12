import { setItem, getItem, clear } from './storage'
export const User = {
    list() {
        let users = getItem('users') ? getItem('users') : [];
        return users;
    },
    add(user) {
        let users = User.list();
        users.push(user);
        setItem('users', users);
    },
    find(id) {
        let users = User.list();
        return users.find(user => user.id === id);
    },
    remove(id) {
        let users = User.list();
        let updateUser = users.filter(user => user.id != id);
        setItem('users', updateUser);
    },
    clear() {
        clear('users')
    }
}