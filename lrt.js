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



lrt.pages = [];
lrt.currPage = 0;
lrt.prevPage = 0;

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
	lrt.pages[lrt.pages.length] = page_0.scene;
	lrt.pages[lrt.pages.length] = page_1.scene;

	
    lrt.director.makeMobileWebAppCapable();


    //add some interaction

	/*
	goog.events.listen(page_0.target,['mousedown','touchstart'],function(e){
        //animate		
	page_0.animate();

        //let target follow the mouse/finger
        e.startDrag();
	e.swallow( ['mousemove','touchmove'],function(){
	if (page_0.target.getPosition().x >= 1024) {
				
				lrt.currPage +=1;
				lrt.director.replaceScene(lrt.pages[lrt.currPage],lime.transitions.SlideInRight);
				page_1.target.setPosition(1,page_0.target.getPosition().y);				
				}
	});

        //listen for end event
        e.swallow(['mouseup','touchend'],function(){
            page_0.target.runAction(new lime.animation.Spawn(
                new lime.animation.FadeTo(1),
                new lime.animation.ScaleTo(1),
                new lime.animation.MoveTo(512,420)
            ));
            page_0.title.runAction(new lime.animation.FadeTo(0));
        });


    }); */


	goog.events.listen(page_1.target,['mousedown','touchstart'],function(e){

        //animate
        page_1.animate();

        //let target follow the mouse/finger
        e.startDrag();


	e.swallow( ['mousemove','touchmove'] ,function(){
	if (page_1.target.getPosition().x <= 0) {
				
				lrt.currPage -=1;
				lrt.director.replaceScene(lrt.pages[lrt.currPage],lime.transitions.Dissolve,0.8);
				page_0.target.setPosition(1023,page_1.target.getPosition().y);				
				}
	});

        //listen for end event
        e.swallow(['mouseup','touchend'],function(){
            page_1.target.runAction(new lime.animation.Spawn(
                new lime.animation.FadeTo(1),
                new lime.animation.ScaleTo(1),
                new lime.animation.MoveTo(512,420)
            ));

            page_1.title.runAction(new lime.animation.FadeTo(0));
        });


    });





	// set current scene active
	lrt.director.replaceScene(lrt.pages[lrt.currPage]);

}


lrt.goNextScene = function() {
	lrt.currPage += 1;
	if (lrt.currPage >= lrt.pages.length) {lrt.currPage = 0;}
   	lrt.director.replaceScene(lrt.pages[lrt.currPage]);
}

lrt.slideNextScene = function() {
	lrt.prevPage = lrt.currPage;
	lrt.currPage += 1;
	if (lrt.currPage >= lrt.pages.length) {
		lrt.currPage = 0;
		lrt.prevPage = 	lrt.pages.length;
	}
	lrt.director.replaceScene(lrt.pages[lrt.currPage],lime.transitions.SlideInRight);
	lrt.pages[lrt.currPage].target.setPosition(1,lrt.pages[lrt.prevPage].target.getPosition().y);	
}

lrt.slidePrevScene = function() {
	lrt.prevPage = lrt.currPage;
	lrt.currPage -= 1;
	if (lrt.currPage <= 0) {
		lrt.currPage = lrt.pages.length;
		lrt.prevPage = 	0;
	}
	lrt.director.replaceScene(lrt.pages[lrt.currPage],lime.transitions.SlideInRight);
	lrt.pages[lrt.currPage].target.setPosition(1,lrt.pages[lrt.prevPage].target.getPosition().y);	
}


//this is required for outside access after code is compiled in ADVANCED_COMPILATIONS mode
goog.exportSymbol('lrt.start', lrt.start);
