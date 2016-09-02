//opción original

var arrProducts = [];
arrProducts[23] = { productName: 'Pepsi', deparCode: 13, stock: true };
arrProducts[3] = { productName: 'Coke', deparCode: 13, stock: false };
arrProducts[5] = { productName: 'Kitkat', deparCode: 2, stock: false };
arrProducts[12] = { productName: 'Jamón', deparCode: 7, stock: true };
arrProducts[20] = { productName: 'Servilletas', deparCode: 8, stock: true };


// opción 2
var arrProducts = [
	{ productCode: 23, productName: 'Pepsi', deparCode: 13, stock: true },
	{ productCode: 3, productName: 'Kitkat', deparCode: 2, stock: false },
	{ productCode: 12, productName: 'Coke', deparCode: 13, stock: false },
	{ productCode: 5, productName: 'Jamón', deparCode: 7, stock: true },
	{ productCode: 20, productName: 'Servilletas', deparCode: 8, stock: true }
];

// opción juanma
var arrProducts = {
	"23" : { productName: 'Pepsi', deparCode: 13, stock: true },
	"3" : { productName: 'Kitkat', deparCode: 2, stock: false },
	"12" : { productName: 'Coke', deparCode: 13, stock: false }
}
//output
arrProducts["3"]
arrProducts["3"].productName


	
//función para ordenar por productName
function sortingFunction ( a, b ) {
	if ( a.productName > b.productName ) {
		return 1;
	} else if ( a.productName < b.productName ) {
		return -1;		
	} else {
		return 0;
	}
}

arrProducts.sort(sortingFunction);

//----------------------------------------------------------------------
//para que me devuelva el elemento según el código enviado
function getProductByCode ( code ) {
	return arrProducts.filter( function( e ) {
	   return e.productCode == code;
	});
}

//forEach
arrProducts.forEach( function( e ) { console.log( e.productName )} );



