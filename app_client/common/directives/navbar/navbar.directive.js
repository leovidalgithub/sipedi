function navbarDirective () {
	return {
		restrict: 'EA',
		scope : true,
		templateUrl: 'common/directives/navbar/navbar.template.html',
		controller: 'navbarCtrl'
	};
}

navbarDirective.$inject = [];
module.exports = navbarDirective;
