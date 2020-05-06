import { startOfHour } from 'date-fns';

import AppError from '@shared/erros/AppError';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

/**
 * Recebimento das informações
 * Tratativa de erros/exceções
 * Acesso ao repositorio
 */

interface IRequest {
  provider_id: string;
  date: Date;
}
/**
 * Dependency Inversion (SOLID)
 */
class CreateAppointmentService {

  constructor(private appointmentsRepository: IAppointmentsRepository){}

  public async execute({ date, provider_id }: IRequest): Promise<Appointment> {

    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked');
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
