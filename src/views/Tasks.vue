<template>
  <v-container >
    <v-app-bar dense app color="primary" dark />
    <br />
    <br />
    <task
      v-for="task in tasks"
      :key="task.taskkey"
      :title="task.title"
      :status="task.status"
      :author="task.author"
      :datetime="task.datetime"
      :responsavel="task.responsible"
      :taskkey="task.taskkey"
      style="margin-bottom:5px"
    />
  </v-container>
</template>

<script>
import task from "../components/Task.vue";
export default {
  name: "Tasks",
  components: {
    task
  },
  data: () => ({
    tasks: []
  }),
  methods: {
    apiSuccess(response) {
      var formatDate = (function() {
        var meses = "Jan Fev Mar Abr Mai Jun Jul Ago Set Out Nov Dez".split(
          " "
        );
        function addZ(n) {
          return n < 10 ? "0" + n : "" + n;
        }
        return function(d) {

          var day = ''
          var today = new Date()
          if(d.getDate() === today.getDate())
            day = 'Hoje'

          today.setDate(today.getDate() - 1)

          if(d.getDate() === today.getDate() && d.getMonth() === today.getMonth())
            day = 'Ontem'

          if(day === '')
            day = addZ(d.getDate()) + "/"   +
            meses[d.getMonth()]     

          return (
            day                                      + " - " +                                    
            d.getHours().toString().padStart(2, "0") + ":" +
            d.getMinutes().toString().padStart(2, "0")
          );
        };
      })();

      this.tasks = response.data;
      this.tasks.forEach(function(task) {
        var date = new Date(task.datetime);
        task.datetime = formatDate(date)
      });
    },
    apiError(error) {
      if (1 > 2) return;
    }
  },
  beforeMount() {
    this.$axios
      .get(
        "https://cors-anywhere.herokuapp.com/" +
          "https://us-central1-fluxo-274720.cloudfunctions.net/getTasks-web"
      )
      .then(response => this.apiSuccess(response))
      .catch(error => this.apiError(error));
  }
};
</script>
