<template>
  <div id="app">
    <div class="container border">
      <h1 class="mt-3 text-center">Fate/Grand Order Code Storage APP</h1>
      <div
        class="alert alert-danger mt-3"
        role="alert"
      >Caution: the codes must be secret and the sharing is at your own risk.</div>
      <div>
        <button class="btn btn-success">Add Account</button>
      </div>
      <table class="mt-2 table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Código</th>
            <th>Servidor</th>
            <th>Qtd. SSR</th>
            <th>Servos Notáveis</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="account in accounts" :key="account.id">
            <td>{{account.id}}</td>
            <td>
              <span class="spoiler">{{account.code}}</span>
            </td>
            <td>{{account.server}}</td>
            <td>{{account.ssr}}</td>
            <td>
              <ul>
                <li
                  v-for="servant in account.notable"
                  :key="servant.name"
                >{{servant.name}}-{{servant.level}}-NP{{servant.npLvl}}</li>
              </ul>
            </td>
            <td>
              <div id="action-cell" class="d-flex justify-content-center mt-3">
                <i data-toggle="tooltip" title="Editar" class="fas fa-edit mr-1"></i>
                <i data-toggle="tooltip" title="Remover" @click="deleteAccount(account.id)" class="fas fa-trash mr-1"></i>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "App",
  data() {
    return {
      title: "Códigos FGO",
      accounts: null,
      deletedId: null 
    };
  },
  methods: {
    getAccounts() {
      axios
        .get("http://localhost:3000/data")
        .then(json => (this.accounts = json.data));
    },
    postAccount(acc) {
      axios
        .post("http://localhost:3000/data", acc)
        .then(response => console.log(response));
    },
    deleteAccount(id) {
      axios.delete(`http://localhost:3000/data/${id}`)
        .then(response => console.log(response))
    }
  },
  created() {
    this.getAccounts();
  }
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

body {
  background-image: linear-gradient(to right, #090979, #00d4ff);
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

thead,
tbody {
  text-align: center;
}

ul {
  list-style-type: none;
}
</style>