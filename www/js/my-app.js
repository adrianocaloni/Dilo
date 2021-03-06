  
// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

var app = new Framework7({
    // App root element
 
    root: '#app',
    // App Name
    name: 'My App',
    // App id
    id: 'com.myapp.test',
    // Enable swipe panel
    panel: {
      swipe: 'left',
    },
    // Add default routes
    routes: [
      {path: '/index/',url: 'index.html',},
      {path: '/perfil/',url: 'perfil.html',},
      {path: '/iniciarsesion/',url: 'iniciarsesion.html',},
      {path: '/panelcasa/',url: 'panelcasa.html',},
      {path: '/panelsalir/',url: 'panelsalir.html',},
      {path: '/panelEscuela/',url: 'panelEscuela.html',}, 
      {path: '/panelYo/',url: 'panelYo.html',}, 
      {path: '/recuperarpass/',url: 'recuperarpass.html',},
      {path: '/acercadilo/',url: 'acercadilo.html',},
      {path: '/crearcuenta/',url: 'crearcuenta.html',},
      {path: '/buscador/',url: 'buscador.html',},
      {path: '/indexUsuarioRegistrado/',url: 'indexUsuarioRegistrado.html',},
      {path: '/misrutinas/',url: 'misrutinas.html',},
      {path: '/panelUsuarioRegistrado/',url: 'panelUsuarioRegistrado.html',},
      {path: '/contacto/',url: 'contacto.html',},
      {path: '/crearRutina/',url: 'crearRutina.html', keepAlive:true,},
    ]    

  });

  //VARIABLES GLOBALES
clickEn=0;
clickEnRutina=0;
nombreLoginAct="";
apellidLoginActo="";
localidadLoginAct="";
emailUsuario="";




var mainView = app.views.create('.view-main');

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    console.log("Device is ready!");
});

// Option 1. Using one 'page:init' handler for all pages
$$(document).on('page:init', function (e) {

    console.log(e);
})

// PAGINA PRINCIPAL
$$(document).on('page:init', '.page[data-name="index"]', function (e) {


  $$('#btnCasa').on('click',function(){
    app.views.main.router.navigate("/panelcasa/"); 
  })

  $$('#btnParque').on('click',function(){
    app.views.main.router.navigate("/panelsalir/"); 
  })

  $$('#btnEscuela').on('click',function(){
    app.views.main.router.navigate("/panelEscuela/"); 
  })

  $$('#btnYo').on('click',function(){
    app.views.main.router.navigate("/panelYo/"); 
  })


  $$('#irLogin').on('click', function(){
    app.views.main.router.navigate("/iniciarsesion/"); 
  })

  $$('#irWhatsApp').on('click',function(){
    app.views.main.router.navigate("/contacto/"); 
  })

})

//PAGINA DE LOGIN
$$(document).on('page:init', '.page[data-name="iniciarsesion"]', function (e) {

  $$('#volverInicio').on('click',function(){
    app.views.main.router.navigate("/index/"); 
  })

  $$('#btnIS').on('click',function(){
   
    email = $$('#inicioEmail').val();
    password = $$('#inicioPassword').val();
    
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        emailUsuario =email;
        var user = userCredential.user;
        $$('#msgBienvenida').value("Bienvenido" + nombreLoginAct);
        app.views.main.router.navigate("/indexUsuarioRegistrado/");
        // ...
      })
      .catch(function(error){
        //Handle Errors here.
    console.error(error.code);
      if(error.code == "auth/wrong-password"){
        console.error('La contrase??a ingresada no es v??lida');
        $$('#mensajeAlert').html('La contrase??a ingresada no es v??lida');

      }
      else if (error.code == "auth/user-not-found"){
        console.error('El e-mail ingresado no existe');
        $$('#mensajeAlert').html('El e-mail ingresado no existe');

      }
      else if (error.code == "auth/too-many-requests"){
        console.error('El acceso a esta cuenta se ha desactivado temporalmente debido a muchos intentos fallidos de inicio de sesi??n. Puede restaurarlo inmediatamente restableciendo su contrase??a o puede intentarlo de nuevo m??s tarde.');
        $$('#mensajeAlert').html('El acceso a esta cuenta se ha desactivado temporalmente debido a muchos intentos fallidos de inicio de sesi??n. Puede restaurarlo inmediatamente restableciendo su contrase??a o puede intentarlo de nuevo m??s tarde.');

      }
      else if (error.code == "auth/invalid-email"){
        console.error('El e-mail ingresado no es un formato valido');
        $$('#mensajeAlert').html('El e-mail ingresado no es un formato valido');

      }        
    console.error(error.message); 
  })
  
  });
  //RECUPERAR CONTRASE??A
  $$('#olvidePass').on('click',function(){
    app.views.main.router.navigate("/recuperarpass/");
  })
  //INGRESAR SIN USUARIO
  $$('#btnIngresar').on('click',function(){
    app.views.main.router.navigate("/iniciarsesion/"); 
  })
  //CREAR USUARIO
  $$('#btnReg').on('click',function(){
    app.views.main.router.navigate("/crearcuenta/"); 
  })

})


//CREAR CUENTA
  $$(document).on('page:init', '.page[data-name="crearcuenta"]', function (e) {

    $$('#btnAceptar').on('click',function(){

      email = $$('#regEmail').val();
      password = $$('#regPassword').val();
      console.log(email);
      console.log(password);
    
      firebase.auth().createUserWithEmailAndPassword(email,password)
        .then( function(){
                emailUsuario= email;
                nombre = $$('#regNombre').val();
                apellido = $$('#regApellido').val();
                celular = $$('#regCelTel').val();
                localidad = $$('#regLocalidad').val();
  
          db = firebase.firestore();
          var data = {
                nombre:nombre,
                apellido:apellido,
                celular:celular,
                localidad:localidad
          };
  
          miID=email;
          db.collection("Usuario").doc(miID).set(data)
          .then(function(docRef){ //No ingresa al .then
            console.log("Ok! Con el ID: "+ docRef.id);
            console.log("Ok! Con el Nombre: "+ docRef.nombre); 
          })
          .catch(function(error){
              console.log("Error: "+error);
          });
          app.views.main.router.navigate("/iniciarsesion/");
  
        })
      
        .catch(function(error){
              //Handle Errors here.
          console.error(error.code);
            if(error.code =="auth/email-already-in-use"){
              console.error('El email ingresado ya esta registrado');
              $$('#mensajeAlert').html('El e-email ingresado ya esta registrado');
  
            }
            else if (error.code == "auth/weak-password"){
              console.error('El email ingresado ya esta registrado');
              $$('#mensajeAlert').html('La contrase??a debe tener al menos 6 caracteres');
  
            }
            else if (error.code == "auth/invalid-email"){
              console.error('El formato del email ingresado no es valido');
              $$('#mensajeAlert').html('El formato del email ingresado no es valido');
  
            }
          console.error(error.message); 
        })
  
    })

})


// PANEL DE USUARIO REGISTRADO 
$$(document).on('page:init', '.page[data-name="indexUsuarioRegistrado"]', function (e) {
  db=firebase.firestore();
  var docRef = db.collection("Usuario").doc(email);

  docRef.get().then((doc) => {
      if (doc.exists) {
          console.log("Document data:", doc.data());

          nombreLoginAct=doc.data().nombre;  
          console.log(nombreLoginAct);
          $$('#msgBienvenida').html("Hola "+nombreLoginAct);

        
      } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
      }
  }).catch((error) => {
          console.log("Error getting document:", error);
  });



  $$('#salirApp').on('click',function(){  
    mainView.router.navigate('/iniciarsesion/');
    var logOut=firebase.firestore();
    logOut = () => {
      var user = firebase.auth().currentUser;
      if (user) {
          firebase.auth().signOut()
              .then(() => {
                  console.log('Cerrar sesi??n');
                  mainView.router.navigate('/index/');

              })
              .catch((error) => {
                  console.log('error '+error);
              });
      } else {
        console.log('Ya cerre sesion');
      }
    }
  })

  $$('#crearRutina').on('click', function(){

    mainView.router.navigate('/crearRutina/');
  })


    ////  ACTIVIDADES 
    let botonA = document.querySelector(".reproductorActividades")
    let audioEtiquetaA = document.querySelector("audio")
    
    botonA.addEventListener("click", () => {
      audioEtiquetaA.setAttribute("src", "sonido/actividades.mp3")
      audioEtiquetaA.play()
      console.log(`Reproduciendo: ${audioEtiquetaA.src}`)
      mainView.router.navigate('/panelUsuarioRegistrado/');
    })


    ////  PERFIL 
    let botonP = document.querySelector(".reproductorPerfil")
    let audioEtiquetaP = document.querySelector("audio")

    botonP.addEventListener("click", () => {
      audioEtiquetaP.setAttribute("src", "sonido/perfil.mp3")
      audioEtiquetaP.play()
      console.log(`Reproduciendo: ${audioEtiquetaP.src}`)
      mainView.router.navigate('/perfil/');

  })

 

  $$('#misRutinas').on('click', function(){

    mainView.router.navigate('/misrutinas/');
  })

 // CONSULTA A LA BASE DE DATOS Y SE TRAE DATOS DEL USUARIO REGISTRADO /////////////
  $$('#miPerfil').on('click', function(){

    mainView.router.navigate('/perfil/');
    db=firebase.firestore();
    var docRef = db.collection("Usuario").doc(email);
  
    docRef.get().then((doc) => {
        if (doc.exists) {
            console.log("Document data:", doc.data());
            nombreLoginAct=doc.data().nombre;
            apellidoLoginAct=doc.data().apellido;
            localidadLoginAct=doc.data().localidad;
        
            $$('#mensajeNombre').value(nombreLoginAct);
            $$('#mensajeApellido').value(apellidoLoginAct);
            $$('#mensajeLocalidad').value(localidadLoginAct);
          
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch((error) => {
            console.log("Error getting document:", error);
    });
  })
 

})  


//------------------------------PERFIL-----------------------------------//
$$(document).on('page:init', '.page[data-name="perfil"]', function (e) {
 console.log("PERFIL USUARIO");

})



//------------------------------PANEL USUARIO REGISTRADO-----------------------------------//
$$(document).on('page:init', '.page[data-name="panelUsuarioRegistrado"]', function (e) {
 
  console.log ("PANEL USUARIO REGISTRADO");

  $$('#btnCasaA').on('click',function(){
    app.views.main.router.navigate("/panelcasa/"); 
  })

  $$('#btnEscuelaA').on('click',function(){
    app.views.main.router.navigate("/panelEscuela/"); 
  })

  $$('#btnParqueE').on('click',function(){
    app.views.main.router.navigate("/panelsalir/"); 
  })
  
  $$('#btnYoO').on('click',function(){
    app.views.main.router.navigate("/panelYo/"); 
  })
 
 
 })

  //////////////////////////////////////////AGENDA////////////////////////////////////
  $$(document).on('page:init', '.page[data-name="crearRutina"]', function (e) {

    $$('#volver').on('click', function() {
    mainView.router.navigate('/misrutinas/');
  })
      //-----------------------buscar en ARASAAC----------------------//
        $$('#hacer1').on('click', function() {
          clickEn = 1;
          console.log("Hice click en 1");
          app.routes[5].keepAlive = true; 
                /* -------------------SUBIR FOTO --------------------*/
                $$('#subirFoto').on('click',function(){

                navigator.camera.getPicture(onSuccess, onFail, { quality: 50,
                destinationType: Camera.DestinationType.FILE_URI });
                
                function onSuccess(imageURI) {
                    var image = document.getElementById('img1');
                    image.src = imageURI;
                }
                
                function onFail(message) {
                    console.log('Failed because: ' + message);
                }
              })
        })
        $$('#hacer2').on('click', function() {
          clickEn = 2;
          console.log("Hice click en 2");
          app.routes[5].keepAlive = true;
                          /* -------------------SUBIR FOTO --------------------*/
                $$('#subirFoto').on('click',function(){

                navigator.camera.getPicture(onSuccess, onFail, { quality: 50,
                destinationType: Camera.DestinationType.FILE_URI });
                
                function onSuccess(imageURI) {
                    var image = document.getElementById('img2');
                    image.src = imageURI;
                }
                
                function onFail(message) {
                    console.log('Failed because: ' + message);
                }
              })
        })
        $$('#hacer3').on('click', function() {
          clickEn = 3;
          console.log("Hice click en 3");
          app.routes[5].keepAlive = true;
                /* -------------------SUBIR FOTO --------------------*/
                $$('#subirFoto').on('click',function(){

                  navigator.camera.getPicture(onSuccess, onFail, { quality: 50,
                  destinationType: Camera.DestinationType.FILE_URI });
                  
                  function onSuccess(imageURI) {
                      var image = document.getElementById('img3');
                      image.src = imageURI;
                  }
                  
                  function onFail(message) {
                      console.log('Failed because: ' + message);
                  }
                })
        })
        $$('#hacer4').on('click', function() {
          clickEn = 4;
          console.log("Hice click en 4");
          app.routes[5].keepAlive = true;
                /* -------------------SUBIR FOTO --------------------*/
                $$('#subirFoto').on('click',function(){

                  navigator.camera.getPicture(onSuccess, onFail, { quality: 50,
                  destinationType: Camera.DestinationType.FILE_URI });
                  
                  function onSuccess(imageURI) {
                      var image = document.getElementById('img4');
                      image.src = imageURI;
                  }
                  
                  function onFail(message) {
                      console.log('Failed because: ' + message);
                  }
                })
        })
        $$('#hacer5').on('click', function() {
          clickEn = 5;
          console.log("Hice click en 5");
          app.routes[5].keepAlive = true;
                /* -------------------SUBIR FOTO --------------------*/
                $$('#subirFoto').on('click',function(){

                  navigator.camera.getPicture(onSuccess, onFail, { quality: 50,
                  destinationType: Camera.DestinationType.FILE_URI });
                  
                  function onSuccess(imageURI) {
                      var image = document.getElementById('img5');
                      image.src = imageURI;
                  }
                  
                  function onFail(message) {
                      console.log('Failed because: ' + message);
                  }
                })
        })
        
        $$('#guardarDatos').on('click',function(){  
       
          nombreRutina = $$('#nombreagenda').val();
          tiempoRutinaID = clickEnRutina;
          imagen1 = $$('#img1').attr('src');
          imagen2 = $$('#img2').attr('src');
          imagen3 = $$('#img3').attr('src');
          imagen4 = $$('#img4').attr('src');
          imagen5 = $$('#img5').attr('src');

          var db = firebase.firestore ();
                var data = { 
                  nombreRutina:nombreRutina,
                  tiempoRutinaID :clickEnRutina,
                  imagen1:imagen1,
                  imagen2:imagen2,
                  imagen3:imagen3,
                  imagen4:imagen4,
                  imagen5:imagen5,
                  Usuario:emailUsuario
                };
                var miIDRutina = nombreRutina;
                db.collection("rutina").doc(miIDRutina).set(data)
                .then(function(docRef){
                console.log("OK! con el ID: " + docRef.id);
                })
                .catch (function(error) {
                console.log(error);
                });
                mainView.router.navigate('/misrutinas/');
        })
  
})


//-------------------------------TRAER DATOS DE LA BASE DE DATOS-------------------------//
  $$(document).on('page:init', '.page[data-name="misrutinas"]', function (e) {
    $$('#volverIndex').on('click', function(){

      mainView.router.navigate('/indexUsuarioRegistrado/');
    })

    console.log(emailUsuario);
    var db = firebase.firestore ();
    var rutinasRef = db.collection("rutina").where("Usuario", "==", emailUsuario);
    rutinasRef.get ()
  
    .then(function(querySnapshot){
      querySnapshot.forEach(function(doc){
        console.log("data: "+ doc.data().imagen1);
     

        for (i = 1; i <= doc.data().tiempoRutinaID; i++){

          if (doc.data().tiempoRutinaID === 1){
        
            $$('#tituloDeManiana').html(doc.data().nombreRutina);
            $$('#mostrarImagenBD11').attr('src',doc.data().imagen1);
            $$('#mostrarImagenBD12').attr('src',doc.data().imagen2);
            $$('#mostrarImagenBD13').attr('src',doc.data().imagen3);
            console.log("IMAGEN 4: "+ doc.data().imagen4);
            $$('#mostrarImagenBD14').attr('src',doc.data().imagen4);
            $$('#mostrarImagenBD15').attr('src',doc.data().imagen5);
            $$('#crearRutinaManiana').removeClass('visible').addClass('oculto');
            $$('#modificar'+1).removeClass('oculto').addClass('visible');
  
           } else if (doc.data().tiempoRutinaID === 2) {
           
            $$('#tituloDeMediaManiana').html(doc.data().nombreRutina);
            $$('#mostrarImagenBD16').attr('src',doc.data().imagen1);
            $$('#mostrarImagenBD17').attr('src',doc.data().imagen2);
            $$('#mostrarImagenBD18').attr('src',doc.data().imagen3);
            console.log("IMAGEN 4: "+ doc.data().imagen4);
            $$('#mostrarImagenBD19').attr('src',doc.data().imagen4);
            $$('#mostrarImagenBD20').attr('src',doc.data().imagen5);
            $$('#crearRutinaMeidaManiana').removeClass('visible').addClass('oculto');
            $$('#modificar'+2).removeClass('oculto').addClass('visible');
  
           } else if (doc.data().tiempoRutinaID === 3) {
             
            $$('#tituloDeMedioDia').html(doc.data().nombreRutina);
            $$('#mostrarImagenBD21').attr('src',doc.data().imagen1);
            $$('#mostrarImagenBD22').attr('src',doc.data().imagen2);
            $$('#mostrarImagenBD23').attr('src',doc.data().imagen3);
            console.log("IMAGEN 4: "+ doc.data().imagen4);
            $$('#mostrarImagenBD24').attr('src',doc.data().imagen4);
            $$('#mostrarImagenBD25').attr('src',doc.data().imagen5);
            $$('#crearRutinaMedioDia').removeClass('visible').addClass('oculto');
            $$('#modificar'+3).removeClass('oculto').addClass('visible');

          } else if (doc.data().tiempoRutinaID === 4) {
            $$('#tituloDeMediaTarde').html(doc.data().nombreRutina);
            $$('#mostrarImagenBD26').attr('src',doc.data().imagen1);
            $$('#mostrarImagenBD27').attr('src',doc.data().imagen2);
            $$('#mostrarImagenBD28').attr('src',doc.data().imagen3);
            console.log("IMAGEN 4: "+ doc.data().imagen4);
            $$('#mostrarImagenBD29').attr('src',doc.data().imagen4);
            $$('#mostrarImagenBD30').attr('src',doc.data().imagen5);
            $$('#crearRutinaMediaTarde').removeClass('visible').addClass('oculto');
            $$('#modificar'+4).removeClass('oculto').addClass('visible');

          }else if (doc.data().tiempoRutinaID === 5) {
            $$('#tituloDeTarde').html(doc.data().nombreRutina);
            $$('#mostrarImagenBD31').attr('src',doc.data().imagen1);
            $$('#mostrarImagenBD32').attr('src',doc.data().imagen2);
            $$('#mostrarImagenBD33').attr('src',doc.data().imagen3);
            console.log("IMAGEN 4: "+ doc.data().imagen4);
            $$('#mostrarImagenBD34').attr('src',doc.data().imagen4);
            $$('#mostrarImagenBD35').attr('src',doc.data().imagen5);
            $$('#crearRutinaTarde').removeClass('visible').addClass('oculto');
            $$('#modificar'+5).removeClass('oculto').addClass('visible');

          }else if (doc.data().tiempoRutinaID === 6) {
            $$('#tituloDeTardecita').html(doc.data().nombreRutina);
            $$('#mostrarImagenBD36').attr('src',doc.data().imagen1);
            $$('#mostrarImagenBD37').attr('src',doc.data().imagen2);
            $$('#mostrarImagenBD38').attr('src',doc.data().imagen3);
            console.log("IMAGEN 4: "+ doc.data().imagen4);
            $$('#mostrarImagenBD39').attr('src',doc.data().imagen4);
            $$('#mostrarImagenBD40').attr('src',doc.data().imagen5);
            $$('#crearRutinaTardecita').removeClass('visible').addClass('oculto');
            $$('#modificar'+6).removeClass('oculto').addClass('visible');

          }else if (doc.data().tiempoRutinaID === 7) {
            $$('#tituloDeNoce').html(doc.data().nombreRutina);
            $$('#mostrarImagenBD41').attr('src',doc.data().imagen1);
            $$('#mostrarImagenBD42').attr('src',doc.data().imagen2);
            $$('#mostrarImagenBD43').attr('src',doc.data().imagen3);
            $$('#mostrarImagenBD44').attr('src',doc.data().imagen4);
            $$('#mostrarImagenBD45').attr('src',doc.data().imagen5);
            $$('#crearRutinaNoche').removeClass('visible').addClass('oculto');
            $$('#modificar'+7).removeClass('oculto').addClass('visible');
          }
          
        }
        
      });
    })
    .catch(function(){
      console.log ("Error : ", error);
    });

    $$('#crearRutinaManiana').on('click', function(){ 
      clickEnRutina =1 ;
      console.log("Rutina de MA??ANA =", clickEnRutina);
      mainView.router.navigate('/crearRutina/')
      $$('#img1').attr('src')="img/agregar2.png";
      $$('#img2').attr('src')="img/agregar2.png";
      $$('#img3').attr('src')="img/agregar2.png";
      $$('#img4').attr('src')="img/agregar2.png";
      $$('#img5').attr('src')="img/agregar2.png";
          })


    $$('#crearRutinaMeidaManiana').on('click', function(){ 
      clickEnRutina =2 ;
      console.log("Rutina de MEDIA MA??ANA =", clickEnRutina);
      mainView.router.navigate('/crearRutina/');
          })
    
    $$('#crearRutinaMedioDia').on('click', function(){ 
      clickEnRutina =3 ;
      mainView.router.navigate('/crearRutina/');
          })


      $$('#crearRutinaMediaTarde').on('click', function(){ 
      clickEnRutina =4 ;
      mainView.router.navigate('/crearRutina/');
          })


    $$('#crearRutinaTarde').on('click', function(){ 
      clickEnRutina =5 ;
      mainView.router.navigate('/crearRutina/');
          })

    $$('#crearRutinaTardecita').on('click', function(){ 
      clickEnRutina =6 ;
      mainView.router.navigate('/crearRutina/');
          })


    $$('#crearRutinaNoche').on('click', function(){ 
      clickEnRutina =7 ;
      mainView.router.navigate('/crearRutina/');
          })
})
 


//----------------------------------BUSCADOR------------------------------//
$$(document).on('page:init', '.page[data-name="buscador"]', function (e) {
app.routes[5].keepAlive = true;
var searchbar = app.searchbar.create ({
  el: '.searchbar'
})
$$('#buscar').on('click', function(){
  var buscando = $$('#buscador').val();
  var url ="https://api.arasaac.org/api/pictograms/es/search/" + buscando;
  app.request.json (url, function(encontrados){
    console.log(encontrados);
    if (encontrados.length == 0){
      app.toast.create ({
        text: "No se encontr?? pictograma. Modifica la palabra",
        closeTimeout: 3000,
        position: 'center'
      }).open();
    }
      for (i = 0; i < encontrados.length; i++){
        id= encontrados[i]._id;
        urlImagen= "https://static.arasaac.org/pictograms/" + id + "/"+ id +"_500.png"
    
        $$('#imagen'+ (i + 1)).attr('src',urlImagen); 
        var picName = encontrados[i].keywords[0].keyword;
        $$('#picName' +(i + 1)).text(picName);
        $$('#encontrado'+ (i + 1)).removeClass('oculto').on('click', function(){
            switch (clickEn){
                case 1:
                  foto = this.children[0].src;
                  console.log(foto);
                  texto = this.children[1].innerHTML
                  $$('#hacer'+clickEn).children('img').attr('src',foto).attr('alt',texto).removeClass('pq');
                  $$('#ejemplo'+clickEn).children('img').attr('src',foto);
                  $$('#picejemplo'+clickEn).html(texto);       
                  mainView.router.navigate('/crearRutina/');
                  break
            
                case 2:
                  foto = this.children[0].src;
                  console.log(foto);
                  texto = this.children[1].innerHTML
                  $$('#hacer'+clickEn).children('img').attr('src',foto).attr('alt',texto).removeClass('pq');
                  
                  $$('#picejemplo'+clickEn).text(texto);       
                  mainView.router.navigate('/crearRutina/');
                  break

                case 3:
                  foto = this.children[0].src;
                  console.log(foto);
                  texto = this.children[1].innerHTML
                  $$('#hacer'+clickEn).children('img').attr('src',foto).attr('alt',texto).removeClass('pq');
                  $$('#ejemplo'+clickEn).children('img').attr('src',foto);
                  $$('#picejemplo'+clickEn).text(texto);       
                  mainView.router.navigate('/crearRutina/');
                  break
                  
                case 4:
                  foto = this.children[0].src;
                  console.log(foto);
                  texto = this.children[1].innerHTML
                  $$('#hacer'+clickEn).children('img').attr('src',foto).attr('alt',texto).removeClass('pq');
                  $$('#ejemplo'+clickEn).children('img').attr('src',foto);
                  $$('#picejemplo'+clickEn).text(texto);       
                  mainView.router.navigate('/crearRutina/');
                  break

                case 5:
                  foto = this.children[0].src;
                  console.log(foto);
                  texto = this.children[1].innerHTML
                  $$('#hacer'+clickEn).children('img').attr('src',foto).attr('alt',texto).removeClass('pq');
                  $$('#ejemplo'+clickEn).children('img').attr('src',foto);
                  $$('#picejemplo'+clickEn).text(texto);       
                  mainView.router.navigate('/crearRutina/');
                  break
          }
            
        })
        $$('#encontrado'+i).removeClass('oculto').addClass('visible');

      }
      
  })

})

})

//------------------------------PANEL ESCUELA-----------------------------------//
$$(document).on('page:init', '.page[data-name="panelEscuela"]', function (e) {

    //ESTOY EN MANUALIDADES 
    let botonManualidades = document.querySelector(".reproductorManualidades")
    let audioEtiquetaManualidades = document.querySelector("audio")
    
    botonManualidades.addEventListener("click", () => {
      audioEtiquetaManualidades.setAttribute("src", "sonido/sala taller.mp3")
      audioEtiquetaManualidades.play()
      console.log(`Reproduciendo: ${audioEtiquetaManualidades.src}`)
 
 })

     // ESTOY EN LA SALA DE INFORMATICA
     let botonInformatica = document.querySelector(".reproductorInformatica")
     let audioEtiquetaInformatica = document.querySelector("audio")
     
     botonInformatica.addEventListener("click", () => {
       audioEtiquetaInformatica.setAttribute("src", "sonido/inform??tica.mp3")
       audioEtiquetaInformatica.play()
       console.log(`Reproduciendo: ${audioEtiquetaInformatica.src}`)
 
     })
})


//PANEL DE LA CASA
  $$(document).on('page:init', '.page[data-name="panelcasa"]', function (e) {
  
    //QUIERO IR A LA HABITACION
    let boton = document.querySelector(".reproductorHabitacion")
    let audioEtiqueta = document.querySelector("audio")
    
    boton.addEventListener("click", () => {
      audioEtiqueta.setAttribute("src", "sonido/habitacion.mp3")
      audioEtiqueta.play()
      console.log(`Reproduciendo: ${audioEtiqueta.src}`)
    })

  
  
    //QUIERO DORMIR
    let botonD = document.querySelector(".reproductorDormir")
    let audioEtiquetaD = document.querySelector("audio")
    
    botonD.addEventListener("click", () => {
      audioEtiquetaD.setAttribute("src", "sonido/dormir.mp3")
      audioEtiquetaD.play()
      console.log(`Reproduciendo: ${audioEtiquetaD.src}`)
    })
   
})

//PANEL YO
$$(document).on('page:init', '.page[data-name="panelYo"]', function (e) {
  
  console.log("Estoy en el Panel YO");

})

//CONTACTO
$$(document).on('page:init', '.page[data-name="contacto"]', function (e) {
  
  console.log("Estoy en el Panel CONTACTO");

})

//OLVIDE CONTRASE??A
$$(document).on('page:init', '.page[data-name="recuperarpass"]', function (e) {
  $$('#btnRecClave').on('click',function(){
    email = $$('#recPassEmail').val();

    var auth = firebase.auth();
    var emailAddress = email;
  
    auth.sendPasswordResetEmail(emailAddress)
    .then(function() {
      console.log("Mensaje Enviado"); //Generar un Alerta
      app.views.main.router.navigate("/index/"); 

    }).catch(function(error) {
      console.log(error);
    });
   
  })

})


//CARGAR IMAGEN -> CAMARA
$$('#tomarFoto').on('click',function(){

document.addEventListener("deviceready", onDeviceReady, false);

navigator.camera.getPicture(onSuccess, onFail, { quality: 50,
destinationType: Camera.DestinationType.FILE_URI });

function onDeviceReady() {
    console.log(navigator.camera);
}
    function onSuccess(imageURI) {
        var image = document.getElementById('agregarAgenda1');
        image.src = imageURI;
    }

    function onFail(message) {
        alert('Failed because: ' + message);
    }

})  

