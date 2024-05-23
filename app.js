const express = require('express');
const path = require('path');
const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const colors = require('colors');
const qrcode = require('qrcode-terminal');
const fs = require('fs');
const bodyParser = require('body-parser');
require('dotenv').config();
const multer = require('multer'); // Para manejar la carga de archivos

const app = express();

app.use(express.static(__dirname + '/public'));

const port = process.env.PORT;


const SESSION_FILE_PATH = './session.json';

let sessionData;

if (fs.existsSync(SESSION_FILE_PATH)) {
  sessionData = require(SESSION_FILE_PATH);
}



const client = new Client({
    puppeteer: {
      // executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
      args: ['--no-sandbox']
    },
    authStrategy: new LocalAuth({ clientId: "Client-one" }),
    webVersionCache: {
      type: 'remote',
      remotePath: 'https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html', // Tried 2.2412.54 still same result
    }
  });

client.on('qr', (qr) => {
  qrcode.generate(qr, { small: true });
});




client.on('authenticated', (session) => {
  console.log('Conexión exitosa');
  sessionData = session;
  if (sessionData) {
      fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), (err) => {
          if (err) {
              console.error(err);
          }
      });
  }
});





  // const mediaFilemp3 = MessageMedia.fromFilePath(`./public/media/${'image.mp3'}`)
  // const mediaFilemp4 = MessageMedia.fromFilePath(`./public/media/${'image.mp4'}`)
  const mediaFilejpg = MessageMedia.fromFilePath(`./public/media/${'1.png'}`)


let MSGbien = null; // inicia el Mensaje de bienvenida
let etapa = 0;

const registro = {

  '573217088282@c.us': { etapa: 0, numeroDocumento: '' },
  '5213315185300@c.us': { etapa: 0, numeroDocumento: '' },
  '573196693304@c.us': { etapa: 0, numeroDocumento: '' },
  '573057739373@c.us': { etapa: 0, numeroDocumento: '' },
  '5213343468550@c.us': { etapa: 0, numeroDocumento: '' },
  '573102447244@c.us': { etapa: 0, numeroDocumento: '' },
  '573023477836@c.us': { etapa: 0, numeroDocumento: '' }

}; // Registra los numeros telefono que inician al programa 

// setInterval(() => {
//   console.log(registro)
// }, 5000);


client.on('message', async (message) => {
  console.log(`Mensaje recibido de ${message.from}: ${message.body}`);


  setInterval(() => {
    console.log('Registros', registro);
  }, 180000);


  // Este codigo verifica que ya se envio el mensaje de bienvenida
  if (!registro[message.from]) {
    client.sendMessage(message.from, '¡Hola! 👋 Bienvenido a Creativos Code. Somos expertos en soluciones de comunicación empresarial, incluyendo estrategias de BOT de WhatsApp y automatizaciones web.\n\n  🚀📲 *¡Estamos aquí para potenciar tu negocio!* 💼🌟\n \n 1️⃣ Bot de WhatsaApp \n \n 2️⃣ Soporte Tecnico \n \n 3️⃣ Mas sobre Creativo Code \n \n 4️⃣ Realizar pagos \n \n 5️⃣ Creación de paginas Web \n \n 6️⃣ Manejo de Redes Sociales \n \n *Escriba el número de su solicitud*');
    client.sendMessage(message.from, mediaFilejpg)

    registro[message.from] = { etapa: 0, numeroDocumento: '' };
    // registro[message.from] = true; // Register the phone number
    return;
  }

  if (MSGbien !== null) { // Check if MSGbien exists
    client.sendMessage(message.from, MSGbien);
    MSGbien = null; // Reset to a falsy value after sending
  } else {
    console.log('Error al verificar el mensaje de bienvenida');
  }

  // setTimeout(() => {
  //   delete registro[message.from];
  // }, 150 * 10000);






  switch (registro[message.from].etapa) {



    case 0:
      const mensajeEnMinusculas = message.body.toLowerCase();
      if (message.body === ('1')) {
        client.sendMessage(message.from, ' 🚀 Optimiza tu Atención al Cliente con Chatbots de WhatsApp\n \n¿Buscas una solución eficiente para atender a tus clientes las 24 horas del día? Los chatbots de WhatsApp son la respuesta.\n\nAquí te explico por qué deberías considerarlos: \n\nPresencia donde los clientes están: WhatsApp es la aplicación de mensajería más popular del mundo, con más de dos mil millones de usuarios activos mensuales. En Latinoamérica, un 80% de la población utiliza WhatsApp. \n\nAtención 24/7: Los chatbots están disponibles todo el tiempo y responden más rápidamente que los agentes humanos. Esto se traduce en mayores tasas de satisfacción del cliente.\n \n Si quiere iniciar la prueba escribe INICIAR \n \n *INICIAR*');
        // client.sendMessage(message.from, mediaFilemp4)
        registro[message.from].etapa = 13;
      } else if (message.body === ('2')) {
        client.sendMessage(message.from, 'En un momento sera atendido por un asesor. gracias por elegirnos wwww.creativoscode.com');
        registro[message.from].etapa = 12;

      } else if (message.body === ('3')) {
        client.sendMessage(message.from, 'Somos una empresa con más de 5 años de experiencia en software y atención al usuario. Hemos brindado nuestros servicios en el sector Salud, y ahora estamos expandiendo nuestro enfoque para ayudar a todas las microempresas que desean implementar la automatización en sus interacciones con los usuarios. \n \n *visite* \n \nwwww.creativocode.com');
        registro[message.from].etapa = 12;
        delete registro[message.from];
      } else if (message.body === ('4')) {
        client.sendMessage(message.from, ' Realice el pago por medio de este link: \n \n  https://checkout.bold.co/payment/LNK_DKL4KXER5A ');
        registro[message.from].etapa = 12;
        delete registro[message.from];
      } else if (message.body === ('5')) {
        client.sendMessage(message.from, 'Diseñamos su página web, una plataforma moderna y fácil de usar para sus usuarios, por un costo de 850.000, que incluye el dominio por un año.');
        registro[message.from].etapa = 12;
        delete registro[message.from];
      } else if (message.body === ('6')) {
        client.sendMessage(message.from, 'Gestionamos sus redes sociales con diseños y publicaciones semanales por un costo de 350.000, que incluye 4 publicaciones semanales en imágenes y contenido en video');
        registro[message.from].etapa = 12;
        delete registro[message.from];
      }
      break;





    case 12:
      if (message.body.length > 2) {
        // Verificar si el mensaje tiene más de 2 letras
        client.sendMessage(message.from, 'Gracias por elegirnos');
        registro[message.from].etapa = 21;
        delete registro[message.from];
      }
      break;


    case 13:
      if (message.body === "INICIAR" || message.body === "iniciar" || message.body === "Iniciar") {
        // Verificar si el mensaje tiene más de 2 letras
        client.sendMessage(message.from, 'Para Iniciar por favor indíqueme en un solo mensaje su: \n \n *Nombre:* \n \n *E-Mail* \n \n A que se dedica su negocio y lo que le gustaría que hiciera el Bot con sus clientes. ');
        registro[message.from].etapa = 20;

      }
      break;

    case 20:
      if (message.body.length > 2) {
        // Verificar si el mensaje tiene más de 2 letras
        client.sendMessage(message.from, 'Vamos a preparar tu Bot. Pronto recibiras una llamada de uno de nuestros asesores*');
        registro[message.from].etapa = 21;
      
      }
      break;






  }


});




// Desde aqui inica el cargue de la imagen al servidor 

// Configura multer para guardar las imágenes en la carpeta "media"
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'media'); // Directorio de destino para las imágenes
  },
  filename: (req, file, cb) => {
    // Define el nombre del archivo como "image" y asegúrate de que sea único
    const extname = path.extname(file.originalname);
    const filename = 'image' + extname;
    cb(null, filename);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    // Verifica si el archivo ya existe en "media" y lo elimina si es necesario
    const filePath = path.join('media', 'image' + path.extname(file.originalname));
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    cb(null, true);
  },
});

app.post('/upload', upload.single('image'), (req, res) => {
  // Mostrar un mensaje emergente en HTML
  const successMessage = `
    <div id="popup" style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background-color: #fff; padding: 20px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5); text-align: center;">
      <p>Imagen cargada con éxito</p>
      <button onclick="closePopup()">Cerrar</button>
    </div>
    <script>
      function closePopup() {
        document.getElementById('popup').style.display = 'none';
        // Redirige de nuevo a la página anterior
        window.location.href = '/'; // Cambia esto al URL de tu página
      }
    </script>
  `;
  res.send(successMessage);
});


// 



let MSGenvio = true;




// Desde aqui Robot de envio Mesivo

client.on('auth_failure', (msg) => {
  console.error('Error de autenticación:', msg);
});


client.on('ready', () => {
  console.log('Cliente listo');
});

client.initialize();


app.use(bodyParser.json()); // Usar body-parser para analizar JSON
app.use(bodyParser.urlencoded({ extended: true })); // Usar body-parser para analizar datos codificados en URL

// Array para almacenar los registros de mensajes enviados
const registros = [];

// app.get('/', (req, res) => {
//   res.sendFile('index.html');
//  });


app.post('/procesar', (req, res) => {
  const { numbers, messages } = req.body;

  console.log('Números de Teléfono:', numbers);
  console.log('Mensajes:', messages);

  if (!numbers || !messages) {
    res.status(400).send('Los datos enviados no son válidos.');
    return;
  }

  if (!Array.isArray(numbers) || !Array.isArray(messages)) {
    res.status(400).send('Los datos enviados no son válidos.');
    return;
  }


  const sendMedia = (to, file) => {
    const mediaFile = MessageMedia.fromFilePath(`./media/${file}`)
    client.sendMessage(to, mediaFile)
  }


  // ///////////////////////////////////////

  let messageCounter = 0;



  app.post('/cambiar', (req, res) => {
    MSGenvio = !MSGenvio; // Cambiamos el valor de MSGenvio
    res.json({ MSGenvio });
  });





  setInterval(() => {
    console.log("MSGenvio:", MSGenvio);
  }, 1000);


  app.use(express.json());

  // ///////////////////////////////////////////////////////////////


  numbers.forEach((phoneNumber, index) => {
    const phoneNumberWithSuffix = `${phoneNumber}@c.us`;
    const message = messages[index] || ""; // Asigna una cadena vacía si el mensaje no está presente para ese número



    setTimeout(() => {

      if (MSGenvio) {
        sendMedia(phoneNumberWithSuffix, 'image.jpg');
      }
      client.sendMessage(phoneNumberWithSuffix, message)
        .then(() => {
          const registro = {
            mensaje: `Mensaje ${++messageCounter} enviado a ${phoneNumberWithSuffix}`,
            numero: phoneNumberWithSuffix
          };

          registros.push(registro); // Agregar el registro al array de registros
          console.log(registro.mensaje.green);

          // Verifica si estás en el último elemento del array
          if (index === numbers.length - 1) {
            registros.push({ mensaje: 'Terminé de enviar los mensajes', numero: 'Oprima el boton borra registro' });
            console.log('Terminé de enviar');
          }
        })
        .catch((error) => {
          console.log(`Error al enviar el mensaje a ${phoneNumberWithSuffix}: ${error.message}`.red);
        });
    }, 15000 * (index + 1));
  });




  res.status(200).send('Datos recibidos correctamente');


  app.get('/registros', (req, res) => {
    const ultimosRegistros = registros.slice(-10); // Obtener los últimos 10 registros

    res.json(ultimosRegistros); // Enviar los últimos 10 registros como respuesta en formato JSON
  });

});

// Ruta para borrar los registros
app.delete('/borrar-registros', (req, res) => {
  registros.length = 0; // Borra todos los registros
  res.json({ message: 'Registros borrados exitosamente' });
});






app.listen(port, () => {
  console.log(`Servidor Express escuchando en el puerto ${port}`);
});