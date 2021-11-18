import {authenticate} from '@loopback/authentication';
import {
  repository
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef, param
} from '@loopback/rest';
import {
  Encomienda, Servicio
} from '../models';
import {ServicioRepository} from '../repositories';

//Solicitud de autnticacion para uso del servicio
@authenticate("admin")
export class ServicioEncomiendaController {
  constructor(
    @repository(ServicioRepository)
    public servicioRepository: ServicioRepository,
  ) { }

  @get('/servicios/{id}/encomienda', {
    responses: {
      '200': {
        description: 'Encomienda belonging to Servicio',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Encomienda)},
          },
        },
      },
    },
  })
  async getEncomienda(
    @param.path.string('id') id: typeof Servicio.prototype.id,
  ): Promise<Encomienda> {
    return this.servicioRepository.encomiendaFK(id);
  }
}
