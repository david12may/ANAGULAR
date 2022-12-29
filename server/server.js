const webpush = require('web-push');
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');

const app = express();
/**
 * Settings VAPID
 */

const vapidKeys = {
    "publicKey":"BENc177J8CwnVMZkh4_Pvw9_xQTa36cOH-mv76geRndqvFLSEJKgbl5pTAb31bcDQmj7uHZicJmVu8AwxZNWLV0",
    "privateKey":"pJMxIAO2ek8wJ0JSb3E5BDbiQ5nkGgfhRROFcpx84xA"
    }

webpush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
);

const enviarNotificacion = (req, res) => {

    const pushSubscription = {
        endpoint: 'https://fcm.googleapis.com/fcm/send/cvnWI1iv1n4:APA91bEXvhI0HVrovVh82lI4HhcRKGT6dh28Bs3PpUAthvy68tz54PxZaVNj18cIOk8rK6EuAxZ3DCBdHiFM-v3y6cyD_s--JON13JP8zpaBMJE1fZUmijtzwUIst3QWxkpWgeX4VnGE',
        keys: {
            auth: 'H1UaF1zNA1jPlVJw6nLAGQ',
            p256dh: 'BJIAsd0i40iAtHUinrAzNeR8UGb5HG8oEHCkcyPOda67i9UVIUhtWpD0ULEnITYX9pT8TlMTT6-ZdZFMO0-r7QE'
        }
    };

    const payload = {
        "notification": {
            "title": "Saludos",
            "body": "Saludos Espero que tenga un buen dia",
            "vibrate": [100, 50, 100],
            "image": "https://directordefotografia.files.wordpress.com/2012/05/saludar.jpg",
            "actions": [{
                "action": "explore",
                "title": "Go to the site"
            }]
        }
    }

    webpush.sendNotification(
        pushSubscription,
        JSON.stringify(payload))
        .then(res => {
            console.log('Enviado !!');
        }).catch(err => {
            console.log('Error', err);
        })

    res.send({ data: 'Se envio saludo' })

}

app.route('/api/enviar').post(enviarNotificacion);


const httpServer = app.listen(9000, () => {
    console.log("HTTP Server running at http://localhost:" + httpServer.address().port);
});