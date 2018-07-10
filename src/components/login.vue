<template>
  <form class="user-form" id="user-login" novalidate="true">
    <p v-if="errors.length">
      <strong>Please correct the following error(s):</strong>
      <ul class="form-errors">
        <li v-for="error in errors" class="text-danger">{{error}}</li>
      </ul>
    </p>
    <div class="form-group">
      <label for="username">Username</label>
      <input type="username" name="username" id="username" class="form-control" placeholder="Please enter your username" v-model="username">
    </div>
    <div class="form-group">
      <label for="password">Password</label>
      <input type="password" name="password" id="password" minlength="6" class="form-control" placeholder="Please enter your password" v-model="password">
    </div>
    <div class="form-group">
      <input type="button" v-on:click="userLogin" value="Sign in" class="btn btn-primary">
    </div>
  </form>
</template>

<script>
export default {
  name: 'login',
  data() {
    return {
      errors: [],
      username: null,
      password: null
    }
  },
  methods: {
    userLogin: function(e) {
      this.errors = [];        
      if(!this.username) {
        this.errors.push('Username is required');
      }
      else if(!this.validEmail(this.username)) {
        this.errors.push('Enter a valid Username');
      } else {
        this.errors.splice(0,1);
      }
      if(!this.password) {
        this.errors.push('Passwor is required');
      } else {
        this.errors.splice(0,2);
      }
      if(this.errors.length === 0) {
        var formData = {
          username: this.username,
          password: this.password
        }
        KeratinAuthN.login({
          username: formData.username,
          password: formData.password
        }).then((response) => {
          fetch('https://data.karix.co/api/message').then((data) => {
            console.log(data);
          })
        });
      }
    },
    validEmail: function(email) {
      var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return emailRegex.test(username);
    }
  }
}
</script>


<style scopped>
.user-form {
  max-width: 500px;
  margin: 0 auto;
  padding: 16px;
  border: 1px solid rgba(0, 0, 0, .2);
  border-radius: 4px;
}
.form-errors {
  margin: 0;
  padding: 0 16px;
}
</style>