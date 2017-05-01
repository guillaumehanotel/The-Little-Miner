$(document).ready(function () {
    
    
    
    const START_Y = 360;
    const GAME_WIDTH = 420;
    const GAME_HEIGHT = 1280
    const FRAME_HEIGHT = 700;
    
    
    var game = new Phaser.Game(GAME_WIDTH, FRAME_HEIGHT, Phaser.AUTO, '', { preload: preload, create: create, update: update });

    
    function loadImages(){
        game.load.image('sky', 'assets/img/little_sky.png');
        game.load.image('ground', 'assets/img/dirt.png');
        game.load.image('dirt_block', 'assets/img/dirt_block.jpg');
        game.load.image('grass_block', 'assets/img/grass_block.png');
        
        
        game.load.image('destroy_1', 'assets/img/destroy_stage_1.png');
        game.load.image('destroy_2', 'assets/img/destroy_stage_2.png');
        game.load.image('destroy_3', 'assets/img/destroy_stage_3.png');
        game.load.image('destroy_4', 'assets/img/destroy_stage_4.png');
        game.load.image('destroy_5', 'assets/img/destroy_stage_5.png');
        game.load.image('destroy_6', 'assets/img/destroy_stage_6.png');
        game.load.image('destroy_7', 'assets/img/destroy_stage_7.png');
        game.load.image('destroy_8', 'assets/img/destroy_stage_8.png');
        game.load.image('destroy_9', 'assets/img/destroy_stage_9.png');
        
        
        game.load.spritesheet('destroy_all', 'assets/img/destroy_stage_all.png',60,60,9);
        
        
        
    }
    
    /* PRELOAD */
    function preload() {
        
        loadImages(); 
        
    }
    
    
    
    /* Fonction servant à initialiser la vue du jeu */
    function loadGameView(){
        
        game.physics.startSystem(Phaser.Physics.ARCADE);
        // On ajoute le sprite du ciel à partir de la position (0,0)
        game.add.sprite(0, 0, 'sky');
        // On ajoute le sprite du sol à partir de la position (0,360)
        game.add.sprite(0, START_Y, 'ground');
        // On défini les limites du jeu s'arretant à 1280px de profondeur
        game.world.setBounds(0, 0, 0, GAME_HEIGHT);
        
        game.time.slowMotion = 60.0;
        
        // Création des blocks
        loadBlocks();
        

        
        scoreText = game.add.text(16, 16, 'Pioche: '+GameModel.pioche, { fontSize: '23px', fill: '#000' });

    }
    
    
    
    
    
    
    /* CREATE */
    function create() {
        
        
        GameModel.createBlocks();
        
        loadGameView();
        
        
        /*
        var cracks = game.add.sprite(60,480,'destroy_all');
        var destroy = cracks.animations.add('destroy');
        cracks.animations.play('destroy', 10, true)
        */
        
        
    }
    
    
    
    
    
    
    /* FONCTION SERVANT A CREER GRAPHIQUEMENT LES BLOCKS */
    function loadBlocks(){
                
        blocks = game.add.group();
        
        blocks.enableBody = true;

        // on récupère dans un tableau, l'attribut blocks de l'objet GameModel
        var arrayBlocks = GameModel.blocks;
        
        
        
        arrayBlocks.forEach(function(element){
            
            // si les éléments ne sont pas détruit
            if(element.destroyed == false){
                
                // si l'ordonnée des éléments est sur la ligne de départ
                if(element.location.y == START_Y){
                    blocks.create(element.location.x, element.location.y, 'grass_block') 

                // si les éléments sont de types DIRT
                } else if(element.type == TYPEBLOCK.DIRT){
                    blocks.create(element.location.x, element.location.y, 'dirt_block') 
                }
            }
            

           
           //console.log("("+element.location.x+","+element.location.y+")")
        });
        
        

        
    }
    
    
    
    
    
    
    var c = 1;
    
    /* UPDATE */
    function update() {
        
        
        //game.camera.y += 1;
        

        
        
        
    }

    
    
    
    
    
    
    
    
    /************************************************************************************/
    /**************************************   MODEL  ************************************/
    /************************************************************************************/
    
    
    /* Notre modèle jeu qui a un attribut liste des blocks et un fonction pour les créer */
    var GameModel = {
        blocks : null,
        pioche : 35,
          
        
        
        createBlocks : function(){
            
            var array_blocks = [];
            // de 0 à 420
            for (var i = 0; i < GAME_WIDTH; i+= 60){
            // de 360 à 1280
                for(var j = START_Y; j < GAME_HEIGHT; j+= 60 ){

                    // ici qu'on mettrait un random pour définir le type des blocks
                    
                    
                    var profondeur = (j-300)/60;
                    var block = new Block(i,j,profondeur)
                    block.type = TYPEBLOCK.DIRT;
                    block.setResistance();
                    array_blocks.push(block);
                    
                    
                    
                }
            }

            this.blocks = array_blocks;
        }
        
        
        
        
          
    };
    
    

    
    // OBJET LOCATION
    function Location(x,y){
        this.x = x;
        this.y = y;
    }
    
    
    
    /** 
     * OBJECT BLOCK
     * hauteur et largeur a 60px
     */
    
    function Block(x, y, profondeur){
        this.height = 60;
        this.width =  60;
        this.location = new Location(x,y);
        this.profondeur = profondeur;
        this.resistance = null;
        this.type = null;
        this.destroyed = false;
    }
    
    Block.prototype.setResistance = function(){
        
        switch(this.type){
                
            case TYPEBLOCK.DIRT : 
                this.resistance = 1;
                break;
            case TYPEBLOCK.STONE :
                this.resistance = 2;
                break;
            case TYPEBLOCK.OBSIDIAN :
                this.resistance = 9999;
                break;
            default :
                this.resistance = 1;
                break;
        }
    }
    
    
    
    
    
    
    var TYPEBLOCK = {
        DIRT : { name : "Dirt", resistance : 1 },
        STONE : { name : "Stone", resistance : 2 },
        OBSIDIAN : { name : "Obsidian", resistance : 9999 }
    };

    Object.freeze(TYPEBLOCK);
    
    


});