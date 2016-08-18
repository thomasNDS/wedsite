'use strict'

//////////////////////////////////////CONTROLLER///////////////////////////////
function MainCtrl() {
	
	this.test = "HOHO"
	this.currentLang= "FR"
	this.langs = ["fr", "pt", "cr", "br", "en", "kl"]
	var self = this
	
	/** */
    this.switchLang = function(lang){
		console.log(lang)
		self.currentLang = lang
		
		this.hideAllLang()
		this.showLang(lang)
    }
	
	/** */
	this.hideAllLang = function() {
		[].forEach.call(self.langs, function(lang) {
		   var els = document.getElementsByClassName(lang);
		   [].forEach.call(els, function(el) {el.style.display = 'none' });
		})
	}
	
	/** */
	this.showLang = function(lang) {
	   var els = document.getElementsByClassName(lang);
	   [].forEach.call(els, function(el) {el.style.display = 'block' });
	}
	
}
MainCtrl.$inject = []

////////////////////////////////// APP DEFINITION ///////////////////////////////
angular
    .module('MyPage', [])
    .controller('MainCtrl', MainCtrl);