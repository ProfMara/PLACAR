class Game {
  constructor() {
    
    this.tituloResetar = createElement("h2");
    this.botaoResetar = createButton("");

    this.placar = createElement("h2");
    this.lugar1 = createElement("h2");
    this.lugar2 = createElement("h2");  
  }

  getState() {
    var gameStateRef = database.ref("gameState");
    gameStateRef.on("value", function(data) {
      gameState = data.val();
    });
  }

  start() {

    player = new Player();
    playerCount = player.getCount();

    form = new Form();
    form.display();

    //código para criar as sprites dos carros e colocá-los na matriz
   
    var carro1 = createSprite(width/2 - 100, height - 100);
    carro1.addImage(carroimg1);
    carro1.scale = 0.07;

    var carro2 = createSprite(width/2 + 100, height - 100);
    carro2.addImage(carroimg2);
    carro2.scale = 0.07;

    carros = [carro1, carro2];


    grupoMoedas = new Group();
    this.addSprites(grupoMoedas, 30, moeda, 0.1);

  }
 
  addSprites(grupo, numero, imagem, tamanho){

    for(var i=0; i< numero; i++){
      var x = random(width/2 - 100, width/2 +100);
      var y = random(-height *4.5, height - 100); 
      var sprite = createSprite(x,y);
      sprite.addImage(imagem);
      sprite.scale = tamanho;
      grupo.add(sprite);
    }
  }


  play(){
    this.porElementos();
    this.resetar();    
    Player.pegarInfo();

    if(allPlayers !== undefined){
      image(estradaimg, 0, -height*5, width, height*6 )
     //chamar a função para mostrar o placar
     
      var i = 0;
       for(var plr in allPlayers){     
        i++;
        var x = allPlayers[plr].posX;
        var y = height - allPlayers[plr].posY;
        carros[i-1].position.x = x;
        carros[i-1].position.y = y;

        if(i==player.indice){
          camera.position.y = y;
          this.coletarMoeda(i);
        }
        
    }
    drawSprites();   
    this.controlarCarro()
  }
  }     


  porElementos() {
    form.hide();
    form.titleImg.position(40, 50);
    form.titleImg.class("gameTitleAfterEffect");

    this.tituloResetar.html("Reiniciar o Jogo");
    this.tituloResetar.class("resetText");
    this.tituloResetar.position(width / 2 + 200, 40);

    this.botaoResetar.class("resetButton");
    this.botaoResetar.position(width / 2 + 230, 100);

    this.placar.html("Placar");
    this.placar.class("placar");
    this.placar.position(width/3 - 60,60);

    this.lugar1.class("placar");
    this.lugar1.position(width/3 - 60,80);
    
    this.lugar2.class("placar");
    this.lugar2.position(width/3 - 60,130);
  }
/*
  mostrarPlacar(){
    var lugar1, lugar2;
    //pegar os valores do banco de dados e colocá-los em uma matriz

   //se ambos os players tiverem o rank 0 ou se o primeiro player tem rank 1
    if(() || ){
    
    // &emps; é usado para acrescentar espaços
   //o primeiro lugar é do player 0
    lugar1 = "&emsp;" + players[0].nome + "&emsp;"
    //e o segundo lugar é do player 1
    lugar2 = "&emsp;" + players[1].nome  + "&emsp;"

    }

    //se o player 1 tiver rank 1
    if(){
      // "&emps;" é usado para acrescentar espaços
      //então, o primeiro lugar é do player 1
      lugar1 ="&emsp;" + players[1].nome + "&emsp;"
      //e o segundo lugar é do player 0
      lugar2 = "&emsp;" + players[0].nome + "&emsp;"
    }
    //mostrar esses valores no placar
    this.lugar1.html();
    this.lugar2.html();
    

  }
 */
  update(state){
    database.ref("/").update({
      gameState:state
    })
  }

  //fazer função para controlar o carro e atualizar o novo valor no banco de dados
  controlarCarro(){

    if(keyIsDown(UP_ARROW)){
      player.posY +=10;
      player.update();
    }
    if(keyIsDown(LEFT_ARROW)){
      player.posX -=10;
      player.update();
    }
    if(keyIsDown(RIGHT_ARROW)){
      player.posX +=10;
      player.update();
    }

  }
  
  resetar() {
    this.botaoResetar.mousePressed(() => {
      database.ref("/").set({
        playerCount: 0,
        gameState: 0,
        players: {},
      });
      window.location.reload();
    });
  }

  //função para coletar a moeda
  coletarMoeda(i){
    
    carros[i-1].overlap(grupoMoedas, function(coletor, coletado){
      coletado.remove();
    
      //aumentar a pontuação do player

      //mostrar no console os pontos
      
      //atualizar a pontuação no banco de dados


  })


  }



}
