import { Router } from 'express';

const routes = new Router();

routes.get('/', (req, res) => res.json({ message: 'Olá criançada' }));

export default routes;
