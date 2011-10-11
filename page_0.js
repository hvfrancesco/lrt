//set main namespace
goog.provide('test2.page_0');

goog.require('lime.Scene');
goog.require('lime.Circle');
goog.require('lime.Layer');
goog.require('lime.Label');

test2.page_0 = function() {
	goog.base(this);
	this.scene = new lime.Scene();
	this.target = new lime.Layer().setPosition(512,384);
        this.circle = new lime.Circle().setSize(150,150).setFill(255,150,0);
        this.lbl = new lime.Label().setSize(160,50).setFontSize(30).setText('Pag. 0');
        this.title = new lime.Label().setSize(800,70).setFontSize(60).setText('Now move me around!').setOpacity(0).setPosition(512,80).setFontColor('#999').setFill(200,100,0,.1);

	
    	//add circle and label to target object
    	this.target.appendChild(this.circle);
    	this.target.appendChild(this.lbl);

    	//add target and title to the scene
    	this.scene.appendChild(this.target);
    	this.scene.appendChild(this.title);

	 


	}

goog.inherits(test2.page_0, lime.Scene, lime.Circle, lime.Layer, lime.Label);

