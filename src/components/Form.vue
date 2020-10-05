<template>
  <div class="container">
    <form method="POST">
      <div class="form-group">
        <label class="text-primary" for="code">Code</label>
        <input
          type="text"
          class="form-control col-6"
          id="input-code"
          v-model="code"
          oninput="javascript: this.value = this.value.length > this.maxlength ? this.value.slice(0, this.maxlength) : this.value"
          placeholder="Insert the code"
          maxlength="10"
        />
        <small id="codeHelp" class="form-text text-muted"
          >Make sure your code is bound at the game before saving it</small
        >
      </div>
      <div class="form-group">
        <label class="text-primary" for="inputServer">Server</label>
        <select class="form-control col-4" id="inputServer" v-model="server">
          <option class="text-primary" disabled value>Choose Server...</option>
          <option class="text-primary" value="NA">NA</option>
          <option class="text-primary" value="JP">JP</option>
        </select>
        <span class="text-secondary">Selected: {{ server }}</span>
      </div>
      <div class="form-group">
        <label for="inputSSR" class="text-primary">SSR Amount</label>
        <input
          type="number"
          class="form-control col-3"
          id="input-ssr"
          v-model.number="ssr"
        />
        <small id="ssrHelp" class="form-text text-muted"
          >Insert SSR amount ignoring NP level, you will insert on notable
          SSR.</small
        >
      </div>
      <label for="inputNotable" class="text-primary">Notable Servants</label>
      <div class="formNotable">
        <div v-for="(servo, i) in notable" class="row" :key="i">
          <div class="col-6">
            <label for="servantName" class="text-primary">Name</label>
            <input
              type="text"
              class="form-control"
              v-model="notable[i].name"
              placeholder="Insert Servant Name"
            />
          </div>
          <div class="col-2">
            <label for="servantLevel" class="text-primary">Level</label>
            <input
              type="number"
              class="form-control"
              v-model.number="notable[i].level"
            />
          </div>
          <div class="col-2">
            <label for="servantNp" class="text-primary">NP Level</label>
            <input
              type="number"
              class="form-control"
              v-model.number="notable[i].npLvl"
            />
          </div>
          <div class="col-2">
            <button
              v-if="i == notable.length - 1"
              data-toggle="tooltip"
              title="Add more notable Servants"
              class="btn btn-success btn-addServant"
              @click="inserirNotable"
            >
              +
            </button>
          </div>
        </div>
      </div>
      <div class="mt-2">
        <button
          type="submit"
          id="save-button"
          class="btn btn-primary align-self-center"
          :disabled="code.length < 10"
          @click="saveAccount"
        >
          Save
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Form",
  props: {
    propId: Number,
    propCode: String,
    propServer: String,
    propSsr: Number,
    propNotable: Array,
  },
  data() {
    return {
      code: "",
      server: "",
      ssr: 1,
      notable: [
        {
          name: "",
          level: 0,
          npLvl: 1,
        },
      ],
    };
  },
  methods: {
    mostrarDados(e) {
      e.preventDefault();
      console.log({
        code: this.code,
        server: this.server,
        ssr: this.ssr,
        notable: this.notable,
      });
    },
    inserirNotable(e) {
      e.preventDefault();
      this.notable.push({
        name: "",
        level: 0,
        npLvl: 1,
      });
    },
    limitInputCode() {
      this.code =
        this.code.length <= 10 ? this.code : this.code.substring(0, 10);
    },

    saveAccount(e) {
      e.preventDefault();
      console.log(e.target);
      if (this.propCode) {
        axios
          .put(`http://localhost:3000/data/${this.propId}`, {
            code: this.code,
            server: this.server,
            ssr: this.ssr,
            notable: this.notable,
          })
          .then((response) => console.log(response));
      } else {
        axios
          .post("http://localhost:3000/data", {
            code: this.code,
            server: this.server,
            ssr: this.ssr,
            notable: this.notable,
          })
          .then((response) => console.log(response));
      }
    },
  },
  created() {
    if (this.propCode) {
      this.code = this.propCode;
      this.server = this.propServer;
      this.ssr = this.propSsr;
      this.notable = this.propNotable;
    } else {
      this.code = "";
      this.server = "";
      this.ssr = 1;
      this.notable = [
        {
          name: "",
          level: 0,
          npLvl: 1,
        },
      ];
    }
  },
};
// const codeInput = document.getElementById("input-code");

// if (codeInput.value.length < 10) {
//   document.getElementById("save-button").disabled = false;
// }
</script>

<style>
.btn-addServant {
  margin-top: 31px;
}
</style>
