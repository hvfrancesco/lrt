//set main namespace
goog.provide('test2');


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

goog.require('test2.page_0');
goog.require('test2.page_1');


// entrypoint
test2.start = function(){

	var pages = [];
	var pagina = 0;
	var director = new lime.Director(document.body,1024,768);
	
	//pages[pages.length] = new lime.Scene();
	//pages[pages.length] = new lime.Scene();
	page_0 = new test2.page_0();
	page_1 = new test2.page_1();
	pages[pages.length] = page_0.scene;
	pages[pages.length] = page_1.scene;

	target = new lime.Layer().setPosition(512,384);
        circle = new lime.Circle().setSize(150,150).setFill(255,150,0);
        lbl = new lime.Label().setSize(160,50).setFontSize(30).setText('Pag. 0');
        title = new lime.Label().setSize(800,70).setFontSize(60).setText('Now move me around!').setOpacity(0).setPosition(512,80).setFontColor('#999').setFill(200,100,0,.1);


    //add circle and label to target object
    target.appendChild(circle);
    target.appendChild(lbl);

    //add target and title to the scene
    pages[0].appendChild(target);
    pages[0].appendChild(title);

    director.makeMobileWebAppCapable();

   target1 = new lime.Layer().setPosition(512,384);
   circle1 = new lime.Circle().setSize(150,150).setFill(255,150,255);
   lbl1 = new lime.Label().setSize(160,50).setFontSize(30).setText('Pag. 1');
   title1 = new lime.Label().setSize(800,70).setFontSize(60).setText('Now move me around!').setOpacity(0).setPosition(512,80).setFontColor('#fff').setFill(0,10,20,.1);

    target1.appendChild(circle1);
    target1.appendChild(lbl1);

    pages[1].appendChild(target1);
    pages[1].appendChild(title1);





    //add some interaction

   goog.events.listen(target,'dblclick',function(e){
   pagina += 1;
   director.replaceScene(pages[pagina]);
   });

   goog.events.listen(target1,'dblclick',function(e){
   pagina -= 1;
   director.replaceScene(pages[pagina]);
   });

	goog.events.listen(target1,['mousedown','touchstart'],function(e){

        //animate
        target1.runAction(new lime.animation.Spawn(
            new lime.animation.FadeTo(.5).setDuration(.2),
            new lime.animation.ScaleTo(1.5).setDuration(.8)
        ));

        title1.runAction(new lime.animation.FadeTo(1));

        //let target follow the mouse/finger
        e.startDrag();


	e.swallow( ['mousemove','touchmove'] ,function(){
	if (target1.getPosition().x <= 0) {
				
				pagina -=1;
				director.replaceScene(pages[pagina],lime.transitions.Dissolve,0.8);
				target.setPosition(1023,target1.getPosition().y);				
				}
	});

        //listen for end event
        e.swallow(['mouseup','touchend'],function(){
            target1.runAction(new lime.animation.Spawn(
                new lime.animation.FadeTo(1),
                new lime.animation.ScaleTo(1),
                new lime.animation.MoveTo(512,384)
            ));

            title1.runAction(new lime.animation.FadeTo(0));
        });


    });



    goog.events.listen(target,['mousedown','touchstart'],function(e){

        //animate
        target.runAction(new lime.animation.Spawn(
            new lime.animation.FadeTo(.5).setDuration(.2),
            new lime.animation.ScaleTo(1.5).setDuration(.8)
        ));

        title.runAction(new lime.animation.FadeTo(1));

        //let target follow the mouse/finger
        e.startDrag();

	e.swallow( ['mousemove','touchmove'],function(){
	if (target.getPosition().x >= 1024) {
				
				pagina +=1;
				director.replaceScene(pages[pagina],lime.transitions.SlideInRight);
				target1.setPosition(1,target.getPosition().y);				
				}
	});

        //listen for end event
        e.swallow(['mouseup','touchend'],function(){
            target.runAction(new lime.animation.Spawn(
                new lime.animation.FadeTo(1),
                new lime.animation.ScaleTo(1),
                new lime.animation.MoveTo(512,384)
            ));


            title.runAction(new lime.animation.FadeTo(0));
        });


    });

	// set current scene active
	director.replaceScene(pages[pagina]);

}


//this is required for outside access after code is compiled in ADVANCED_COMPILATIONS mode
goog.exportSymbol('test2.start', test2.start);
