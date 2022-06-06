class Player {
  constructor() {
    this.nome = null;
    this.indice = null;
    this.posX = 0;
    this.posY = 0;
    //atribuir a propriedade ponto

    //atribuir a propriedade rank
    
  } 

  addPlayer(){
    var playerIndice = "players/player " + this.indice;

    if(this.indice == 1){
      this.posX = width/2 - 100;
    }else{
      this.posX = width/2 + 100;
    }

    database.ref(playerIndice).set({
      posX: this.posX,
      posY: this.posY,
      nome: this.nome,
      indice: this.indice,
      //colocar no banco de dados o rank e os pontos
     

    });


  }
  


  getCount(){
    var playerCountRef = database.ref("playerCount");
     playerCountRef.on("value", data => {
      playerCount = data.val();
    });
  }
  //atualizar a quantidade de jogadores no banco de dados

  updateCount(quantidade){
    database.ref("/").update({
      playerCount: quantidade
    })
  }
  
  //atualizar os valores no banco de dados
  update(){
    var playerIndice = "players/player " + this.indice;
   //referenciar o banco de dados e colocar as informações novas do player local no banco de dados  
   database.ref(playerIndice).update({
     posX: this.posX,
     posY: this.posY,
     //atualizar o rank e os pontos
     

   });
   
  }

  //pegar informações do banco de dados sobre os players
  static pegarInfo(){
    var ref  = database.ref("players")
    ref.on("value", data => {
      allPlayers = data.val();
    })
  }


  //pegar a distância no banco de dados
  pegarPos() {
    var playerRef = database.ref("players/player " + this.indice);
    
  }

}
