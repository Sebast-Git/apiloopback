import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, repository} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Cliente, Encomienda, Servicio, ServicioRelations} from '../models';
import {ClienteRepository} from './cliente.repository';
import {EncomiendaRepository} from './encomienda.repository';

export class ServicioRepository extends DefaultCrudRepository<
  Servicio,
  typeof Servicio.prototype.id,
  ServicioRelations
> {

  public readonly destinoFK: BelongsToAccessor<Cliente, typeof Servicio.prototype.id>;

  public readonly encomiendaFK: BelongsToAccessor<Encomienda, typeof Servicio.prototype.id>;

  public readonly origenFK: BelongsToAccessor<Cliente, typeof Servicio.prototype.id>;

  constructor(
    @inject('datasources.Mongo') dataSource: MongoDataSource, @repository.getter('EncomiendaRepository') protected encomiendaRepositoryGetter: Getter<EncomiendaRepository>, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>,
  ) {
    super(Servicio, dataSource);
    this.origenFK = this.createBelongsToAccessorFor('origenFK', clienteRepositoryGetter,);
    this.registerInclusionResolver('origenFK', this.origenFK.inclusionResolver);
    this.encomiendaFK = this.createBelongsToAccessorFor('encomiendaFK', encomiendaRepositoryGetter,);
    this.registerInclusionResolver('encomiendaFK', this.encomiendaFK.inclusionResolver);
    this.destinoFK = this.createBelongsToAccessorFor('destinoFK', clienteRepositoryGetter,);
    this.registerInclusionResolver('destinoFK', this.destinoFK.inclusionResolver);
  }
}
