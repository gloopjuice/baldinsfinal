<template>
  <div class="LoginWindow">
    <h1 id="header">Forgot your password?</h1>  
    <div id="input-container">
        <input type="text" placeholder="E-MAIL" id="email">
      </div>
    <form>

      <p id="ForgotPassMessage">Enter your email address and we'll send you a link to reset your password</p>

      <RouterLink to="/ResetPass" id="send">
        <button id="send-but">Send</button>
      </RouterLink>
      <p id="or">Or</p>
      <RouterLink to="/register" id="register">Create new account</RouterLink>
    </form>
    
    <RouterLink to="/" id="go-back">Go Back</RouterLink>
  </div>
 <!--  <div class="horizontal-line"></div> -->
</template>

<style scoped>


/* .horizontal-line {
  position: fixed;
  top: 5vh;
  left: 0;
  height: 3px;
  background-color: white;
  width: 100%;
} */

body {
  place-items: center;
  overflow: auto;
}

#go-back {
  display: inline-block;
  margin-top: 10px;
  margin-bottom: 20px;
  font-family: "Inter", sans-serif;
  font-size: 14px;
  color: #00FF29;
  text-decoration: none;
  cursor: pointer;
  text-align: center;
  width: 100%;
}
#go-back:hover {
  text-decoration: underline;
}

.LoginWindow {
  width: 450px;
  height: 600px;
  background-color: var(--color-element);
  border-radius: 25px;
  box-shadow: 0px 0px 300px 50px var(--color-element);
  display: flex;
  flex-direction: column;
  align-items: center; /* Center align child elements horizontally */
  justify-content: center; /* Center align child elements vertically */
}

h1 {
  font-size: 5vh;
  text-align: center; /* Center text within the element */
  margin-bottom: 1vh; /* Add some bottom margin */
  font-weight: bold; /* Set font weight to bold */
}

p {
  width: 16vw;
  font-size: 16px;
  display: flex;
  position: relative;
  text-align: center;
}

#ForgotPassMessage {
  text-align: center; /* Center text within the element */
  width: 100%; /* Ensure it takes the full width of its parent */
  margin-bottom: 2vh; /* Add some bottom margin */
}

#send-but, #register {
  height: 45px;
  width: 150px;
  border: none;
  border-radius: 5px;
  background-color: #4CAF50; /* Green */
  color: white;
  font: "Inter";
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s;
  text-align: center; /* Center text horizontally */
  margin: 0 auto; /* Center the buttons horizontally */
  margin-top: 10px; /* Add some top margin */
  
}
#input-container {
  width: 100%; /* Set width to 100% */
  max-width: 400px; /* Set maximum width for better responsiveness */
  margin: 0 auto; /* Center the container horizontally */
}
input {
  display: block;
  height: 40px;
  width: 100%; /* Full width */
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

#email {
  margin-top: 45px;
}

#send-but, #register {
  height: 45px;
  width: 150px;
  border: none;
  border-radius: 5px;
  display: flex;
  position: relative;
  left: 150px;
  display: table-cell;
  vertical-align: middle;
  background-color: #4CAF50; /* Green */
  color: white;
  font: "Inter";
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s;
}

#send-but:hover, #register:hover {
  background-color: #45a049; /* Darker Green on hover */
}

#send-but:focus, #register:focus {
  outline: none; /* Remove outline on focus */
}

#send, #register{
  text-decoration: none;
}

#or {
  margin-top: 2vh;
  display: flex;
  justify-content: center; /* Center the element horizontally */
  width: 100%; /* Ensure it takes the full width of its parent */
  padding-bottom: 2vh;
}

.horizontal-line {
  position: fixed;
  top: 5vh; /* Adjust as needed */
  left: 0;
  height: 3px;
  background-color: white;
  width: 100%; /* Span from left to right */
}

#register {
  text-align: center; /* Center text horizontally */
}



</style>