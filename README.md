#  TP – API REST : Limitation de Requêtes avec le Modèle "Token Bucket"

##  Objectif

Mettre en place une API REST sécurisée avec :
- Authentification par token
- Limitation de requêtes (20 requêtes maximum par utilisateur)
- Recharge du quota
- Accès à des routes protégées


##  Technologies

- Node.js
- Express.js
- UUID
- Dotenv 
- Postman (pour les tests)

##  Lancement du projet

Installer les dépendances :npm install

Lancer le serveur : node index.js

## Authentification par Token

- `POST /register` : retourne un `token`
- Chaque route protégée nécessite ce token dans l’en-tête `Authorization`


## Quota de Requêtes

- Limité à 20 requêtes (pour voir le résultat de test plus rapidement)
- Décrémenté à chaque appel d'une route protégée
- Message d’erreur :

```json
{
  "message": "Quota épuisé. Rechargez votre quota."
}
```

- Recharge possible via `POST /recharge`

## Tests avec Postman

1. Enregistre un utilisateur via `POST /register`
2. Utilise le token retourné dans l’en-tête `Authorization`
3. Envoie des requêtes vers `/items`
4. Recharge le quota via `POST /recharge` si besoin


## 👨‍💻 Auteur

Travail réalisé dans le cadre du TP REST – Master 2IAD  
**Nom :** [Zineb BERKAOUI]
