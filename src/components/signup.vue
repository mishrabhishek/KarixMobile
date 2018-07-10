<template>
  <form class="user-form" id="user-signup" novalidate="true">
    <div class="alert alert-success" id="signup-success" style="display: none;">
      <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
      <strong>Thanks! You have successfully signed up</strong>
    </div>
    <div class="alert alert-danger" id="signup-fail" style="display: none;">
      <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
      <strong>Email already exists</strong>
    </div>
    <p v-if="errors.length">
      <strong>Please correct the following error(s):</strong>
      <ul class="form-errors">
        <li v-for="error in errors" class="text-danger">{{error}}</li>
      </ul>
    </p>
    <div class="form-group">
      <label for="name">Name</label>
      <input type="text" name="name" id="name" maxlength="20" class="form-control" placeholder="Please enter your name" v-model="name">
    </div>
    <div class="form-group">
      <label for="email">Email</label>
      <input type="email" name="email" id="email" class="form-control" placeholder="Please enter your email" v-model="email">
    </div>
    <div class="form-group">
      <label for="password">Password</label>
      <input type="password" name="password" id="password" minlength="6" class="form-control" placeholder="Please enter your password" v-model="password">
    </div>
    <div class="form-group">
      <input type="button" v-on:click="submitForm" value="Sign up" class="btn btn-primary">
    </div>
  </form>
</template>

<script>
export default {
  name: 'signup',
  data() {
    return {
      errors: [],
      name: null,
      email: null,
      password: null
    }
  },
  methods: {
    submitForm: function(e) {
      this.errors = [];
      
      if(!this.name) {
        this.errors.push('Name is required');
      } else {
        this.errors.splice(0,1);
      }
        
      if(!this.email) {
        this.errors.push('Email is required');
      }
      else if(!this.validEmail(this.email)) {
        this.errors.push('Enter a valid email address');
      } else {
        this.errors.splice(0,2);
      }
      if(!this.password) {
        this.errors.push('Passwor is required');
      } else {
        this.errors.splice(0,3);
      }
      if(this.errors.length === 0) {
        var formData = {
          name: this.name,
          email: this.email,
          password: this.password
        }
        
        KeratinAuthN.setHost('https://auth.karix.co');
        KeratinAuthN.signup({
          username : formData.email,
          password: formData.password,
          USERNAME_IS_EMAIL: true
        }).then((response) => {
          document.getElementById('signup-success').style.display = 'block';
          document.getElementById('signup-fail').style.display = 'none';
          this.$http.post('https://data.karix.co/user/register/', formData.name,{
            emulateJSON: true
          });
        }, function() {
          document.getElementById('signup-success').style.display = 'none';
          document.getElementById('signup-fail').style.display = 'block';
        });
      }
    },
    validEmail: function(email) {
      var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return emailRegex.test(email);
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