import api from './commonApi';

export default {
    login(user) {
        return api
            .post('/auth/login', user)
            .then((response) => {
                if (response.data.token) {
                    localStorage.setItem('user', JSON.stringify(response.data.user));
                    localStorage.setItem('token', JSON.stringify(response.data.token));
                }

                return response;
            })
    },

    logout() {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        localStorage.removeItem('todos')
    },

    signup(user) {
        return api
            .post('/auth/signup', user)
            .then((response) => {
                if (response.data.token) {
                    localStorage.setItem('user', JSON.stringify(response.data.user));
                    localStorage.setItem('token', JSON.stringify(response.data.token));
                }

                return response;
            })
    }
}