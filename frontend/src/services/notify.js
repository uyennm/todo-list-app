import Vue from 'vue';

export const notifyError = (text, error) => {
  Vue.notify({
    group: 'alert',
    title: 'An error occurred',
    text,
    position: 'top right',
    type: 'error',
  });
  if (error) console.log(error);
};

export const notifySuccess = (text) => {
    Vue.notify({
      group: 'alert',
      title: 'Success!',
      text,
      position: 'top right',
      type: 'success',
    });
  };