const express = require('express');
const { v4: uuidv4 } = require('uuid');
const app = express();
const PORT = 3000;

app.use(express.json());

const users = {};
const items = [];

app.get('/ping', (req, res) => {
  res.send('pong');
});

app.post('/register', (req, res) => {
  const token = uuidv4();
  users[token] = { quota: 20 }; 
  res.json({ token, message: 'Utilisateur enregistré avec 20 requêtes' });
});

function authMiddleware(req, res, next) {
  const token = req.headers['authorization'];
  if (!token || !users[token]) {
    return res.status(401).json({ message: 'Token invalide ou manquant' });
  }
  if (users[token].quota <= 0) {  
    return res.status(429).json({ message: 'Quota épuisé. Rechargez votre quota.' });
  }
  users[token].quota--;
  next();
}

app.post('/recharge', authMiddleware, (req, res) => {
  const token = req.headers['authorization'];
  users[token].quota = 20; 
  res.json({ message: 'Quota rechargé à 20' });
});

app.get('/items', authMiddleware, (req, res) => {
  res.json(items);
});

app.post('/items', authMiddleware, (req, res) => {
  const item = req.body;
  item.id = items.length + 1;
  items.push(item);
  res.status(201).json({ message: 'Item ajouté', item });
});

app.put('/items/:id', authMiddleware, (req, res) => {
  const id = parseInt(req.params.id);
  const index = items.findIndex(i => i.id === id);
  if (index === -1) return res.status(404).json({ message: 'Item non trouvé' });

  items[index] = { ...items[index], ...req.body };
  res.json({ message: 'Item modifié', item: items[index] });
});

app.delete('/items/:id', authMiddleware, (req, res) => {
  const id = parseInt(req.params.id);
  const index = items.findIndex(i => i.id === id);
  if (index === -1) return res.status(404).json({ message: 'Item non trouvé' });

  items.splice(index, 1);
  res.json({ message: 'Item supprimé' });
});

app.listen(PORT, () => {
  console.log(`Serveur en ligne sur http://localhost:${PORT}`);
});
