'use strict'

//////////////////////////////////////CONTROLLER///////////////////////////////
function MainCtrl($interval, $routeParams, $scope) {

	// Functions ********************************************************************
	
	/** */
    this.updateCountDown = function(dateNow){
	
		var dateNow = new Date()
		
		if (dateNow.getMilliseconds() > self.wedDate.getMilliseconds()) {
	
			self.monthCd = self.wedDate.getMonth() - dateNow.getMonth()
			self.dayCd = self.wedDate.getDate() - dateNow.getDate()
			self.hourCd = self.wedDate.getHours() - dateNow.getHours()
			self.minCd = self.wedDate.getMinutes() - dateNow.getMinutes()
			self.secCd = self.wedDate.getSeconds() - dateNow.getSeconds()
			
			if (self.monthCd<0) {
				self.monthCd+=12
			}
			
			if (self.dayCd<0) {
				self.dayCd+=dateNow.monthDays()
				self.monthCd--
			}
			
			if (self.hourCd<0) {
				self.hourCd+=24
				self.dayCd--
			}
	
			if (self.minCd<0) {
				self.minCd+=60
				self.hourCd--
			}
			
			if (self.secCd<0) {
				self.secCd+=60
				self.minCd--
			}

		}
    }
	
	/** */
	this.addCSSRule = function(sheet, selector, rules, index) {
	
		if("insertRule" in sheet) {
			sheet.insertRule(selector + "{" + rules + "}", index);
		}
		else if("addRule" in sheet) {
			sheet.addRule(selector, rules, index);
		}
	}

	/** */
    this.switchLangToKl = function(){
		console.debug("switchLangToKl")
		self.switchLang('fr')
		this.addCSSRule(self.sheet, ".fr,.cv", 'font-family: "klingon", sans-serif;', 0);
		self.currentLang = 'KLING'
    }
	
	/** */
    this.switchLangToEl = function(){
		console.debug("switchLangToEl")
		self.switchLang('fr')
		this.addCSSRule(self.sheet, ".fr,.cv", 'font-family: "elfique", sans-serif;', 0);
		self.currentLang = 'ELFIQUE'
    }
	
	/** */
    this.switchLang = function(lang){
		console.debug(lang)
		console.debug(self.langs.indexOf(lang))
		
		if (lang) {
			if (lang == 'el') { // Elfique ?
				 self.switchLangToEl()
				 
			} else if (lang == 'kl') { // Klingon ?
				self.switchLangToKl()
				
			} else if (self.langs.indexOf(lang) > -1){ // other one included ?
			
				self.currentLang = lang
				
				if (self.sheet.rules && self.sheet.rules.length > 0) {
					self.sheet.deleteRule(0)
				}
				this.hideAllLang()
				this.showLang(lang)
				
			} // else --> default lang
		}
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
	   [].forEach.call(els, function(el) {el.style.display = 'inline-block' });
	}
		
	// Attributes ********************************************************************
	
	// DOM document
	this.sheet = (function() {
			var style = document.createElement("style");
			style.appendChild(document.createTextNode(""));
			document.head.appendChild(style);
			return style.sheet;
		})();
		
	var self = this
	
	self.currentLang = "fr"
	self.wedDate = new Date(2017, 1-1, 21, 14, 30, 0, 42)
	self.langs = ["fr", "pt", "cr", "br", "en", "esp"]

	// Countdown
	self.monthCd = 0 
	self.dayCd = 0 
	self.hourCd = 0
	self.minCd = 0
	self.secCd = 0
	
	self.here = 'true' //rsvp form
	self.serie = 'dora' // rsvp form
	self.lvl = 1 // accreditation lvl
	
	// Init
	this.updateCountDown()
	$interval(this.updateCountDown, 1000);
		  
	$scope.$on('$routeChangeSuccess', function() {
		var key = $routeParams.key
		var lang = $routeParams.lang

		if (key) {
			console.debug("key exist : " + key)
			
			if (key[0] === 'v') {
			 console.debug("lvl 1	: " + key)
			}
			if (key[0] === 'r') {
			 console.debug("lvl 2	: " + key)
			 self.lvl = 2
			}
		}
		console.debug($routeParams);
		
		if (lang) {
			console.debug("Lang detected : " + lang)
			self.switchLang(lang)
		}
		
	});
		 
}
MainCtrl.$inject = ['$interval',  '$routeParams', '$scope']

////////////////////////////////// APP DEFINITION ///////////////////////////////

var app = angular
    .module('MyPage', ['ngRoute'])
    .controller('MainCtrl', MainCtrl);

app.config(function($routeProvider, $locationProvider) {
		
	$routeProvider
		.when("/lang/:lang", { })
		.when("/lang/:lang/:key", { })
		.when("/:key", { })

});
	
////////////////////////////////// PROTO HELPER ///////////////////////////////

/** nb day in selected month. 
  * @return int [27-31]
  */
Date.prototype.monthDays= function(){
    var d= new Date(this.getFullYear(), this.getMonth()+1, 0);
    return d.getDate();
}