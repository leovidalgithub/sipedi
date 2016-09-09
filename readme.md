# SIPEDI

## Sistema de Pedido a Empresas de Distribución
#### Order System to Distribution Companies

http://sipedi.herokuapp.com/<br />
https://dry-badlands-61893.herokuapp.com/<br />
https://git.heroku.com/dry-badlands-61893.git<br />
https://github.com/leovidalgithub/sipedi<br />

Es un sistema basado en compras periódicas regulares de clientes a sus proveedores. El proveedor debe alimentar el sistema con sus productos clasificados por categorías y finalmente configurar sus clientes, asignando a cada cliente los productos que cada uno maneja.
El cliente podrá loguearse cuando quiera e ir marcando los productos de su interés. Una vez que quiera hacer el pedido lo hará simplemente clicando el botón de demanda. Una vez recibido el pedido el proveedor procederá a efectuar el despacho de la mercancía y pondrá el botón de demanda en modo despacho con fecha y hora.
Los nodos conectados se mantienen actualizados entre ellos, mostrando así la información en tiempo real.
Actualmente se está desarrollando la funcionalidad para configuración de productos y clientes para los proveedores.

***

It is a based on regular periodic customer purchases system. The provider must supply the system with their products classified by categories and finally set their customers, assigning to each customer the products that they usually buy.
The client log-in at anytime and check-off items of its interest. Once it wants to place the order just click on demand button. When order is received the supplier shall make the clearance of goods and set the demand button in delivery-mode prompt date and time.
Nodes logged are connected among them showing information in real time .

Currently, the products and customers configuration are been developing.

### to run app:
**npm run start**<br />
**npm run dev** (dev mod)<br />
**npm run build:client:watch** (dev mod)<br />

### Login page
![alt text](docs/img/login.png "Login page")

### Main page
![alt text](docs/img/main_view.png "Main page")

###Tecnologías y librerías principales empleadas:
####Main used technologies & libraries:

server-side
>node 4.4.7<br />
>express 4.14.0<br />
>mongodb 2.2.9<br />
>mongoose 4.5.9<br />
>jsonwebtoken 7.1.9<br />
>mlab<br />

client-side
>angularJS 1.5.8<br />
>bootstrap 3.3.7<br />
>SASS<br />
>jQuery 2.2.4<br />
>angular ui Bootstrap (directives)<br />
>angular-jwt (JSON WEB TOKEN)<br />
>angular-moment 1.0.0-beta.6<br />

Develonment<br />
>browserify 13.1.0<br />
>watchify 3.7.0<br />
>prepros 5.10.2<br />
>github<br />
>heroku<br />

### Usuarios para pruebas - SiPEDi
#### Test users - SiPEDi

url: http://sipedi.herokuapp.com/

_clientes/clients
>gamito@yahoo.com (Ana Gamito - Bar Entertainment) password: 1234<br />
>arturo@gmail.com (Arturo Rubio - Drink & Fly) password: 1234<br />
>carl@gmail.com (Carl - Liquor Store ) password: 1234<br />
>angel@hotmail.com (Ángel San Nicolás Lobby Bar) password: 1234<br />
>anna@yahoo.es (Anna Vila - Manhattan Bar) password: 1234<br />
>david@gmail.com (David Monreal - Mochacino Coffee Bar) password: 1234<br />
>leo@leovidal.es (Leo Rdgz. - Bar De Bellota) password: 1234<br />

_proveedores/suppliers_
>vinolas@vinolas.es (PROVEEDOR Viñolas Teixidor) password: 1234<br />
>valero@valero.es (PROVEEDOR Valero Vallès) password: 1234<br />

### Desarrollado por:
#### Developed by:

>Leonardo Rdgz. Vidal
>   leo@leovidal.es
