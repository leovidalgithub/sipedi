function mainCtrlFn( $scope, mainService, $rootScope, $interval, $timeout ) {

	$scope.current  = {};
	$scope.alertMsg = {};
	$scope.genericLogo = "iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAABcVBMVEX////2aQg+pgrv4g/gIQ8MLdFqLWbeAADu4AAAAM32aAD2ZQD2YgAAKdH2XwA6pQAroQBmJWJkIGD1WQAAItDfFgBlImEADs4AGs9aAFUAI9Db3fUengD59L39++gADM7w8fvBxe+epOfvop/88fDy51NhGF3w4yr17o/KzfH+/PDnaWP42Nf2z87wqab063wsQdT8+d7275nzvrz48q3z6WZcadri7990ft6us+r65eR+h+A5S9XytbPqgX37+NX69sj7vqa/3bfiPTPf7tzvpaKTmuR4umK+qrXkVE1QXti31631ciiEv3G4vO3x5kaUyIWqkaaNZ4fk5vj418nLvcqlzJbh2d9zPm8bNdLoc21ps07hLiHtlJD0f0lbsD5ZZtr2jWOdfpe3pLdrdt1RrC98TnmFYIqnkrHQ5sqJkeOt06KczI9EVNfXzdejh533rJX3jl75nXbkT0e9s875xrNzR371ciZPAEn3r5l+W4yRdlItAAAT40lEQVR4nO2c918TSxeHQyS9F0gCQQKEAFERxQIBUSxgAaUooCgq2LCgci/3vr5//btTNluyM3tmdjfo+8n3B29I2zz3nDltJvH5Ouqoo4466qijjjrqiKh6/sKNkZGFF+eIXiyMjNyYbjRO+2O5oeqFyVfn7oSIejTRe+6cW5i8UD3tDymr6vS9cy8JVzdLhLXn3Mifhzn96i/00ZloJlD03Fen/Znhakw+QJYD0hHAB5N/zKJsjNyB247y3bn35/joPVG87lBo4bzhLapPf/36XYEvPBDF6w51G1Zf49fbXC4Zj+d+Pj0tCI7uvRTFU/gmdW9w8jaejMe6sGLJrl+nRmKp6oKw+bpDPTe0Nzj5mUvGol2aovHc8e/jrI0FYTwlvmj+ef5YwetqUSx3/HsE2KoEX3foRdNAJys5CzzK+PY3YJTi627Gz8VYMsrgo3Y8ZV8dkeDTOehJLs7jI4w/TpHvgmINcQO+VD3vRAmZAMXjJ6fEV30gwaesQPryxgrXP3WKJvdOZTlOSjio4qHT9OXHOSAfcdX2p8fqHRkD9qge+jQWh/Mhtd2MUgbsDj2gLxcyoGrGxXYCnpMxYHMJNv4VNKBqxrYljvNSBuxWk8SJuAGpGZNtKshHpAzYHRohLz/OyfEpirYnN8p5aLcaRPekPFRVcs9zPrkYqgCSRqL6L6sGBSoW83oxLkgCkk6wGnMIiDzV48XoaA02bKtQEKKnRdy0XJpYIIDQMs1GnhY4L6QS/TkC6IYFsZLH3hFKlWp38EurLlnQW8QLUt0EiX6uWRAjvnUf7gD980qmH7yAX7/iOIoaEV234ndM+FJiYkHC6FtHib4NiAf/2Vb+rYqbsOcv/PpfoG7+FBH/LtXQfyRyBVmE5+VrUQ6ii0njqJT5gP4rvgxJNepmGNXJvdS/XQr2fkI3Hoguwx7S8v50N8poiG4VcNlgsPYM3RCOM8RHF91fhETRnDtl+E5GIZQKNKTernqxCClizA3AfcWEwRL6nyWa73te4jdwORMaFHOhXzwoBREhunlDkDCEZ/cnXvkoVtJx17+NAUkoXRBbhzTMyE5lgHIcbTJBTLiBbgs2FiE84Tx2u5gxKZp0Fm02ejFh7z76QyxZ9OCeycMwQ+VsKf6NfTQYzOJ0eEeIkJjwrYdhhirpYFRcrQUpIa67xUyIx78Nz02oKCc/8N/IUMLa3+hPoVBKAmkbTKgsRWk/fUZ9VC1pRAhJT9EWEzpIGaqPUkKhkoaU3G0xYZe0n9I4KkfYg97B+0BKJRdPj5o+qhAeCRKSXZgfHudCTUmZRioYdEKI3abL23JGp2hSHPB+TU8o6KVkgPjU04rUqLh4sCkFzYQCsZS0TdJxJhqNxWJxIuVWFOIKwq3ip6wjQnw5CRNGY/FkMhdb2Ts+/rGI9OP4+OdKFz6xyP//FRMcTFUMJqQ1DdxJcVch2DYhuNy/x4tPrSJ/4+nij5+Ik21OwYyx32skXEd3gutSEklFnBSZToGz+VSNk+Muy0N++C2ExuBVowlFewtSsYGTYSye2/sFtUDj5GfSGlLIiN+zRkLSH4I74BB6NjCSRhW8RcEo8fStlSVFjGg2YTD4D7r7FZCQtBXHECeNJbt+mPDqlwYuj18dHQsTjY1evXh54Gbd9BFP9lrPbAoYcT1rJsRzmklgMCW5YsU+xsdye4alVx8YHz1DycJnqNS/n1wcuKR/cuPYfLBRIJzWzIDBUsUHn7WRZWjrpKZzzgMXz+jBWoQxr17RG/NH3DhMB+fEg1ZCobINtAwNZ2PrV0Z5cAbMsfGz2kc9MeSPOHQn40OmlfA+egC2DklryK+6DXwDT2B4GuRlDXIxqV0IOiDebokzarqADdt68LkE3l5FNKedNDx7UQSvCXl1oPl5j7WYA2wxNlpNGBTZeyKHgzh9Rbyr+UFuPRHGUyHPXFHfpLGnLkdgn2hhQsVN0SOwUEO2tZn5PpprhjxpPgKpMS6q6REUa561xhkUTNHWDKz2xr1hgxVo4lE1Qdwcc8JnZKzukeuBYo1FnAmqtfdfkIWIQymr7G4a8OyoUz7CeIu+HznTGe2yB6xYOmkw8xE9CFqIeMdp0TKUaie2xt3gw4yjNEM2VtAlAXWNobfXuyl6ELIQSX9vmSziK3SZ3DzjEh9CDKuu+jYJ6vWtnZTmfEhGJFWpVevUPOZz0T0+zPiEpsfFXNQ+JbYW3epC/I4eBrQXJB3utRKqB3wvjbkLiMxIs+PTZNTWTf9mOKmyEoFuStrf1rpbXYJX3FqBBsar5M0bcdszKFbpni5EYL4gnYU5HTYPvl71gA8hnqEBp2vFhpDlpOokw95NLQlVwLrrHtpEDN8iBHF+0t9mOqmCiN3A1ohWhOrquOSFhzYZaUzlT3sOWnpfTSSa2iZ9UpYaCKNJAnjL2Nu6jjhu46BI/2UuQ7W/sD2QYWFD6qI3n4xevTr6ZOxM2CPS8EV7Qo6T0kM1trGmldDiuMSlgSvjo+5jqiGVrSMuIalN79kgthCyD9jVb10edZfS1oqskk1F9AGMSI7MasMFuw3am+NCLb5DRNOo2yyyfWHzpRLyIyV7KiGkKQWPaSCI/HDzDyfQKMrsAIxIqzZKCGlnMORlx92iiniFdx12vtcbkf/lNeM8WGDT69JFdxjV1G8lXr7XG5F7oJ10T/Swl9hpnvplVxjDZ5lXYJfdTSPicMo/740PKZxgwjhkK+Hwi+4PN+ry8GXmtT5xKhoqEk65u1DaQBi4CP3l3UduMnLiqU0oxYS4/uZWp9okCngy8rCcSqdX7zb/djrhCI8yL8Xq7/UihQ0v2JDDQjmBnZLllN+fSr+/rf59dtQhIvNKdqEUiYykePvBpKj5NxqNAwF918t+P2L0N511wJEZmYTMCYbRiDhjcPxUHdQIxNHVlJ8wppp2dNIpM4Op1YaFFSJ+MrvHIAfYF5N2zbZOdWxEYsdDep8DMzIzIr/u1vwUb3n7zjH9lARToW31tZRfZSwvX6fYT2QRwwOMy1jP81l+6utmIZKNC6HDdNdVI2LGLXrvuCQis3Cz6Sx0iBX0dOZSDN1DD4udPlhOaYj+9HtqxluSG1OslM8bYRj9FO+1MUeL5Ay7mO6mdYSKGWmdc1ZqMTJTPpgwWMMDDWa0CYkT+t7rjaiYcZfeLzOcY7b65lM0PD/F9Slrp4Z+MVZIjwxGVMzop0WORPZnEgKKNg0RD94Y3XBI5pc6TYSKp9L8L54Zw09YhICiTXPUCgfxpQThcsqE6C+vSSIyCdkTfQtlalU2YkjiZPmh2YjKYlyWQ3SHUO2GLRFdcVOE+FoK0R0vDQZ7/yEvsww3EoStbqosRoooFm7cIgz2UitaJI3QecY1OLptYcQmolAFxyYUiKUGK7b+cBQZuAmqbEHoT73Hj9WFCFktsEA+pMoEK/iVrb88JJP0dy3cVEEkuf+SACKTEF7TaIi92+S15ngTmmRchKMtKzdVws0qfnRA4Oib86pNJ5r6fdNGT+2RSIkW+YIgkrwIP9/AJAT3FkZEUsCZfyiy+QOJAmIQ+suk8wdHG2ZvAe0PTapt0Nff0JuR/uQHVBPon9eWCxEh4m4KHG2Y/SGwx29RNkgXo++FjlEoYWw+R/+usQhTfvws6FJkTjFgkygLZUr36Vuc14JqzwPGZaz0sID+tcyIBJHUb8DEH77Juo4soeKpH9SWfrpHtaNADzUxGKn42KEGRRvcaAD9lL1xIU+oM6Nvmv52Of0FLIgCicIQ+q9lzqdLEZ+XuQJCZE+EITNvjhnV1eibvoMZQzeYVzLqczFQHEY32DZUyzdQPGUTihamZjPuN6dP5/GPtPfAAPsjgUDfDLrFDKbIT/HoBlLacPYtWr9JIqasmhuRbjwIhWDV6VQiEEh8Q7dWOYT+NPZTQCPF2XuSTIg61bI6xurkX5CMMVMMKIQ4XXzlEaZw9QYINpz9Q1/QkZsSxtK62KR0SPFRRRF02zyOMgUbPJuyL95429zSGVGvbGl/m30JsyoEMIDTBTsh6oKNPSF7lxu8OWOj3tLOfc5FDJpPEMLBTR83IeKViHdtbI3IDqVIz1xBDGZqpY/PIIDvigQwUOi3J6TdsA0hJ5S6iYghNw7s3HV4MKAnvMsnhBmRF2iw7ruFiCFr+zxKGmUw4QSAkBjRJicy99a8QFTUm62VPuzff2bFOaEBBnDZdt2G0J/G4ZRfgIfN3zdtlWuOqirTW6sp5tz5sLG/v/7p0zqNtZv5RMBoQ1tC0mNwu6jwmC2gB4gqaaa3N6vYlMSgzaIOEEhIC3AuIf904lA//s92zXnqZ2LWti0AYetQcVO8P8zbHLZbhhGCWA2Kzk6hyu5UrQBhsVRx0xR6MS/W2C3Da5EJcmOj5gmgOtTpLxgBoYQ0YbD3TW2X4Wyh8JjcOvBgMWbU5uNxxAQIqmmwEfFo8TKb0C4bKmViZInc3A46bKZalN2hOWOpEDALUJdSI6I3uMkmvGQNpklp1grv6O19d81Y2qfv+64VMIBHUfzeQu+mbEI7QN+sUigWpyrkj6NgzTW+WpBOxyvzxVbAxBR6iDlObHFTVuUG+FZJBVWKCXUx+tZL7uSNTGmdvuNQyxLEhG/QY1ZbiC2EuHJjJX1u50Q1hT9AZEYl3nCBMVP6SL3C927Qgi8QyM+hB3lzmqbwAJzR6oMKmlniQ/lEP71j+4NDxkypOYbrf563BAwUZ9HDnGmiJjI6lYykWLQcTjTN6DtywqjwHalvNGfpoTjQwIo27KZ4XmM9kQJU3Yre9ameExhS79veKMmljmxpo8n3uM8ixFDZzbz1hHgTw3I2bNf8Uk00V0picH5Tvbe6nhUuVjO17Hqza+r/NsgyoHKlBHrKFxChv4yea1m42beGRPPaJ1FctdK8/9lGSQAS9fjaIKMyw3RQpL5r6EnccakmTkaEAfqG9c6Uj8xpjBgya0+ZUVqkjfvaVLHyOcKIMFRkqP8eSIin32OycQbJWHLkIzP9ugeP1ndqPMqM0ux++H6ke8XmOxs+pSpFV6iDQqma8y0afVicQfps+kD5yMMhwxO2DzaCpZICms1k6K9FZzJKb1srlXY2Do4Mzx16GOmzxtITomfCAo16OqO1qoF8hZSqEjF/gkShb2nT9Kzto2fr3zc+7uygE2AfPm58X79/ZJ7GVJYC5jbJSn24EobUbJgQ94it7QWknlE11+pViXzk23AF/haKNofnI3kAn+AypO1FS91m/xVZnVqNiCGLkfmlCeBbTCzNR4ogvADNhtBlqBCiuq2lgbLvm/SaYYSGRL5QfDg8UbGhG75WKMCsR971IXoVMBv66UzxbNiBCVlGVE1ZiDy/NjzUb16Yil/2Dy2964sUivaxRS/ipNaHviwJUUI0194iqxDJHE7NlH3FYmEwEpi6NjMz8/nz3NzMzMOpqchgoZjvg9tOFXZSWNlNCHHtbSQUCKRU1k2OGTTRl6fqSyTE0YhIQQPp71XCLxaE4FyoatZi0uCRSLsN6g2ZhPByRtNzWZOIKpFHl4N1TpRwq5VQHNCwbeKp8p/R5bhb+JaEBkBgU2HUNbGAKK0IjslpEUKzlwL7QrN4GcNF5fEoATIpZXupaKZQ1Z5gg4fd8IrNyoYyYYboWxv8lBTd0LaCEhrzIWjAZq1KG4xIVqFAqkCEt42EQgWpUbOgvO9EZBXehdczmBBVbc26lP9TH3Z6Y9ecO1WhIm5C0luooyjJONqUdCkGUxHvc4mtQrrVrX6DVrxcM6rf05RBzuuJmpB0wHRgyjvEBtOwl9GGbDgL1NxYZG+G7OWDfsHMRte8W4p5slEpUs5gQnzkBI/1md/hEtKUV0uRDLqhc2Ad4Vf0MjQvDUNHwHxVJHpakIiPCmYKvz4dylZrZnkUbYq4p/D5RU1IkgVKh+zvVYhqyAvExDx+7zXBMOOnOzMDYYep3qhZDxAHK+idD4V9lAaa8bB8vW2lJdfLN3oyKSXso7R3GhMfPfE153JajOBdbYEJoo6QbK65DOg2YoFEma/ii1Cd6YvNf9uOWCSpXmIRqsvQtShqQHRtLRbxgFRovKYz4W2bz+lASy5FVApYF8+ESOXr3hG6lDQooESqR1J/gsAjWZ/YkgMUbZmo0o/4H9Gp+gNOh1ODM44ASUHjpSpTzpqpyDB5H5lEiE247DUh8+gdSIlBeuJB1oJpb1ch1az0Ysw/p5uqQvNfTany13YAKosxIeepg/Ts8XW5KOpPpQ/5H8xFvZHw1AQtRX2HEtU2Uvq1w6makGYFd+qVSvQb9dAvZbk8WP7C/0hua/ObUJnaV6AG9K1KlWraDw22UbOAw1xNB31TIS+6/l4KMJVuU4gxqvIGFlQThXn1mNEjKQ9NpXfbb0CiiQT70K/G91w99VfflWsmUh52E7YaHrQ5d1MIqN9rkAwxbcuBTM1wzo7mI9+apzbvSq3AVHm1nSnCWhUGY6JYnNNO3q7KGDBVXr7LuXL7tDnXwpgoRh4+1p7xVZLvtAJMqyqfC9pJy0S+MPhwtqI9ulUWd9BUOr32+/BhDT8f7EMH+gqR+c/6I9P1tbQMX+q044uVJq5FpmaG+w333V0W989Uurx7mvlBQPUvKdGtQX8qVfZv2b/176D6o92y8Nan4tBff7PVx9Dh2mtRvJTinK+//Bl4iuqHa+/T6RSwEVTg0uX3a+1rb11S/XBrOVW24cRwqeWtPySyWOnwy9quX+FMY1RN+J5yendt6/CP8Uye6ndvP9r6urq8vLv7end3eXn169ajw/8PtI466qijjjrqqKOOXNH/ADhxfvy8jkkiAAAAAElFTkSuQmCC";

	(function () { // main Init
		getUsers( function () {
			$scope.current.supplier = $scope.users.find( function( user ) { return user.admin === true }); //$scope.currentIndex.supplier = $scope.users.map( function( user ) {	return user.admin }).indexOf( true );

			if ( $rootScope.credentials.admin ) { // supplier logged
				$scope.selectedClientModel = $scope.users[0].admin ? $scope.users[1] : $scope.users[0];
				$scope.current.user = $scope.users.find( function( user ) { return user._id === $scope.selectedClientModel._id });
			} else { // client logged
				$scope.current.user = $scope.users.find( function( user ) { return user._id === $rootScope.credentials._id });
			}
		});
	})();

	function getUsers( callBack ) {
		mainService.getUsersBySupplier()
			.then( function( data ) {
					$scope.users = data.data;
					if( typeof( callBack ) === 'function' ) callBack();
		})
	}

	$scope.clientChanged = function() {
		$scope.current.user = $scope.users.find( function( user ) { return user._id === $scope.selectedClientModel._id }) || null;
	}

	$scope.demandButton = function() {
		$scope.current.user.demandDate = Date.now(); // set new Date

		if ( $scope.current.user.demandState === 0 ) { // set new State
			$scope.current.user.demandState = 1
		} else if ( $scope.current.user.demandState === 1 ) {
			if ( $rootScope.credentials.admin ) {
				$scope.current.user.demandState = 2
			} else {
				$scope.current.user.demandState = 0
			}
		} else {
			$scope.current.user.demandState = 0
		}
		var data = {	clientID    : $scope.current.user._id,
						demandState : $scope.current.user.demandState,
						demandDate  : $scope.current.user.demandDate
					 };
		mainService.setUserDemand( data )
			.then( function( data ) {
				console.log( 'demand state updated' );
				$scope.showSuccessAlert( 'Información de pedido enviada.' );
			})
			.catch( function ( data ) {
				$scope.showErrorAlert( 'Error al intentar guardar el estado del Pedido.' );
			});
	}

	$scope.$watch( 'current.user', function( newUser, oldValue ) {
		if ( angular.isDefined( newUser ) ) {
			$scope.$broadcast( 'refreshProducts', $scope.current.user._id );
		}
	});

	$scope.showErrorAlert = function ( msg ) {
		$scope.alertMsg.error = msg;
		showAlert( '.errorAlert', 6000 );
	}

	$scope.showSuccessAlert = function ( msg ) {
		$scope.alertMsg.success = msg;
		showAlert( '.successAlert', 2000 );
	}

	function showAlert ( alertType, time ) {
		$( '#main ' + alertType ).collapse( 'show' );
		$timeout( function() {
			$scope.closesAlert();
		}, time);
	};

	$scope.closesAlert = function() {
		$( '#main .closeAlert' ).collapse( 'hide' );
	}

// var stop = $interval(function() {
// 		}, 3000, 555);
// $scope.fn1 = function() {$scope.showErrorAlert( 'Error al intentar guardar el estado del Pedido.' );};
// $scope.fn2 = function() { console.log($scope.current.supplier)};

}

mainCtrlFn.$inject = [ '$scope', 'mainService', '$rootScope', '$interval', '$timeout' ];
module.exports = mainCtrlFn;
