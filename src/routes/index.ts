import { Router } from 'express';

import pessoaJuridicaRouter from './pessoasjuridicas.routes';

const routes = Router();

routes.use('/pessoasjuridicas', pessoaJuridicaRouter);

export default routes;
