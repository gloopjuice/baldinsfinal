<template>
  <div class="LoginWindow">
    <div class="horizontal-line"></div>
    <h1 id="header">RVTGTR</h1>
    <form @submit.prevent="login">
      <div id="input-container">
        <input type="email" placeholder="E-MAIL" id="email" v-model="email" required>
        <input type="password" placeholder="PASSWORD" id="password" v-model="password" required>
        <RouterLink to="/ForgotPass" id="ForgotPass">Forgot password</RouterLink>
      </div>
      <div id="button-container">
        <button type="submit" id="login-but">LOGIN</button>
        <RouterLink to="/register" id="register-but">REGISTER</RouterLink>
      </div>
    </form>
  </div>
  <div class="bottom-text">
    SIA OOGA BOOGA produkts - nezinu kādu random bs te raksta
    According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because bees don't care what humans think is impossible. Yellow, black. Yellow, black. Yellow, black. Yellow, black. Ooh, black and yellow! Let's shake it up a little. Barry! Breakfast is ready! Ooming!
  </div>
</template>


<script>
import axios from 'axios';


export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post("/api/login", {
          email: this.email,
          password: this.password
        });
        console.log(response.data);
        if (response.status === 200) {
          if (response.data.status) {
            localStorage.setItem('authToken', response.data.token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
            this.$router.push('/Home');
          } else {
            console.error('login failed', response.data.message);
            alert('error login failed');
          }
        } else {
          console.error('unexpected response status', response.status);
          alert('unexpected response status');
        }
      } catch (error) {
        console.error(error.response.data);
        alert('error during login');
      }
    },
  },
};
</script>


<style scoped>
.LoginWindow {
  text-align: center;
}

#header {
  font-family: "Inter", sans-serif;
  font-size: 80px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #00FF29; /* Original green color */
  -webkit-text-stroke: 4px #ffffff; /* Chrome, Safari */
  text-stroke: 4px #ffffff; /* Standard */
}

#input-container {
  margin-bottom: 20px;
}

input {
  display: block;
  height: 40px;
  width: 800px; /* Increased width */
  border-radius: 15px;
  border: 0;
  font-size: 18px;
  text-indent: 20px;
  font-family: "Inter", sans-serif;
  color: #000000;
  background-color: #ffffff;
  margin: 10px auto;
  padding: 0 15px; /* Added padding for better touch experience */
}

input::placeholder {
  color: #000000;
  font-size: 16px;
}

#ForgotPass {
  padding-top: 5px;
  font-family: "Inter", sans-serif;
  font-size: 13px;
  color: #FFFFFF;
  display: block;
  margin-top: 10px;
}

#button-container {
  display: flex;
  justify-content: center;
  gap: 20px;
}

button, #register-but {
  height: 45px;
  width: 150px;
  border: none;
  border-radius: 25px;
  background-color: #00570E;
  color: #ffffff;
  font-family: "Inter", sans-serif;
  font-size: 18px;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.horizontal-line {
  position: fixed;
  top: 5vh;
  left: 0;
  height: 3px;
  background-color: white;
  width: 100%;
}

.bottom-text {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 80%;
  font-family: "Inter", sans-serif;
  font-size: 14px;
  color: #FFFFFF;
  text-align: center;
}

body {
  overflow-y: hidden;
}

@media (max-width: 768px) {
 .LoginWindow {
    padding-top: 7vh; /* Increase padding from the top for mobile */
  }

  #input-container {
    width: 90%; /* Make inputs responsive */
    margin-left: auto;
    margin-right: auto;
  }

  input {
    width: 100%; /* Full width inputs for mobile */
    box-sizing: border-box; /* Include padding and border in element's total width and height */
  }



 .bottom-text {
    font-size: 12px; /* Optional adjustment for smaller screens */
  }
}
</style>