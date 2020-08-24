import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import PessoaJuridicaRepository from '../repositories/PessoasJuridicasRepository';
import CreatePjService from '../services/CreatePessoaJuridicaService';

const pessoaJuridicaRouter = Router();

pessoaJuridicaRouter.get('/', async (request, response) => {
  const pessoaJuridicaRepository = getCustomRepository(
    PessoaJuridicaRepository,
  );
  const pjs = await pessoaJuridicaRepository.find();

  return response.json(pjs);
});

pessoaJuridicaRouter.get('/:cnpj', async (request, response) => {
  const { cnpj } = request.params;
  const pessoaJuridicaRepository = getCustomRepository(
    PessoaJuridicaRepository,
  );

  const pj = await pessoaJuridicaRepository.findOne({
    where: { cnpj },
  });

  return response.json(pj);
});

pessoaJuridicaRouter.post('/', async (request, response) => {
  try {
    const {
      cnpj,
      name,
      logradouro,
      numero,
      complemento,
      municipio,
      uf,
      cep,
      telefone,
      email,
    } = request.body;

    const createPj = new CreatePjService();

    const pj = await createPj.execute({
      cnpj,
      name,
      logradouro,
      numero,
      complemento,
      municipio,
      uf,
      cep,
      telefone,
      email,
    });

    return response.json(pj);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default pessoaJuridicaRouter;
