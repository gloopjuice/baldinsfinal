<template>
  <div>
    <h2 style="text-align: center;">All Users</h2>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Username</th>
          <th>Email</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.id }}</td>
          <td>{{ user.username }}</td>
          <td>{{ user.email }}</td>
          <td>
            <button @click="editUser(user)" class="edit-button">Edit</button>
            <button @click="deleteUser(user.id)" class="delete-button">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
    <router-link to="/EditProfileView" id="go-back">Go back</router-link>

    <div v-if="isEditing" class="modal">
      <div class="modal-content">
        <div class="modal-header">
          <h2>Edit User</h2>
          <span class="close" @click="closeEditModal">&times;</span>
        </div>
        <form @submit.prevent="updateUser">
          <div>
            <label for="username" style="color: #373737;">Username:</label>
            <input type="text" v-model="editForm.username" required />
          </div>
          <div>
            <label for="email" style="color: #373737;">Email:</label>
            <input type="email" v-model="editForm.email" required />
          </div>
          <div>
            <label for="name" style="color: #373737;">Name:</label>
            <input type="text" v-model="editForm.name" required />
          </div>
          <div>
            <label for="bio" style="color: #373737;">Bio:</label>
            <input type="text" v-model="editForm.bio" />
          </div>
          <div>
            <label for="role_id" style="color: #373737;">Role ID:</label>
            <input type="number" v-model="editForm.role_id" required />
          </div>
          <div>
            <label for="password" style="color: #373737;">Password:</label>
            <input type="password" v-model="editForm.password" />
          </div>
          <div class="modal-buttons" style="color: #373737;">
            <button type="submit" class="post-button">Update</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      users: [],
      isEditing: false,
      editForm: {
        id: null,
        username: '',
        email: '',
        name: '',
        bio: '',
        role_id: '',
        password: ''
      }
    };
  },
  methods: {
    fetchAllUsers() {
      axios.get('/api/getAllUsers', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
      })
      .then(response => {
        this.users = response.data.users;
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
    },
    deleteUser(userId) {
      axios.delete(`/api/deleteUserProfile/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
      })
      .then(response => {
        alert('User profile deleted successfully');
        this.fetchAllUsers(); 
      })
      .catch(error => {
        console.error('Error deleting user profile:', error);
        alert('Problem deleting user profile');
      });
    },
    editUser(user) {
      this.editForm = { ...user, password: '' }; 
      this.isEditing = true;
    },
    updateUser() {
     
      const hasChanges = Object.keys(this.editForm).some(key => key !== 'password' && this.editForm[key] !== this.users.find(user => user.id === this.editForm.id)[key]);


      if (!hasChanges && !this.editForm.password) {
        this.closeEditModal();
        return;
      }

      // Create a copy of the editForm without the password if it's empty
      const formData = { ...this.editForm };
      if (!formData.password) {
        delete formData.password;
      }

      axios.put(`/updateUserProfile/${this.editForm.id}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
      })
      .then(response => {
        alert('User profile updated successfully');
        this.fetchAllUsers(); 
        this.closeEditModal();
      })
      .catch(error => {
        console.error('Error updating user profile:', error);
        alert('Problem updating user profile');
      });
    },
    closeEditModal() {
      this.isEditing = false;
    }
  },
  mounted() {
    this.fetchAllUsers();
  }
};
</script>

<style scoped>

</style>

<style scoped>
.users-container {
  padding: 0;
}

.user-list {
  padding: 0;
  list-style-type: none;
}

.user-box {
  border: 1px solid #ccc;
  padding: 2vh;
  margin-bottom: 2vh;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.user-info {
  flex: 1;
}

.user-info h3 {
  margin: 0;
  font-size: 1.8vh;
}

.user-info p {
  margin: 0;
  font-size: 1.6vh;
}

.user-actions {
  margin-left: 2vh;
}

.edit-button,
.delete-button {
  padding: 1.5vh 2.5vh;
  font-size: 2vh;
  background-color: #4CAF50;
  border: none;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.edit-button:hover,
.delete-button:hover {
  background-color: #45a049;
}

.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 9999;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: auto;
  padding: 2vh;
  border: 1px solid #888;
  width: 80%;
  max-width: 90%;
  max-height: 70vh;
  overflow-y: auto;
  position: relative;
}

.modal-header {
  display: flex;
  justify-content: space-between; 
  align-items: center; 
}


.modal-content label {
  display: block;
  margin-bottom: 3px; 
  font-size: 14px; 
}

.modal-content input[type="text"],
.modal-content input[type="email"],
.modal-content input[type="password"],
.modal-content input[type="number"],
.modal-content textarea {
  width: calc(100% - 10px); 
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  box-sizing: border-box;
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

.close {
  color: #aaa;
  font-size: 24px;
  font-weight: bold;
  cursor: pointer;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
}


.modal-buttons {
  text-align: right;
  margin-top: 20px;
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
</style>
