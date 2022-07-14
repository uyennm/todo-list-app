import api from './commonApi';

const converErrorMessageToDisplay = (errorMessage) => {
    switch (errorMessage) {
        case '"username" must be a string':
            return 'Username is required';
        case '"username" length must be at least 4 characters long':
            return 'Username length must be at least 4 characters long';
        case '"password" must be a string':
            return 'Password is required';
        case '"passwordConfirm" must be [ref:password]':
            return 'Confirm password does not match';
        case '"password" length must be at least 6 characters long':
            return 'Password length must be at least 6 characters long'
        default:
            return errorMessage;
    }
}

export default {
    login(user) {
        return api
            .post('/auth/login', user)
            .then((response) => {
                if (response.data.token) {
                    localStorage.setItem('user', JSON.stringify(response.data.user));
                    localStorage.setItem('token', JSON.stringify(response.data.token));
                }

                return {
                    success: true,
                    response,
                }
            })
            .catch (error => {
                if (error.response) {
                    const errorMessage = converErrorMessageToDisplay(error.response.data.message);
                    console.log(error.response.data.message);
                    return {
                        success: false,
                        errorMessage,
                    };
                }
            });
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
                return {
                    success: true,
                    response,
                }
            })
            .catch (error => {
                if (error.response) {
                    const errorMessage = converErrorMessageToDisplay(error.response.data.message);
                    return {
                        success: false,
                        errorMessage,
                    };
                }
            });
    }
}