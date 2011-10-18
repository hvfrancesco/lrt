//set main namespace
goog.provide('lrt.page_0');

//goog.require('lime.Scene');
//goog.require('lime.Circle');
//goog.require('lime.Layer');
//goog.require('lime.Label');


lrt.page_0 = function() {
	goog.base(this);
	
	this.scene = new lime.Scene();
	
	// actor sprite anim
	this.ss = new lime.SpriteSheet('assets/walk_1.png',lime.ASSETS.walk_sheet.json,lime.parser.JSON);
	
	// to right
	this.dxAnim = new lime.animation.KeyframeAnimation();
	this.dxAnim.delay = 1/8;
    for(var i=1;i<=8;i++){
        this.dxAnim.addFrame(this.ss.getFrame('walk_'+goog.string.padNumber(i,2)+'.png'));
    }
    // to left
	this.sinAnim = new lime.animation.KeyframeAnimation();
	this.sinAnim.delay = 1/8;
    for(var i=9;i<=16;i++){
        this.sinAnim.addFrame(this.ss.getFrame('walk_'+goog.string.padNumber(i,2)+'.png'));
    }
	this.dxAnim.stop();
	this.sinAnim.stop();
	
	//page background
	this.background = new lime.Layer().setAnchorPoint(0.5,0.5).setPosition(lrt.WIDTH/2,lrt.HEIGTH/2);
	this.bgImage = new lime.Sprite().setSize(1024,768).setAnchorPoint(0,0).setFill('assets/bg_0.jpg');
	this.background.appendChild(this.bgImage);
	
	this.target = new lime.Layer().setPosition(117/2,lrt.HEIGHT-170);
	this.actorBg = new lime.Sprite().setSize(150,150).setAnchorPoint(0,0).setPosition(0,0).setFill('assets/cartone_1.png');
    this.actor = new lime.Sprite().setSize(117,120).setAnchorPoint(0,0).setPosition(16,15).setFill(this.ss.getFrame('walk_01.png'));
    this.title = new lime.Label().setSize(800,70).setFontSize(40).setFontColor('#FFF').setText('drag me to the borders').setOpacity(0).setPosition(512,80).setFill(200,100,0,.1);
	
    this.actor.runAction(this.dxAnim);
	this.dxAnim.stop();
	    
    //add sprite to target object
	this.target.appendChild(this.actorBg);
    this.target.appendChild(this.actor);
    
    //add layers to the scene
    this.scene.appendChild(this.background);
    this.scene.appendChild(this.target);
    this.scene.appendChild(this.title);
    
    that0 = this;

    goog.events.listen(this.actor,'dblclick',function(e){	
   		lrt.goNextScene();
   	});
    
    goog.events.listen(this.actor,['mousedown','touchstart'],this.hoodAnim_, false, this);
	
    
    goog.events.listen(this.target,['mousedown','touchstart'],this.handleMouseDown_, false, this);

};

goog.inherits(lrt.page_0, lime.Scene, lime.Circle, lime.Layer, lime.Label, lime.animation.Spawn, lime.animation.FadeTo, lime.animation.ScaleTo, lime.parser.ZWOPTEX);

lrt.page_0.prototype.animate = function() {
	
	this.target.runAction(new lime.animation.Spawn(new lime.animation.FadeTo(.5).setDuration(.2), new lime.animation.ScaleTo(0.75).setDuration(.8)));
    this.title.runAction(new lime.animation.FadeTo(1));

};


lrt.page_0.prototype.hoodAnim_ = function(e) {
    this.dxAnim.delay = 1/8;
    this.dxAnim.play();
};



lrt.page_0.prototype.handleMouseDown_ = function(e) {
	
	//let target follow the mouse/finger
    /*
    if (!that0.dxAnim.isPlaying_) {
        
        that0.dxAnim.delay=1/8;
        that0.dxAnim.play();
        }
	*/
    e.startDrag(false, new goog.math.Box(lrt.HEIGHT-170,lrt.WIDTH,lrt.HEIGHT-170,0));
    
  
           
	e.swallow( ['mousemove','touchmove'],function(e){
        
	if (this.getPosition().x >= lrt.WIDTH) {	
		lrt.slideNextPage();				
		}
	else if (this.getPosition().x <= 0) {
		lrt.slidePrevPage();		
		}	

	});
	
    //listen for mouseup
    e.swallow(['mouseup','touchend'],function(){
        //that0.target.runAction(new lime.animation.Spawn(
            //new lime.animation.FadeTo(1),
            //new lime.animation.ScaleTo(1)
            //,new lime.animation.MoveTo(512,420)
        //));
        that0.dxAnim.stop();
        that0.title.runAction(new lime.animation.FadeTo(0));
    });

};
