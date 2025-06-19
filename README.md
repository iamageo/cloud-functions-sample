# Firebase Cloud Functions – Envio de Notificações

Um boilerplate em Node.js/Express para enviar push notifications com Firebase Cloud Functions, incluindo:

- **Endpoint HTTP** para disparo sob demanda (`/sendNotification`)
- **Função agendada** (Pub/Sub) para envio diário automatizado
- Exemplo de **integração com Firestore** para personalização de mensagens  
- Guia de **teste** via curl, Postman e Firebase Emulator

## Descrição

Este projeto demonstra como usar o Firebase Cloud Functions e o Firebase Cloud Messaging (FCM) para:

1. **Enviar notificações personalizadas** a um token de dispositivo via endpoint REST.  
2. **Agendar envios diários** de mensagens usando Pub/Sub.  
3. **Buscar dados no Firestore** (nome de usuário, preferências, etc.) para construir payloads dinâmicos.  

Perfeito como base para apps Flutter, Web ou iOS/Android que precisem de um sistema de notificações desacoplado e escalável.
