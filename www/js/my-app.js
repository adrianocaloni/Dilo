  
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
      {path: '/panelprincipal/',url: 'panelprincipal.html',},
      {path: '/panelcasa/',url: 'panelcasa.html',},
      {path: '/panelsalir/',url: 'panelsalir.html',},
      {path: '/recuperarpass/',url: 'recuperarpass.html',},
      {path: '/acercadilo/',url: 'acercadilo.html',},
      {path: '/crearcuenta/',url: 'crearcuenta.html',},
    ]    

  });

var mainView = app.views.create('.view-main');

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    console.log("Device is ready!");
});

// Option 1. Using one 'page:init' handler for all pages
$$(document).on('page:init', function (e) {
    // Do something here when page loaded and initialized
    console.log(e);
})

//PAGINA DE INICIO
$$(document).on('page:init', '.page[data-name="index"]', function (e) {

  $$('#btnIS').on('click',function(){
   
    email = $$('#inicioEmail').val();
    password = $$('#inicioPassword').val();
    
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        app.views.main.router.navigate("/panelprincipal/");
        // ...
      })
      .catch(function(error){
        //Handle Errors here.
    console.error(error.code);
      if(error.code == "auth/wrong-password"){
        console.error('La contraseña ingresada no es válida');
        $$('#mensajeAlert').html('La contraseña ingresada no es válida');

      }
      else if (error.code == "auth/user-not-found"){
        console.error('El e-mail ingresado no existe');
        $$('#mensajeAlert').html('El e-mail ingresado no existe');

      }
      else if (error.code == "auth/too-many-requests"){
        console.error('El acceso a esta cuenta se ha desactivado temporalmente debido a muchos intentos fallidos de inicio de sesión. Puede restaurarlo inmediatamente restableciendo su contraseña o puede intentarlo de nuevo más tarde.');
        $$('#mensajeAlert').html('El acceso a esta cuenta se ha desactivado temporalmente debido a muchos intentos fallidos de inicio de sesión. Puede restaurarlo inmediatamente restableciendo su contraseña o puede intentarlo de nuevo más tarde.');

      }
      else if (error.code == "auth/invalid-email"){
        console.error('El e-mail ingresado no es un formato valido');
        $$('#mensajeAlert').html('El e-mail ingresado no es un formato valido');

      }        
    console.error(error.message); 
  })
  });
  //RECUPERAR CONTRASEÑA
  $$('#olvidePass').on('click',function(){
    app.views.main.router.navigate("/recuperarpass/");
  })
  //INGRESAR SIN USUARIO
  $$('#btnIngresar').on('click',function(){
    app.views.main.router.navigate("/panelprincipal/"); 
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
                nombre = $$('#regNombre').val();
                apellido = $$('#regApellido').val();
                celular = $$('#regCelTel').val();
                localidad = $$('#regLocalidad').val();
                console.log(nombre);
                console.log(apellido);
                console.log(celular);
  
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
          app.views.main.router.navigate("/panelprincipal/");
  
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
              $$('#mensajeAlert').html('La contraseña debe tener al menos 6 caracteres');
  
            }
            else if (error.code == "auth/invalid-email"){
              console.error('El formato del email ingresado no es valido');
              $$('#mensajeAlert').html('El formato del email ingresado no es valido');
  
            }
          console.error(error.message); 
        })
  
    })

})
// PANEL PRINCIPAL
  $$(document).on('page:init', '.page[data-name="panelprincipal"]', function (e) {
    console.log("HOLA");
    $$('#btnCasa').on('click',function(){
      app.views.main.router.navigate("/panelcasa/"); 
    })

    $$('#btnSalir').on('click',function(){
      app.views.main.router.navigate("/panelsalir/"); 
    })
})

//PANEL DE LA CASA
  $$(document).on('page:init', '.page[data-name="panelcasa"]', function (e) {
  
    //QUIERO IR A LA HABITACIÓN
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

//OLVIDE CONTRASEÑA
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

