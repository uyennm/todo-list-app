import api from './commonApi';
import localStorageService from './../services/localStorage';
import catchError from './../utils/catchError';

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
            return catchError(error);
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
            return catchError(error);
        }
    }
}