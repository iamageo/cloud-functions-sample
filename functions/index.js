const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

// Inicializa o Admin SDK com credenciais
const serviceAccount = require("./admin.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Middlewares para parsing
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/**
 * Endpoint HTTP para enviar notificação a um token específico.
 * Espera receber JSON: { token: string, title?: string, body?: string }
 */
app.post('/sendNotification', async (req, res) => {
  const { token, title, body } = req.body;
  if (!token) {
    return res.status(400).json({ message: 'Parâmetro "token" é obrigatório' });
  }

  const notificationTitle = title || 'Notificação';
  const notificationBody = body || 'Você recebeu uma nova mensagem.';

  const payload = {
    notification: {
      title: notificationTitle,
      body: notificationBody,
    }
  };

  try {
    await admin.messaging().send({ token, notification: payload.notification });
    return res.status(200).json({ success: true, message: 'Notificação enviada com sucesso' });
  } catch (error) {
    console.error('Erro ao enviar notificação:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * Função agendada para enviar notificações diárias a todos os usuários com token salvo.
 * Envia uma mensagem padrão a cada token registrado em Firestore na collection 'users'.

exports.sendDailyNotification = functions.pubsub
  .schedule('0 12 * * *')
  .timeZone('America/Sao_Paulo')
  .onRun(async () => {
    const usersSnap = await admin.firestore().collection('users').where('push_token', '!=', null).get();
    const messages = [
      'Hoje é um ótimo dia para aprender algo novo!',
      'Não deixe o conhecimento para depois!',
      'Seu próximo desafio está te esperando!'
    ];

    const promises = [];
    usersSnap.forEach(doc => {
      const token = doc.data().push_token;
      if (token) {
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        const payload = {
          notification: { title: 'Olá!', body: randomMessage }
        };
        promises.push(admin.messaging().send({ token, notification: payload.notification }));
      }
    });

    await Promise.all(promises);
    console.log('Notificações diárias enviadas.');
  });
*/  

// Exporta o Express app como endpoint HTTP
exports.api = functions.https.onRequest(app);
