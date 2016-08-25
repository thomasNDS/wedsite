'use strict'

//////////////////////////////////////CONTROLLER///////////////////////////////
function MainCtrl($interval) {

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
		
	// Attributes
	
	this.test = "HOHO"
	this.currentLang = "FR"
	this.wedDate = new Date(2017, 8-1, 24, 13, 0, 42, 42)
	this.langs = ["fr", "pt", "cr", "br", "en", "kl", "el"]
	var self = this
	
	self.monthCd = 0
	self.dayCd = 0
	self.hourCd = 0
	self.minCd = 0
	self.secCd = 0
	
	// Init
	this.updateCountDown()
	 $interval(this.updateCountDown, 1000);
	
}
MainCtrl.$inject = ['$interval']

////////////////////////////////// APP DEFINITION ///////////////////////////////
angular
    .module('MyPage', [])
    .controller('MainCtrl', MainCtrl);
	
Date.prototype.monthDays= function(){
    var d= new Date(this.getFullYear(), this.getMonth()+1, 0);
    return d.getDate();
}