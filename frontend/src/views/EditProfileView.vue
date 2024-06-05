<template>
  <div>
    <Header />
    <div id="profile-box">
      <div class="profile-info-box">
        <div class="profile-section">
          <div class="profile-pic-container">
            <input type="file" id="profile-pic-upload" @change="uploadProfilePicture" hidden />
            <label for="profile-pic-upload" class="edit-button" aria-label="edit profile">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M9.65661 17L6.99975 17L6.99975 14M6.10235 14.8974L17.4107 3.58902C18.1918 2.80797 19.4581 2.80797 20.2392 3.58902C21.0202 4.37007 21.0202 5.6364 20.2392 6.41745L8.764 17.8926C8.22794 18.4287 7.95992 18.6967 7.6632 18.9271C7.39965 19.1318 7.11947 19.3142 6.8256 19.4723C6.49475 19.6503 6.14115 19.7868 5.43395 20.0599L3 20.9998L3.78312 18.6501C4.05039 17.8483 4.18403 17.4473 4.3699 17.0729C4.53497 16.7404 4.73054 16.424 4.95409 16.1276C5.20582 15.7939 5.50466 15.4951 6.10235 14.8974Z"/>
              </svg>
            </label>
          </div>
        </div>

        <div class="profile-details">
          <div class="input-container">
            <input type="text" class="change-username" v-model="profileData.username" placeholder="Press here to change your name">
          </div>
          <div class="input-container">
            <textarea class="bio-box" rows="5" v-model="profileData.bio" placeholder="Press here to change your bio"></textarea>
          </div>
        </div>
      </div>  

      <button class="save-button" @click="updateProfile">Save Changes</button>
      <button v-if="profileData.id === 1" class="edit-users-button" @click="navigateToUserManagement">Edit Users</button>
      <button class="delete-account-button" @click="deleteProfile">Delete Account</button>
    </div>
  </div>
</template>

<script>
import Header from '../components/Header.vue'
import axios from 'axios'

export default {
  name: "EditProfileView",
  components: {
    Header,
  },
  data() {
    return {
      profileData: {},
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
      axios.get('/api/getUserProfile', {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      }).then((response) => {
        this.profileData = response.data.userData;
      }).catch((error) => {
        console.log(error.message);
      });
    },
    updateProfile() {
      const authToken = localStorage.getItem('authToken');
      if (!authToken) {
        console.error('Authentication token not found.');
        return;
      }
      axios.post('/api/updateProfile', {
        bio: this.profileData.bio,
        username: this.profileData.username
      }, {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      }).then(response => {
        alert("Changes saved");
        this.$router.push('/profile');
      }).catch(error => {
        console.error(error);
      });
    },
    deleteProfile() {
      const authToken = localStorage.getItem('authToken');
      localStorage.removeItem('authToken');
      axios.delete('/deleteProfile').then(response => {
        console.log(response.data.message);
        alert('Account deleted successfully');
        this.$router.push('/login');
      }).catch(error => {
        console.error('Error deleting profile:', error);
        alert('Problem deleting profile');
      });
    },
    navigateToUserManagement() {
      this.$router.push('/UserManagementView');
    },
    editProfile() {
      this.$router.push('/EditProfileView');
    },
    uploadProfilePicture(event) {
      const file = event.target.files[0];
      if (!file) return;

      const formData = new FormData();
      formData.append('profilePicture', file);

      const authToken = localStorage.getItem('authToken');
      axios.post('/api/uploadProfilePicture', formData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'multipart/form-data'
        }
      }).then(response => {
        alert('Profile picture uploaded successfully');
        this.fetchProfile(authToken); // Refresh profile data
      }).catch(error => {
        console.error('Error uploading profile picture:', error);
        alert('Problem uploading profile picture');
      });
    }
  },
};
</script>

<style scoped>
#profile-box {
  background-color: #373737;
  width: 95%;
  max-width: 800px;
  height: auto;
  max-height: 80vh;
  padding: 30px 20px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: auto;
  box-sizing: border-box;
  overflow-y: scroll;
}

.bio-box {
  resize: none;
  resize: vertical;
}

.profile-info-box {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  border: 2px solid white;
  padding: 20px;
  box-sizing: border-box;
  border-radius: 20px;
}

.profile-section {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.profile-pic-container {
  position: relative;
  height: 20vw;
  width: 20vw;
  max-width: 150px;
  max-height: 150px;
  border: 2px solid white;
  border-radius: 50%;
  overflow: hidden;
}

.edit-button {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-red);
  border: none;
  border-radius: 50%;
  cursor: pointer;
  padding: 10px;
  transition: transform 0.3s ease-in-out;
}

.edit-button svg {
  width: 24px;
  height: 24px;
  fill: white;
  transition: transform 0.3s ease-in-out;
}

.edit-button:hover svg {
  transform: scale(1.2);
}

.profile-details {
  display: flex;
  flex-direction: column;
  border: 2px solid white;
  padding: 20px;
  box-sizing: border-box;
  border-radius: 20px;
  width: 100%;
}

.input-container {
  margin-bottom: 20px;
}

.profile-details input.change-username,
.profile-details textarea.bio-box {
  width: 100%;
  border-radius: 15px;
  border: 1px solid var(--color-text);
  font-size: 16px;
  color: var(--color-text);
  background-color: var(--color-light-dark-red);
  padding: 10px;
  box-sizing: border-box;
}

.save-button,
.edit-users-button,
.delete-account-button {
  height: 40px;
  width: 80%;
  max-width: 300px;
  border: 1px solid var(--color-text);
  border-radius: 25px;
  background-color: var(--color-red);
  color: var(--color-text);
  font: "Inter";
  font-size: 16px;
  font-weight: 550;
  margin-top: 20px;
  align-self: center;
  text-align: center;
}

.delete-account-button {
  color: red;
}

@media (min-width: 768px) {
  #profile-box {
    width: 90%;
    max-width: 900px;
  }

  .profile-details {
    width: 100%;
    max-width: 400px;
    padding: 30px;
  }

  .profile-info-box {
    flex-direction: row;
    align-items: center;
  }

  .profile-section {
    margin-right: 20px;
  }

  .profile-pic-container {
    height: 150px;
    width: 150px;
    margin-right: 20px;
  }

  .profile-details input.change-username,
  .profile-details textarea.bio-box {
    font-size: 20px;
  }

  .save-button,
  .edit-users-button,
  .delete-account-button {
    width: 150px;
    max-width: none;
    margin-left: 0;
    margin-right: 20px;
  }
}

@media (max-width: 767px) {
  #profile-box {
    padding-top: 8vh;
  }

  .bio-box {
    resize: none; /* Ensure bio field is non-resizable */
  }
}

.post-button {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #4CAF50;
  border: none;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.post-button:hover {
  background-color: #45a049;
}

.save-button,
.edit-users-button,
.delete-account-button {
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}
.save-button,
.edit-users-button
{
  background-color: #4CAF50;
}
.delete-account-button
{
background-color: #FF0000;
}
.delete-account-button:hover {
  background-color: #8b1d1d; 
}
.save-button:hover,
.edit-users-button:hover{
  background-color: #45a049;
}

</style>
