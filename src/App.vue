<template>
  <v-app style="background:#f5f5f5">
    <router-view />
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
  beforeMount(){
    this.$router.replace('tasks')
  }
};
</script>
