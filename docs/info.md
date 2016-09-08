
// "start": "NODE_ENV=development nodemon server.js"
//
//npm run build:client:watch
//npm run start

**images file upload**
```js
server.js
// var multer = require('multer');
// app.use(multer({dest:__dirname+'/uploads/'}).any());
-----------------------------------------------------------------
api.handler.js
// module.exports.saveImg = function( req, res ) {
//  // console.log(req.files);
//  var imgPath = './app_api/routes/handlers/logos/mochacino_bar.jpg';
//  User.findById( '57cecd84d1d5214025d052e1', function ( err, user ) {
//      user.logo.data = fs.readFileSync( imgPath );
//      user.logo.contentType = 'image/png';
//      user.save()
//      .then( function( data ) {
//          console.log( data );
//      });
//  })
// }

// module.exports.getImg = function( req, res ) {
//  User.findById( '57cecd84d1d5214025d052d9', function ( err, user ) {
//      console.log( user.logo.contentType );
//      res.contentType(user.logo.contentType);
//      var base64 = (user.logo.data.toString('base64'));
//      res.send(base64);
//      // res.send(user.logo.data);
//  })
// }
------------------------------------------------------------------------------
api.router.js
// apiRouter.post( '/saveImg/',   apiHandler.saveImg );
// apiRouter.get( '/img/',   apiHandler.getImg );
------------------------------------------------------------------------------
``` 

```js
module.exports.addProductsClient = function( req, res ) {
    var clientId = '57c943e237f93d2861c97085';
    var client1 = {
        _id : clientId,
        quantity : 4,
        productOrdered : false
    };
    Product.findById( '57c74a0bb276c6201f8d2b53' )
        .then( function( data ) {
            var a = data.clients.filter( function( el ) {
                return el._id == clientId
            });
            if (a.length == 0) {
                data.clients.push( client1 );
                data.save();
            } 
        })
    // User.findOne( name : 'deedwdweew' )
    // .exec(function (err, user ){
 //        user.movies.push('deded')
 //        user.save()
    // })
    //  .then( function( data ) {
    //      var a = data.clients.filter( function( el ) {
    //          return el._id == clientId
    //      });
    //      if (a.length == 0) {
    //          data.clients.push( client1 );
    //          data.save();
    //      } 
    //  })
    res.end()
}
```

```js
     function initializeClientsSelect() {
      $('.selectpicker').selectpicker({
          style: 'btn-primary',
          showIcon: true,
          title: 'Mis clientes',
          'font-size' : '23'
      });
      $('select').selectpicker('refresh')
     }
```

