<template>
  <div id="Header">
    <button id="menu-but" @click="toggleMenu()">
      <svg id="menu-img" width="50px" height="50px" viewBox="0 0 24 24" stroke="white" fill="white" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.83827 18.5097L11.1284 5.54947C11.5107 4.86982 12.4893 4.86982 12.8716 5.54947L20.1617 18.5097C20.5367 19.1763 20.055 20 19.2902 20H4.70985C3.94502 20 3.46331 19.1763 3.83827 18.5097Z" 
              stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </button>
    <RouterLink to="/home">
      <h1 id="rvtgtr-text">RVTGTR</h1>
    </RouterLink>
    <RouterLink to="/profile">
      <button id="profile-but" v-if="profileData">{{ profileData.name }}</button>
    </RouterLink>
  </div>
  <div id="sidebar" ref="sidebar" :class="{ 'show-menu': showMenu }">
    <div class="home">
      <RouterLink to="/home">
        <button class="button">Home</button>
      </RouterLink>
    </div>
    <div class="Forums">
      <RouterLink to="/forums_hub">
        <button class="button">Forums</button>
      </RouterLink>
    </div>
    <div class="DownloadPage">
      <RouterLink to="/DownloadPage">
        <button class="button">Download</button>
      </RouterLink>
    </div>
    <div class="log-out">
      <button class="button" @click="logout">Log Out</button>
    </div>
  </div>

  <div class="horizontal-line"></div>
</template>

<script>
import { RouterLink } from 'vue-router';
import axios from 'axios';

export default {
  name: "Header",
  data() {
    return {
      profileData: {},
      showMenu: false
    };
  },
  mounted() {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      this.fetchProfile(authToken);
    } else {
      this.$router.push('/login');
    }
  },
  methods: {
    toggleMenu() {
      this.showMenu = !this.showMenu;
      if (this.showMenu) {
        this.$refs.sidebar.classList.add('show-menu');
        this.$refs.sidebar.classList.remove('hide-menu');
      } else {
        this.$refs.sidebar.classList.remove('show-menu');
        this.$refs.sidebar.classList.add('hide-menu');
      }

      const menuImg = document.getElementById('menu-img');
      if (this.showMenu) {
        menuImg.classList.add('rotate');
      } else {
        menuImg.classList.remove('rotate');
        // Force reflow to restart animation
        void menuImg.offsetWidth;
        menuImg.classList.add('rotate-back');
      }
    },
    fetchProfile(authToken) {
      axios.get('/getUserProfile', {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      }).then((response) => {
        this.profileData = response.data.userData;
        console.log("Profile Data:", this.profileData);
      }).catch((error) => {
        console.error(error.message);
      });
    },
    logout() {
      localStorage.removeItem('authToken');
      this.$router.push('/login');
    }
  },
  components: { RouterLink },
};
</script>

<style>
/* Styles remain unchanged */
.horizontal-line {
  position: fixed;
  top: 5vh;
  left: 0;
  height: 3px;
  background-color: white;
  width: 100%;
}

#Header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 5vh;
  background-color: #373737; /* Changed to desired color */
  box-shadow: 0px 0px 100px 20px rgba(0, 0, 0, 0.5);
  text-align: center;
}

#main-content {
  margin-top: 5vh; /* Adjust based on the height of your header */
  background-color: white; /* Or any contrasting color */
  min-height: calc(100vh - 5vh); /* Ensures content takes full height minus header */
  padding: 20px; /* Optional: Adds some padding around the content */
}

#sidebar {
  height: calc(100vh - 5vh); /* Adjusted height to fit within viewport */
  width: 300px;
  background-color: var(--color-element);
  z-index: 2;
  top: 5vh;
  left: 0;
  border-bottom-right-radius: 25px;
  position: absolute;
  transform: translateX(-100%);
}

#rvtgtr-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 150px;
  font-family: "Inter", sans-serif;
  color: #00FF29;
  font-weight: 600;
  font-size: 3.5vh;
}

#menu-but {
  height: 5vh;
  width: 50px;
  padding: 0;
  background: transparent;
  border: 0;
}

#menu-img {
  height: 5vh;
  width: 50px;
  top: 0;
  left: 0;
  display: flex;
  position: absolute;
  transition: transform 0.5s;
  transform: rotate(90deg); /* Initial rotation */
}

#profile-but {
  position: absolute;
  right: 10px;
  top: 0;
  height: 5vh;
  background: transparent;
  border: none;
  color: white;
  max-width: 30ch;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-family: "Inter", sans-serif;  
}

.show-menu {
  animation: slideIn 0.5s forwards;
}

.hide-menu {
  animation: slideOut 0.5s forwards; /* Ensure this matches the keyframe animation */
}

@keyframes slideIn {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
}

@keyframes slideOut {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
}

.button {
  height: 100px;
  width: 100%;
  position: relative;
  color: white;
  background-color: var(--color-element);
  padding: 10px;
  text-align: left;
  border: none;
  font: 'Inter';
  font-size: 18px;
  text-align: center;
}

.rotate {
  transform: rotate(180deg); /* Rotate 90 degrees more from initial 90 degrees */
}

.rotate-back {
  transform: rotate(90deg); /* Rotate back to initial 90 degrees */
}
</style>
