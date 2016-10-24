function sideMenuDirective () {
	return {
		restrict: 'E',
		scope : true,
		templateUrl: 'common/directives/sidemenu/sidemenu.template.html',
		controller: 'sidemenuCtrl'
	};
}

sideMenuDirective.$inject = [];
module.exports = sideMenuDirective;
