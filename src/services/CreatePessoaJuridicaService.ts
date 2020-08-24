import { getCustomRepository } from 'typeorm';

import PessoaJuridica from '../models/PessoaJuridica';
import PessoaJuridicaRepository from '../repositories/PessoasJuridicasRepository';

interface Request {
  cnpj: string;
  name: string;
  logradouro: string;
  numero: string;
  complemento: string;
  municipio: string;
  uf: string;
  cep: string;
  telefone: string;
  email: string;
}

class CreatePessoaJuridicaService {
  public async execute({
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
  }: Request): Promise<PessoaJuridica> {
    const pessoaJuridicaRepository = getCustomRepository(
      PessoaJuridicaRepository,
    );

    const checkPjExists = await pessoaJuridicaRepository.findOne({
      where: { cnpj },
    });

    if (checkPjExists) {
      throw new Error('CNPJ already used.');
    }

    const pj = pessoaJuridicaRepository.create({
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

    await pessoaJuridicaRepository.save(pj);

    return pj;
  }
}

export default CreatePessoaJuridicaService;
