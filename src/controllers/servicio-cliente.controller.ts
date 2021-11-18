import {authenticate} from '@loopback/authentication';
import {
  repository
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef, param
} from '@loopback/rest';
import {
  Cliente, Servicio
} from '../models';
import {ServicioRepository} from '../repositories';

//Solicitud de autnticacion para uso del servicio
@authenticate("admin")
export class ServicioClienteController {
  constructor(
    @repository(ServicioRepository)
    public servicioRepository: ServicioRepository,
  ) { }

  @get('/servicios/{id}/cliente', {
    responses: {
      '200': {
        description: 'Cliente belonging to Servicio',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Cliente)},
          },
        },
      },
    },
  })
  async getCliente(
    @param.path.string('id') id: typeof Servicio.prototype.id,
  ): Promise<Cliente> {
    return this.servicioRepository.origenFK(id);
  }
}
