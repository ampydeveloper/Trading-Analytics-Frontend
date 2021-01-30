export default function ({ $axios, app, redirect }) {
    $axios.onError(error => {
      if(error.response.status == 401) {
        app.$auth.logout()
      }
    })
  }