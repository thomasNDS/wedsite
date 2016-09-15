'use strict'

//////////////////////////////////////CONTROLLER///////////////////////////////
function MainCtrl($interval, $routeParams, $scope) {

	// Functions ********************************************************************
	/** */
    this.updateCountDown = function(dateNow){
	
		var dateNow = new Date()
		
		if (dateNow.getMilliseconds() > self.wedDate.getMilliseconds()) {
	
			self.monthCd = self.wedDate.getMonth() - dateNow.getMonth()
			self.dayCd = self.wedDate.getDay() - dateNow.getDay()
			self.hourCd = self.wedDate.getHours() - dateNow.getHours()
			self.minCd = self.wedDate.getMinutes() - dateNow.getMinutes()
			self.secCd = self.wedDate.getSeconds() - dateNow.getSeconds()
	
			if (self.secCd<0) {
				self.secCd+=60
				self.minCd--
			}
			
			if (self.minCd<0) {
				self.minCd+=60
				self.hourCd--
			}
			
			if (self.hourCd<0) {
				self.hourCd+=24
				self.dayCd--
			}
			
			if (self.dayCd<0) {
				self.dayCd+=dateNow.monthDays()
				self.monthCd--
			}
			
			if (self.monthCd<0) {
				self.monthCd+=12
			}
		}
    }
	
	/** */
	this.addCSSRule =function(sheet, selector, rules, index) {
	
		if("insertRule" in sheet) {
			sheet.insertRule(selector + "{" + rules + "}", index);
		}
		else if("addRule" in sheet) {
			sheet.addRule(selector, rules, index);
		}
	}

	/** */
    this.switchLangToKl = function(){
		console.log("switchLangToKl")
		self.switchLang('fr')
		this.addCSSRule(self.sheet, ".fr,.cv", 'font-family: "klingon", sans-serif;', 0);
    }
	
		/** */
    this.switchLangToEl = function(){
		console.log("switchLangToEl")
		self.switchLang('fr')
		this.addCSSRule(self.sheet, ".fr,.cv", 'font-family: "elfique", sans-serif;', 0);
    }
	
	/** */
    this.switchLang = function(lang){
		console.log(lang)
		self.currentLang = lang
		if (self.sheet.rules && self.sheet.rules.length > 0) {
			self.sheet.deleteRule(0)
		}
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
		
	// Attributes
	
	this.sheet = (function() {
			var style = document.createElement("style");
			style.appendChild(document.createTextNode(""));
			document.head.appendChild(style);
			return style.sheet;
		})();
		
	this.test = "HOHO"
	this.currentLang = "FR"
	this.wedDate = new Date(2017, 1-1, 21, 14, 30, 0, 42)
	this.langs = ["fr", "pt", "cr", "br", "en", "esp"]
	var self = this
	
	self.monthCd = 0
	self.dayCd = 0
	self.hourCd = 0
	self.minCd = 0
	self.secCd = 0
	
	self.lvl = 1
	
	// Init
	console.log("INIT")
	this.updateCountDown()
	$interval(this.updateCountDown, 1000);
		  
	$scope.$on('$routeChangeSuccess', function() {
		var key = $routeParams.key
		
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
		console.log($routeParams.key);
		console.log($routeParams);
	});
		  
}
MainCtrl.$inject = ['$interval',  '$routeParams', '$scope']

////////////////////////////////// APP DEFINITION ///////////////////////////////

var app = angular
    .module('MyPage', ['ngRoute'])
    .controller('MainCtrl', MainCtrl);
	
app.config(function($routeProvider, $locationProvider) {
		
	$routeProvider
		.when("/:key", { })

});
	
////////////////////////////////// PROTO HELPER ///////////////////////////////

/** */
Date.prototype.monthDays= function(){
    var d= new Date(this.getFullYear(), this.getMonth()+1, 0);
    return d.getDate();
}