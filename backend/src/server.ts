import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import urlRoutes from './routes/urlRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/michicode';

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

mongoose
  .connect(MONGO_URI)
  .then(() => console.log('✅ Conectado a MongoDB'))
  .catch((err) => {
    console.error('❌ Error conectando a MongoDB:', err);
    process.exit(1);
  });

app.use('/api', urlRoutes);

app.use('/', urlRoutes);

app.get('/', (_, res) => {
  res.json({ message: 'MichiCode API funcionando 🚀' });
});

app.listen(PORT, () => {
  console.log(`Backend corriendo en http://localhost:${PORT}`);
});
