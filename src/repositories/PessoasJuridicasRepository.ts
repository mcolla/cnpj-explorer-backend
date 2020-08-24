import { EntityRepository, Repository } from 'typeorm';

import PJ from '../models/PessoaJuridica';

@EntityRepository(PJ)
class PJRepository extends Repository<PJ> {
  public async findByDate(date: Date): Promise<PJ | null> {
    const findPJ = await this.findOne({
      where: { date },
    });

    return findPJ || null;
  }

  public async findByCNPJ(cnpj: string): Promise<PJ | null> {
    const findPJ = await this.findOne({
      where: { cnpj },
    });

    return findPJ || null;
  }
}

export default PJRepository;
