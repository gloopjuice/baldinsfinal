<template>
  <div>
    <h2>All Users</h2>
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
            <button @click="editUser(user)">Edit</button>
            <button @click="deleteUser(user.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
    <router-link to="/EditProfileView">Go back</router-link>

    <!-- Edit User Modal -->
    <div v-if="isEditing" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeEditModal">&times;</span>
        <h2>Edit User</h2>
        <form @submit.prevent="updateUser">
          <label for="username">Username:</label>
          <input type="text" v-model="editForm.username" required />
          <label for="email">Email:</label>
          <input type="email" v-model="editForm.email" required />
          <label for="name">Name:</label>
          <input type="text" v-model="editForm.name" required />
          <label for="bio">Bio:</label>
          <input type="text" v-model="editForm.bio" />
          <label for="role_id">Role ID:</label>
          <input type="number" v-model="editForm.role_id" required />
          <label for="password">Password:</label>
          <input type="password" v-model="editForm.password" />
          <button type="submit">Update</button>
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
        this.fetchAllUsers(); // Refresh the user list after deletion
      })
      .catch(error => {
        console.error('Error deleting user profile:', error);
        alert('Problem deleting user profile');
      });
    },
    editUser(user) {
      this.editForm = { ...user, password: '' }; // Copy user data into edit form
      this.isEditing = true;
    },
    updateUser() {
      axios.put(`/api/updateUserProfile/${this.editForm.id}`, this.editForm, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
      })
      .then(response => {
        alert('User profile updated successfully');
        this.fetchAllUsers(); // Refresh the user list after update
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
/* Add your CSS styles here */
.modal {
  display: block; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto; /* 15% from the top and centered */
  padding: 20px;
  border: 1px solid #888;
  width: 80%; /* Could be more or less, depending on screen size */
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>
