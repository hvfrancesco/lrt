//set main namespace
goog.provide('test2.page_1');

goog.require('lime.Scene');


test2.page_1 = function() {
	goog.base(this);
	this.scene = new lime.Scene();
	}

goog.inherits(test2.page_1, lime.Scene);
