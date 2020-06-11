<template>
  <div class="account">
      <h1>Essa é a conta {{ id }}</h1>
  </div>
</template>

<script>
export default {
    name: 'Account',
    props: {
        id: {type: Number},
        code: {type: String}
    }
}
</script>

<style>

</style>