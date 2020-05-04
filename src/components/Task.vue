<template>
  <div>
    <v-card
      class="mx-auto"
      max-width="928px"
      height="100%"
      outlined
      :loading="cardLoading"
      width="80%"
      :style="statusAtual.cardBorder"
    >
      <div
        class="d-flex align-center flex-no-wrap"
        style="width:100%;padding:15px;padding-bottom:8px"
      >
        <div class="overline">Criado Por:</div>
        <span style="padding-left:4px" class="caption">{{author}}</span>
        <v-spacer />
        <div class="overline">{{datetime}}</div>
      </div>
      <div
        class="title"
        style="padding-left:15px;padding-right:15px;text-overflow:ellipsis;overflow:hidden;white-space: nowrap;"
      >{{title}}</div>

      <v-card-actions>
        <div
          class="d-flex align-center flex-no-wrap"
          style="width:100%;padding-left:6px;padding-right:6px;"
        >
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-hover  v-slot:default="{ hover }">
                <div v-on="on" @click="dialog_resp = true"
                  style="padding:3px;border-radius:8px;padding-left:5px;padding-right:5px"
                  class="elevation-1 d-flex align-center flex-no-wrap"
                  :class="{'hover_selected': hover }"
                >
                  <v-avatar size="37" >
                    <v-img :src="responsavelAtual.foto" alt="." class="profile-picture" />
                  </v-avatar>
                  <span class="body-2" style="padding-left:4px">{{responsavelAtual.nome}}</span>
                </div>
              </v-hover>
            </template>

            <span>Responsável</span>
          </v-tooltip>
          <v-spacer></v-spacer>
          <v-icon class="mr-1">mdi-message-text-outline</v-icon>
          <span class="subheading">45</span>
          <v-chip class="ma-2" color="primary" label>
              Ongoing
            </v-chip>
           <v-menu transition="slide-y-transition" open-on-hover bottom nudge-bottom="40px">
                  <template v-slot:activator="{ on }">
                    <v-icon
                      large
                      :color="statusAtual.color"
                      style="padding-right:12px"
                      v-on="on"
                    >{{statusAtual.statusIcon}}</v-icon>
                  </template>
                  <v-list>
                    <v-list-item v-for="statusAux in statusList" :key="statusAux.statusCode" v-on:click="changeStatus($event, statusAux)">
                        <div :style="statusAux.statusColor" :class="statusAux.statusClass" class="d-flex justify-start align-center">
                          <v-icon 
                            :style="statusAux.statusColor"
                            :class="statusAux.statusClass"
                            large
                          >{{statusAux.statusIcon}}</v-icon>
                          <span
                            :class="statusAux.statusClass"
                            style="padding-left:6px"
                          >{{statusAux.statusText}}</span>
                        </div>
                    </v-list-item>
                  </v-list>
                </v-menu>
          
        </div>
      </v-card-actions>
    </v-card>

<v-dialog v-model="dialog_resp" scrollable max-width="300px">
      <v-card>
        <v-card-title>Selecionar responsável pela atividade</v-card-title>
        <v-divider></v-divider>
        <v-card-text style="height: 300px;">
         <v-list nav>
      <v-list-item @click="changeResponsible(responsavel)" v-for="responsavel in responsaveis" :key="responsavel.nome">
         <v-list-item-avatar>
          <v-img :src="responsavel.foto" class="profile-picture"></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title v-text="responsavel.nome"></v-list-item-title>
        </v-list-item-content>

       
      </v-list-item>
    </v-list>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="blue darken-1" text @click="dialog_resp = false">Cancelar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

<v-snackbar
      v-model="warning"
      timeout=2000
    >
      {{ warningText }}
      <v-btn
        color="blue"
        text
        @click="warning = false"
      >
        Close
      </v-btn>
    </v-snackbar>

  </div>
</template>

<script>
import pic_eric  from '../assets/responsibles/profile_picture.jpg'
import pic_julio from '../assets/responsibles/pic_julio.png'
import pic_fabio from '../assets/responsibles/profile.svg'

export default {
  name: "Tasks",
  props: ["title", "author", "datetime","responsavel","taskkey","status"],
  data: () => ({
    cardLoading: false,
    warning: false,
    warningText: '',
    dialog_resp: false,
    responsaveis: [{
      nome: 'Eric Freitas',
      foto: pic_eric
    },{
      nome: 'Júlio Tavares',
      foto: pic_julio
    },{
      nome: 'Fábio Natero',
      foto: pic_fabio
    }],
    responsavelAtual: {
      nome: '',
      foto: ''
    },
    statusList: [{
      statusName: "naoiniciado",
      statusCode: "N",
      statusColor: "color:#BDBDBD",
      statusClass: "zcust-hover-naoiniciado",
      statusText: "Não iniciado",
      statusIcon: "mdi-stop-circle-outline",
      color: "black",
      cardBorder: "border-left: 5px solid black;"
    },
    {
      statusName: "parado",
      statusCode: "P",
      statusColor: "color:#EF9A9A",
      statusClass: "zcust-hover-parado",
      statusText: "Parado",
      statusIcon: "mdi-pause-circle-outline",
      color: "#ef5350",
      cardBorder: "border-left: 5px solid #ef5350;"
    },
    {
      statusName: "finalizado",
      statusCode: "F",
      statusColor: "color:#C8E6C9",
      statusClass: "zcust-hover-finalizado",
      statusText: "Finalizado",
      statusIcon: "mdi-check-circle-outline",
      color: "#81c784",
      cardBorder: "border-left: 5px solid #81c784;"
    },
    {
      statusName: "emandamento",
      statusCode: "A",
      statusColor: "color:#ffdf87",
      statusClass: "zcust-hover-emandamento",
      statusText: "Em andamento",
      statusIcon: "mdi-play-circle-outline",
      color: "orange",
      cardBorder: "border-left: 5px solid orange;"
    }],
     statusAtual: {
      statusName:  "",
      statusCode:  "",
      statusColor: "",
      statusClass: "",
      statusText: "Não iniciado",
      statusIcon: "mdi-stop-circle-outline",
      cardBorder: '',
      color: 'black'
    } 
  }),
  methods: {
    changeResponsible(responsavel){
      this.responsavelAtual = responsavel
      this.dialog_resp = false

      this.cardLoading = true
      this.$axios
      .get(
        "https://cors-anywhere.herokuapp.com/" +
          "https://us-central1-fluxo-274720.cloudfunctions.net/setTable?" + "key=" + this.taskkey + '&tab=tks&resp=' + this.responsavelAtual.nome  
      )
      .then(response => {
        this.cardLoading = false
        this.warning = true
        this.warningText = 'Responsável alterado com sucesso'
        })
      .catch(error => {
        this.cardLoading = false 
        console.log(error)});
    },
    
  changeStatus(e,status){
    this.statusAtual = status
    this.cardLoading = true
     this.$axios
      .get(
        "https://cors-anywhere.herokuapp.com/" +
          "https://us-central1-fluxo-274720.cloudfunctions.net/setTable?" + "key=" + this.taskkey + '&tab=tks&status=' + this.statusAtual.statusCode  
      )
      .then(response => {
        this.cardLoading = false
        this.warning = true
        this.warningText = 'Status alterado com sucesso'
        })
      .catch(error => { 
        this.cardLoading = false
        console.log(error)
        }); 
  }
  },
  beforeMount(){
    if(!this.responsavel)
      this.responsavelAtual = { nome: 'Nenhum Responsável',  foto: pic_fabio}
    else{
      if(this.responsavel === 'Eric Freitas') this.responsavelAtual = { nome: 'Eric Freitas',  foto: pic_eric}
      if(this.responsavel === 'Júlio Tavares') this.responsavelAtual = { nome: 'Júlio Tavares',  foto: pic_julio}
      if(this.responsavel === 'Fabio Natero') this.responsavelAtual = { nome: 'Fabio Natero',  foto: pic_fabio}
    }

    if(this.status === 'N')
      this.statusAtual = this.statusList[0]
    if(this.status === 'P')
      this.statusAtual = this.statusList[1]
    if(this.status === 'F')
      this.statusAtual = this.statusList[2]
    if(this.status === 'A')
      this.statusAtual = this.statusList[3]
  }
  
};
</script>

<style scoped>
.hover_selected {
  cursor: pointer;
  box-shadow: blue 0px 1px 1px 0px !important;
}

.profile-picture {
  position: absolute;
  left: 50%;
  top: 50%;
  height: 100%;
  width: auto;
  -webkit-transform: translate(-50%,-50%);
      -ms-transform: translate(-50%,-50%);
          transform: translate(-50%,-50%);
}

</style>
