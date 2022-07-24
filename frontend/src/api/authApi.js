import api from './commonApi';
import catchError from './../utils/catchError';

export default {
    async login(user) {
        let response;
        try {
            response = await api.post('/auth/login', user);
            return {
                success: true,
                response,
            }
        } catch (error) {
            return catchError(error);
        }
    },

    async signup(user) {
        let response;
        try {
            response = await api.post('/auth/signup', user);

            return {
                success: true,
                response,
            }
        } catch (error) {
            return catchError(error);
        }
    }
}