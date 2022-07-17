import api from './commonApi';
import localStorageService from './../services/localStorage';

const convertErrorMessageToDisplay = (errorMessage) => {
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
    async login(user) {
        let response;
        try {
            response = await api.post('/auth/login', user);
            const currUser = {
                username: response.data.user.username,
                token: response.data.token,
            }

            if (response.data.token) {
                localStorageService.setUser(currUser);
            }

            return {
                success: true,
                currUser,
            }
        } catch (error) {
            if (error.response) {
                const errorMessage = convertErrorMessageToDisplay(error.response.data.message);
                console.log(error.response.data.message);
                return {
                    success: false,
                    errorMessage,
                };
            }
        }
    },

    logout() {
        localStorageService.removeTodos();
        localStorageService.removeUser();
    },

    async signup(user) {
        let response;
        try {
            response = await api.post('/auth/signup', user);
            const currUser = {
                username: response.data.user.username,
                token: response.data.token,
            }

            if (response.data.token) {
                localStorageService.setUser(currUser);
            }

            return {
                success: true,
                currUser,
            }
        } catch (error) {
            if (error.response) {
                const errorMessage = convertErrorMessageToDisplay(error.response.data.message);
                return {
                    success: false,
                    errorMessage,
                };
            }
        }
    }
}