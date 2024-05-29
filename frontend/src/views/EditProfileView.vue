<template>
  <div>
    <Header />
    <div id="profile-box">
      <div class="profile-info-box">
        <div class="profile-section">
          <div class="profile-pic-container">
            <!-- Profile picture content here -->
          </div>
        </div>
        <div class="profile-details">
          <input type="text" class="change-username" v-model="profileData.username" placeholder="Change Username">
          <textarea class="bio-box" rows="5" cols="50" v-model="profileData.bio" placeholder="Bio"></textarea>
        </div>
      </div>
      <button class="save-button" @click="updateProfile">Save Changes</button>
      <!-- Conditionally render the button based on user ID -->
      <button v-if="profileData.id === 1" class="edit-users-button" @click="navigateToUserManagement">Edit Users adminam</button>
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
    fetchProfile(authToken){
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
    updateProfile() {
      const authToken = localStorage.getItem('authToken');
      if (!authToken) {
        console.error('Authentication token not found.');
        return;
      }
      axios.post('/updateProfile', {
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
    deleteProfile(){
      const authToken = localStorage.getItem('authToken');
      localStorage.removeItem('authToken');
      axios.delete('http://127.0.0.1:8000/api/deleteProfile').then(response => {
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
    }
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
  flex-direction: column; /* Align children in a column */
  justify-content: center; /* Center children vertically */
}

.profile-info-box {
  width: 100%;
  display: flex;
  align-items: center; /* Center children horizontally */
  margin-bottom: 20px; /* Adjust spacing between sections */
}
.profile-pic-container {
    height: 150px;
    width: 150px;
    border: 2px solid white;
    border-radius: 50%;
    background-color: none;
    margin-right: 20px;
  }

.profile-details {
  display: flex;
  flex-direction: column; /* Align children in a column */
  margin-left: 20px; /* Adjust spacing between picture and details */
}

.change-username
{
  height: 5vh;
  width: 15vh;
  border-radius: 25px;
  border: 0;
  font-size: 20px;
  color: var(--color-text);
  background-color: var(--color-light-dark-red);
  margin-bottom: 20px; /* Adjust spacing between inputs */
  text-indent: 20px;
}
.bio-box {
  height: 15vh;
  width: 50vh;
  border-radius: 25px;
  border: 0;
  font-size: 20px;
  color: var(--color-text);
  background-color: var(--color-light-dark-red);
  margin-bottom: 20px; /* Adjust spacing between inputs */
  text-indent: 20px;
}

.bio-box {
  padding-left: 10px;
  font-size: 18px;
  border: 3px solid white;
}

.save-button,
.edit-users-button{
  height: 40px;
  width: 150px;
  border: none;
  border-radius: 25px;
  background-color: var(--color-red);
  color: var(--color-text);
  font: "Inter";
  
  font-size: 16px;
  font-weight: 550;
  margin-top: 20px;
  align-self: flex-start; /* Align buttons to the left */
}

.delete-account-button
{
  color: red;
  height: 40px;
  width: 150px;
  border: none;
  border-radius: 25px;
  background-color: var(--color-red);

  font: "Inter";
  
  font-size: 16px;
  font-weight: 550;
  margin-top: 20px;
  align-self: flex-start; /* Align buttons to the left */
}
</style>