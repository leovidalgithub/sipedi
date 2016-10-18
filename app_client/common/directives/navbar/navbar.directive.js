function navbarDirective () {
	return {
		restrict: 'EA',
		templateUrl: 'common/directives/navbar/navbar.template.html',
		controller: 'navbarCtrl'
	};
}

navbarDirective.$inject = [];
module.exports = navbarDirective;
