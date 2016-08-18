'use strict'

//////////////////////////////////////CONTROLLER///////////////////////////////
function MainCtrl() {
	
	this.test = "HOHO"
	
    this.switchLang = function(lang){

    }
}
MainCtrl.$inject = []

////////////////////////////////// APP DEFINITION ///////////////////////////////
angular
    .module('MyPage', [])
    .controller('MainCtrl', MainCtrl);