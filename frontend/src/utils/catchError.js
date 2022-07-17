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
          return 'Password length must be at least 6 characters long';
      case '"title" must be a string':
          return 'Title is required';
      default:
          return errorMessage;
  }
}

module.exports = (error) => {
    if (error.response) {
        let errorMessage, tempMessage;
        if (error.response.data){
          tempMessage = error.response.data.message;
        } else {
          tempMessage = error.message;
        }
        errorMessage = convertErrorMessageToDisplay(tempMessage);
        return {
            success: false,
            errorMessage,
        };
    }
};