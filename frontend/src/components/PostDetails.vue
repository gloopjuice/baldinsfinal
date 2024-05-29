<template>
  <div>
    <Header />

    <div id="post-details-content">
      <div v-if="post">
         <!-- Return button -->
         <button class="return-link" @click="$router.push('/forums_hub')">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M17 17L7 7M7 7V16M7 7H16"/>
          </svg>
        </button>

        <!-- Edit button -->
        <button v-if="isAuthorOrAdmin" class="return-link" @click="editPost">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M9.65661 17L6.99975 17L6.99975 14M6.10235 14.8974L17.4107 3.58902C18.1918 2.80797 19.4581 2.80797 20.2392 3.58902C21.0202 4.37007 21.0202 5.6364 20.2392 6.41745L8.764 17.8926C8.22794 18.4287 7.95992 18.6967 7.6632 18.9271C7.39965 19.1318 7.11947 19.3142 6.8256 19.4723C6.49475 19.6503 6.14115 19.7868 5.43395 20.0599L3 20.9998L3.78312 18.6501C4.05039 17.8483 4.18403 17.4473 4.3699 17.0729C4.53497 16.7404 4.73054 16.424 4.95409 16.1276C5.20582 15.7939 5.50466 15.4951 6.10235 14.8974Z"/>
          </svg>
        </button>

        <!-- Delete button -->
        <button v-if="isAuthorOrAdmin" class="return-link" @click="deletePost">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 6L17.1991 18.0129C17.129 19.065 17.0939 19.5911 16.8667 19.99C16.6666 20.3412 16.3648 20.6235 16.0011 20.7998C15.588 21 15.0607 21 14.0062 21H9.99377C8.93927 21 8.41202 21 7.99889 20.7998C7.63517 20.6235 7.33339 20.3412 7.13332 19.99C6.90607 19.5911 6.871 19.065 6.80086 18.0129L6 6M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6"/>
          </svg>
        </button>

        <h1>{{ post.nosaukums }}</h1>

       

        <p>{{ post.saturs }}</p>
        <p>Autors: {{ post.authorProfile.name }}</p>
        <p>Date: {{ post.created_at.slice(0, 10) }}</p>

        <!-- Add Comment button -->
        <button class="return-link" @click="showModal = true">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M6 12H18M12 6V18" />
          </svg>
        </button>

        <!-- Display comments -->
        <div v-if="comments.length">
          <h3>Comments:</h3>
          <div v-for="(comment, index) in comments" :key="index" class="comment-wrapper">
            <div>
              <p><strong>Author:</strong> {{ comment.author.name }}</p>
              <p><strong>Content:</strong> {{ comment.content }}</p>
              <p><strong>Date:</strong> {{ comment.created_at.slice(0, 10) }}</p>
            </div>
          </div>
        </div>
        <div v-else>
          <p>No comments yet.</p>
        </div>
      </div>

      <!-- Add Comment Modal -->
      <div v-if="showModal" class="modal">
        <div class="modal-content">
          <span class="close" @click="showModal = false">&times;</span>
          <form @submit.prevent="addComment">
            <label for="commentContent">Comment:</label>
            <textarea id="commentContent" v-model="commentContent" required></textarea>
            <button type="submit">Submit Comment</button>
          </form>
        </div>
      </div>

      <!-- Edit Post Modal -->
      <div v-if="showEditModal" class="modal">
        <div class="modal-content">
          <span class="close" @click="showEditModal = false">&times;</span>
          <form @submit.prevent="saveEditedPost">
            <label for="editedTitle">Title:</label>
            <input type="text" id="editedTitle" v-model="editedTitle" required>

            <label for="editedContent">Content:</label>
            <textarea id="editedContent" v-model="editedContent" required></textarea>

            <button type="submit">Save Changes</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Header from '../components/Header.vue';

export default {
  data() {
    return {
      post: null,
      showModal: false,
      commentContent: '',
      comments: [],
      showEditModal: false,
      editedTitle: '',
      editedContent: '',
      currentUser: null, // To hold the current user information
    };
  },
  computed: {
    isAuthorOrAdmin() {
      return this.currentUser && (this.currentUser.id === this.post.authorProfile.id || this.currentUser.role_id === 1);
    },
  },
  methods: {
    async getPost(id) {
      const token = localStorage.getItem('authToken');
      try {
        const response = await axios.get(`/getForumPost?id=${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const postData = response.data.data;
        const authorProfile = await this.fetchProfile(postData.autors);
        postData.authorProfile = authorProfile;
        this.post = postData;

        // Fetch comments after getting the post
        await this.fetchComments(id);

        // Fetch the current user
        this.currentUser = await this.fetchCurrentUser();
      } catch (error) {
        console.error("There was an error fetching the post:", error);
      }
    },
    async addComment() {
      const token = localStorage.getItem('authToken');
      const postId = this.$route.params.postId;
      try {
        const response = await axios.post(`/createComment`, {
          post_id: postId,
          author_id: this.currentUser.id,
          content: this.commentContent
        }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (response.data && response.data.status) {
          alert('Comment added successfully');
          this.commentContent = '';
          this.showModal = false;
          await this.fetchComments(postId);
        } else {
          alert('Error adding comment');
        }
      } catch (error) {
        console.error('Error adding comment:', error);
        alert('Error adding comment');
      }
    },
    async fetchProfile(authorId) {
      const token = localStorage.getItem('authToken');
      try {
        const response = await axios.get(`/getUserProfile?id=${authorId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        return response.data.userData;
      } catch (error) {
        console.error('Error fetching profile:', error);
        return null;
      }
    },
    async fetchComments(postId) {
      const token = localStorage.getItem('authToken');
      try {
        const response = await axios.get('/getComments', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          params: { post_id: postId }
        });
        if (response.data && response.data.comments) {
          this.comments = response.data.comments;
        } else {
          console.error('Comments data is missing or malformed', response.data);
          this.comments = [];
        }
      } catch (error) {
        console.error('Error fetching comments:', error);
        this.comments = [];
      }
    },
    async fetchCurrentUser() {
      const token = localStorage.getItem('authToken');
      try {
        const response = await axios.get('/profile', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        return response.data.data;
      } catch (error) {
        console.error('Error fetching current user:', error);
        return null;
      }
    },
    async deletePost() {
      if (!confirm('Are you sure you want to delete this post?')) return;

      const token = localStorage.getItem('authToken');
      const postId = this.post.id;
      try {
        const response = await axios.delete(`/deletePost/${postId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (response.data && response.data.status) {
          alert('Post deleted successfully');
          this.$router.push('/forums_hub');
        } else {
          alert('Error deleting post');
        }
      } catch (error) {
        console.error('Error deleting post:', error);
        alert('Error deleting post');
      }
    },
    editPost() {
      this.editedTitle = this.post.nosaukums;
      this.editedContent = this.post.saturs;
      this.showEditModal = true;
    },
    async saveEditedPost() {
      const token = localStorage.getItem('authToken');
      const postId = this.post.id;
      try {
        const response = await axios.post(`/editForumPost/${postId}`, {
          nosaukums: this.editedTitle,
          saturs: this.editedContent
        }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (response.data && response.data.status) {
          alert('Post edited successfully');
          this.showEditModal = false;
          await this.getPost(postId); // Refresh the post data
        } else {
          alert('Error editing post');
        }
      } catch (error) {
        console.error('Error editing post:', error);
        alert('Error editing post');
      }
    },
  },
  mounted() {
    const postId = this.$route.params.postId;
    this.getPost(postId);
  },
  components: {
    Header
  }
};
</script>

<style scoped>
#post-details-content {
  margin-top: 10vh; /* Adjust this value if necessary */
  padding: 20px;
  margin-bottom: 10vh; /* Add margin to the bottom */
}
.comment-wrapper {
  margin-bottom: 20px; /* Adjust the value as needed */
}

.return-link-container {
  text-align: left;
  margin-bottom: 20px;
}

.return-link {
  display: inline-block;
  padding: 10px 15px;
  color: #FFFFFF;
  background-color: #007BFF; /* Add background color */
  border: none; /* Remove default button border */
  border-radius: 5px; /* Add border radius for a smoother look */
  text-decoration: none;
  transition: background-color 0.3s;
}

.return-link:hover {
  background-color: #0056b3; /* Darker background color on hover */
}

.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
  padding: 20px;
  border-radius: 5px;
  width: 80%;
  max-width: 500px;
  background-color: #fff; /* Add background color */
}

.close {
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}
</style>
