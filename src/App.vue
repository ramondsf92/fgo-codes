<template>
  <div id="app">
    <div class="container">
      <div class="jumbotron jumbotron-black shadow">
        <h1 class="mt-1">{{ title }}</h1>
        <p class="lead">
          An app where you can store your Fate/Grand Order bind codes with no
          fear.
        </p>
        <div>
          <button class="btn btn-success mt-3" @click="addNewAccount">
            Add Account
          </button>
          <div class="alert alert-danger mt-3" role="alert">
            Caution: the codes must be secret and the sharing them is at your
            own risk.
          </div>
        </div>
      </div>
      <div class="container border">
        <table class="mt-2 table servant-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Code</th>
              <th>Server</th>
              <th>SSR Amount</th>
              <th>Notable Servants</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="account in accounts" :key="account.id">
              <td>{{ account.id }}</td>
              <td>{{ account.code }}</td>
              <td>{{ account.server }}</td>
              <td>{{ account.ssr }}</td>
              <td>
                <ul>
                  <li v-for="servant in account.notable" :key="servant.name">
                    {{ servant.name }}-{{ servant.level }}-NP{{ servant.npLvl }}
                  </li>
                </ul>
              </td>
              <td>
                <div
                  id="action-cell"
                  class="d-flex justify-content-center mt-3"
                >
                  <i
                    data-toggle="tooltip"
                    title="Edit"
                    @click="editAccount(account)"
                    class="fas fa-edit mr-1"
                  ></i>
                  <!-- 
                  V-if inside trash icon to make it shows only if there's more than 1 element in accounts.
                  Otherwise, I don't want to remove it. In other words, I don't want to let the array empty.
                -->
                  <i
                    v-if="accounts.length > 1"
                    data-toggle="tooltip"
                    title="Remove"
                    @click="deleteAccount(account.id)"
                    class="fas fa-trash mr-1"
                  ></i>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <transition name="fade" appear>
      <div
        class="modal-overlay"
        v-if="showForm"
        @click="showForm = false"
      ></div>
    </transition>
    <transition name="slide" appear>
      <div class="form-modal" v-if="showForm && !isEditing">
        <Form />
      </div>
      <div class="form-modal" v-if="showForm && isEditing">
        <Form
          :propId="editedAccount.id"
          :propCode="editedAccount.code"
          :propServer="editedAccount.server"
          :propSsr="editedAccount.ssr"
          :propNotable="editedAccount.notable"
        />
      </div>
    </transition>
  </div>
</template>

<script>
import axios from "axios";
import Form from "./components/Form";

export default {
  name: "App",
  components: { Form },
  data() {
    return {
      title: "Fate Grand/Order Code Storage CRUD APP",
      accounts: null,
      showForm: false,
      isEditing: false,
      editedAccount: null,
    };
  },
  methods: {
    getAccounts() {
      axios
        .get("http://localhost:3000/data")
        .then((json) => (this.accounts = json.data));
    },
    deleteAccount(id) {
      axios
        .delete(`http://localhost:3000/data/${id}`)
        .then((response) => console.log(response));
    },
    editAccount(acc) {
      this.editedAccount = acc;
      this.isEditing = true;
      this.showForm = true;
    },
    addNewAccount() {
      this.isEditing = false;
      this.showForm = true;
    },
  },
  created() {
    this.getAccounts();
  },
};
</script>

<style>
@font-face {
  font-family: "roboto-mono";
  src: url("./fonts/RobotoMono-Regular.ttf");
}

* {
  font-family: "roboto-mono";
  color: antiquewhite;
}

.jumbotron-black {
  background-image: url("https://cutewallpaper.org/21/ultimate-background/new-jumbotron-background-Gold-Bond-Ultimate.png");
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
}

body {
  /* background-image: linear-gradient(to right, #090979, #00d4ff); */
  background-image: url("https://i.redd.it/aaib8cgjd9u21.png");
  background-repeat: no-repeat;
  background-size: 100%;
}

.servant-table {
  background-color: #002a5b;
}

.spoiler {
  color: black;
  background-color: black;
}

.spoiler:hover {
  color: white;
}

#action-cell {
  height: 100%;
}

ul {
  list-style-type: square;
}

/* Style for modal */

.modal-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 998;
  background-color: rgba(0, 0, 0, 0.5);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.form-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;

  width: 100%;
  max-width: 750px;
  max-height: 500px;
  overflow: auto;
  background-color: #fff;
  border-radius: 20px;

  padding: 20px;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.5s;
}

.slide-enter,
.slide-leave-to {
  transform: translateX(-100%) translateY(-100vh);
}

i {
  cursor: pointer;
}
</style>
