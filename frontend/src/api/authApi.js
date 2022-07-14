import api from './commonApi';

const getErrorMessageFromErrorCode = (errorCode) => {
    switch (errorCode) {
      case 400:
        return 'Please enter username and password!';
      case 401:
        return 'Incorrect username or password';
      default:
        return 'Invalid account, please try again!';
    }
};

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
                    const errorCode = error.response.status;
                    const errorMessage = getErrorMessageFromErrorCode(errorCode);
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
                    const errorCode = error.response.status;
                    const errorMessage = getErrorMessageFromErrorCode(errorCode);
                    return {
                        success: false,
                        errorMessage,
                    };
                }
            });
    }
}