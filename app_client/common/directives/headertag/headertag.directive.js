function headerTagDirectiveFn () {
  return {
  restrict: 'EA',
  templateUrl: 'common/directives/headertag/headertag.template.html',
  controller: 'headerTagCtrl'
  }
}

headerTagDirectiveFn.$inject = [];
module.exports = headerTagDirectiveFn;
