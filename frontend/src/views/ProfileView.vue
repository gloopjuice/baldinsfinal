<template>
    <div>
      <Header />

      <div id="profile-box">
        <div class="profile-info-box">
          <div class="profile-pic-container">
            
          </div>
          <button class="edit-button" aria-label="edit profile" @click="editProfile">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M9.65661 17L6.99975 17L6.99975 14M6.10235 14.8974L17.4107 3.58902C18.1918 2.80797 19.4581 2.80797 20.2392 3.58902C21.0202 4.37007 21.0202 5.6364 20.2392 6.41745L8.764 17.8926C8.22794 18.4287 7.95992 18.6967 7.6632 18.9271C7.39965 19.1318 7.11947 19.3142 6.8256 19.4723C6.49475 19.6503 6.14115 19.7868 5.43395 20.0599L3 20.9998L3.78312 18.6501C4.05039 17.8483 4.18403 17.4473 4.3699 17.0729C4.53497 16.7404 4.73054 16.424 4.95409 16.1276C5.20582 15.7939 5.50466 15.4951 6.10235 14.8974Z"/>
            </svg>
          </button>
        </div>
        <div class="profile-details">
          <p class="username" v-if="profileData">{{ profileData.username }}</p>
          <p class="savedBio" v-if="profileData">{{ profileData.bio }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import Header from '../components/Header.vue'
  import axios from 'axios'
  
  export default {
    name: "ProfileView",
    data() {
      return {
        profileData: {}
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
      fetchProfile(authToken) {
        axios.get('/getUserProfile', {
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        }).then((response) => {
          this.profileData = response.data.userData;
        }).catch((error) => {
          console.log(error.message);
        });
      },
      editProfile() {
        this.$router.push('/EditProfileView');
      }
    },
    components: {
      Header,
    },
  };
  </script>
  
  <style scoped>
  #profile-box {
    background-color: #373737;
    width: 45vw;
    height: 80vh;
    border-radius: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  
  .profile-info-box {
    width: 100%;
    height: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
  }
  
  .profile-pic-container {
    height: 150px;
    width: 150px;
    border: 2px solid white;
    border-radius: 50%;
    background-color: none;
    margin-right: 20px;
  }
  
  .edit-button {
    background-color: var(--color-red);
    border: none;
    border-radius: 50%;
    cursor: pointer;
    padding: 10px;
  }
  
  .edit-button svg {
    width: 24px;
    height: 24px;
    fill: white;
  }
  
  .profile-details {
    text-align: center;
    color: white;
    margin: 20px;
  }
  
  .username {
    font-size: 24px;
    margin-bottom: 10px;
  }
  
  .savedBio {
    font-size: 18px;
    margin-bottom: 10px;
  }
  </style>
  