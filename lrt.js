//set main namespace
goog.provide('lrt');


//get requirements
goog.require('lime.Director');
goog.require('lime.Scene');
goog.require('lime.Layer');
goog.require('lime.Circle');
goog.require('lime.Label');
goog.require('lime.animation.Spawn');
goog.require('lime.animation.FadeTo');
goog.require('lime.animation.ScaleTo');
goog.require('lime.animation.MoveTo');
goog.require('lime.transitions.SlideInRight');
goog.require('lime.transitions.Dissolve');

goog.require('lrt.page_0');
goog.require('lrt.page_1');
goog.require('lrt.page_2');



lrt.pages = [];
lrt.currPage = 0;

//constant iPad size
//lrt.WIDTH = 720;
//lrt.HEIGHT = 1004;
lrt.WIDTH = 1024;
lrt.HEIGHT = 768;


// entrypoint
lrt.start = function(){

	lrt.director = new lime.Director(document.body,lrt.WIDTH,lrt.HEIGHT);
	
	page_0 = new lrt.page_0();
	page_1 = new lrt.page_1();
	page_2 = new lrt.page_2();
	
	lrt.pages[lrt.pages.length] = page_0;
	lrt.pages[lrt.pages.length] = page_1;
	lrt.pages[lrt.pages.length] = page_2;

    lrt.director.makeMobileWebAppCapable();
    
	// set current scene active
	lrt.director.replaceScene(lrt.pages[lrt.currPage].scene);

}


lrt.goNextScene = function() {
	lrt.currPage += 1;
	if (lrt.currPage >= lrt.pages.length) {lrt.currPage = 0;}
   	lrt.director.replaceScene(lrt.pages[lrt.currPage].scene);
}

lrt.slideNextPage = function() {
    var prevY = lrt.pages[lrt.currPage].target.getPosition().y;
	lrt.currPage += 1;
	if (lrt.currPage >= lrt.pages.length) {lrt.currPage = 0;}
		
	lrt.director.replaceScene(lrt.pages[lrt.currPage].scene,lime.transitions.SlideInRight);
	lrt.pages[lrt.currPage].target.setPosition(lrt.pages[lrt.currPage].actor.getSize().width/2,prevY);
	alert("curr "+lrt.currPage);	
}

lrt.slidePrevPage = function() {
    var prevY = lrt.pages[lrt.currPage].target.getPosition().y;
	lrt.currPage = lrt.currPage-1;
	if (lrt.currPage < 0) {lrt.currPage = (lrt.pages.length-1);}
	
	lrt.director.replaceScene(lrt.pages[lrt.currPage].scene,lime.transitions.Dissolve,1);
	lrt.pages[lrt.currPage].target.setPosition(lrt.WIDTH-lrt.pages[lrt.currPage].actor.getSize().width/2,prevY);
	alert("curr "+lrt.currPage);			
}


//this is required for outside access after code is compiled in ADVANCED_COMPILATIONS mode
goog.exportSymbol('lrt.start', lrt.start);
