function sideMenuDirective () {
	return {
		restrict: 'EA',
		templateUrl: 'common/directives/sidemenu/sidemenu.template.html',
		controller: 'sidemenuCtrl'
	}
}

sideMenuDirective.$inject = [];
module.exports = sideMenuDirective;
