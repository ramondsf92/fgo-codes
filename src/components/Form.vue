<template>
  <div class="form">
    <form>
      <div class="form-group">
        <label class="text-primary" for="code">Code</label>
        <input
          type="text"
          class="form-control col-6"
          id="input-code"
          v-model="code"
          placeholder="Insert the code"
        />
        <small
          id="codeHelp"
          class="form-text text-muted"
        >Make sure your code is bound at the game before saving it</small>
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
        <input type="number" class="form-control col-3" id="input-ssr" v-model="ssr" />
        <small
          id="ssrHelp"
          class="form-text text-muted"
        >Insert SSR amount ignoring NP level, you will insert on notable SSR</small>
      </div>
      <label for="inputNotable" class="text-primary">Notable Servants</label>
      <div class="formNotable">
        <div class="form-group">
          <div class="form-group">
            <label for="servantName" class="text-primary">Name</label>
            <input
              type="text"
              class="form-control col-6"
              id="input-servant"
              v-model="notable.name"
              placeholder="Insert Servant Name"
            />
          </div>
          <div class="form-group">
            <label for="servantLevel" class="text-primary">Level</label>
            <input
              type="number"
              class="form-control col-3"
              id="input-servant-level"
              v-model="notable.level"
            />
          </div>
          <div class="form-group">
            <label for="servantNp" class="text-primary">NP Level</label>
            <input
              type="number"
              class="form-control col-2"
              id="input-servent-np"
              v-model="notable.npLvl"
            />
          </div>
        </div>
      </div>
      <button type="submit" class="btn btn-primary">Salvar</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "Form",
  data() {
    return {
      code: "",
      server: "",
      ssr: 1,
      notable: [
        {
          name: "",
          level: 0,
          npLvl: 1
        }
      ]
    };
  },
  methods: {}
};
</script>

<style>
.formNotable {
  padding-left: 40px;
}
</style>