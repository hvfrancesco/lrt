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


// entrypoint
lrt.start = function(){

	var pages = [];
	var pagina = 0;
	var director = new lime.Director(document.body,1024,768);
	
	page_0 = new lrt.page_0();
	page_1 = new lrt.page_1();
	pages[pages.length] = page_0.scene;
	pages[pages.length] = page_1.scene;

	
    director.makeMobileWebAppCapable();


    //add some interaction


   	goog.events.listen(page_0.target,'dblclick',function(e){
   		pagina += 1;
   		director.replaceScene(pages[pagina]);
   	});

	goog.events.listen(page_0.target,['mousedown','touchstart'],function(e){
        //animate	
        page_0.target.runAction(new lime.animation.Spawn(
            new lime.animation.FadeTo(.5).setDuration(.2),
            new lime.animation.ScaleTo(1.5).setDuration(.8)
        ));

        page_0.title.runAction(new lime.animation.FadeTo(1));

        //let target follow the mouse/finger
        e.startDrag();
	e.swallow( ['mousemove','touchmove'],function(){
	if (page_0.target.getPosition().x >= 1024) {
				
				pagina +=1;
				director.replaceScene(pages[pagina],lime.transitions.SlideInRight);
				page_1.target.setPosition(1,page_0.target.getPosition().y);				
				}
	});

        //listen for end event
        e.swallow(['mouseup','touchend'],function(){
            page_0.target.runAction(new lime.animation.Spawn(
                new lime.animation.FadeTo(1),
                new lime.animation.ScaleTo(1),
                new lime.animation.MoveTo(512,384)
            ));
            page_0.title.runAction(new lime.animation.FadeTo(0));
        });


    });



   goog.events.listen(page_1.target,'dblclick',function(e){
   pagina -= 1;
   director.replaceScene(pages[pagina]);
   });

	goog.events.listen(page_1.target,['mousedown','touchstart'],function(e){

        //animate
        page_1.target.runAction(new lime.animation.Spawn(
            new lime.animation.FadeTo(.5).setDuration(.2),
            new lime.animation.ScaleTo(1.5).setDuration(.8)
        ));

        page_1.title.runAction(new lime.animation.FadeTo(1));

        //let target follow the mouse/finger
        e.startDrag();


	e.swallow( ['mousemove','touchmove'] ,function(){
	if (page_1.target.getPosition().x <= 0) {
				
				pagina -=1;
				director.replaceScene(pages[pagina],lime.transitions.Dissolve,0.8);
				page_0.target.setPosition(1023,page_1.target.getPosition().y);				
				}
	});

        //listen for end event
        e.swallow(['mouseup','touchend'],function(){
            page_1.target.runAction(new lime.animation.Spawn(
                new lime.animation.FadeTo(1),
                new lime.animation.ScaleTo(1),
                new lime.animation.MoveTo(512,384)
            ));

            page_1.title.runAction(new lime.animation.FadeTo(0));
        });


    });





	// set current scene active
	director.replaceScene(pages[pagina]);

}


//this is required for outside access after code is compiled in ADVANCED_COMPILATIONS mode
goog.exportSymbol('lrt.start', lrt.start);
