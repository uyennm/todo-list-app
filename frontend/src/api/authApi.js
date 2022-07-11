import api from './commonApi';

export default {
    login(user) {
        return api
            .post('/auth/login', user)
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

    signup(user) {
        return api
            .post('/auth/signup', user)
            .then((response) => {
                if (response.token) {
                    localStorage.setItem('user', JSON.stringify(response.data.user));
                }

                return response.data.user;
            })
    }
}