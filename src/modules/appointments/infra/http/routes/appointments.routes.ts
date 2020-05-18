import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentsController from '../controllers/AppointmentsController';
import ProviderAppointmentsController from '../controllers/ProviderAppointmentsController';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();
const providerAppointmentsController = new ProviderAppointmentsController();

appointmentsRouter.use(ensureAuthenticated);

// SoC: Separations of Concerns (Separação de preocupações)
// DTO - Data Transfer Object

// Rota: Receber a requisição, chamar outro arquivo, devolver uma resposta

// appointmentsRouter.get('/', async (req, res) => {
//   const appointmentsRepository = getCustomRepository(AppointmentsRepository);
//   const appointments = await appointmentsRepository.find();
//   return res.json(appointments);
// });

appointmentsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      provider_id: Joi.string().uuid().required(),
      data: Joi.date(),
    },
  }),
  appointmentsController.create,
);
appointmentsRouter.post('/me', providerAppointmentsController.index);

export default appointmentsRouter;
