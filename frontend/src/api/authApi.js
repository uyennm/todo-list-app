import api from './commonApi';

export default {
    login(username, password) {
        return api
            .post('/auth/login', {
                username,
                password
            })
            .then((response) => {
                if (response.token) {
                    localStorage.setItem('user', JSON.stringify(response.data.user));
                }

                return response.data.user;
            })
    },

    logout() {
        localStorage.removeItem('user');
    },

    signup(username, password, passwordConfirm) {
        return api
            .post('/auth/signup', {
                username,
                password,
                passwordConfirm
            })
            .then((response) => {
                if (response.token) {
                    localStorage.setItem('user', JSON.stringify(response.data.user));
                }

                return response.data.user;
            })
    }
}