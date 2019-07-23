import Bee from 'bee-queue';

import CancellationMail from '../app/Jobs/CancellationMail';

import configRedis from '../config/redis';

const jobs = [CancellationMail];

class Queue {
  constructor() {
    this.queues = {};

    this.init();
  }

  /**
   * bee :  é a nossa instancia que conecta com o redis que consegue
   * armazenar e recuperar valores do banco de dados
   *
   *
   * handle: quem processa as filas, que recebe as variaves lá
   * do contexto do email,
   *
   * Pega todos os jobs da aplicação e armazena em this.queues
   */

  init() {
    jobs.forEach(({ key, handle }) => {
      this.queues[key] = {
        bee: new Bee(key, {
          redis: configRedis,
        }),
        handle,
      };
    });
  }

  /**
   *
   * @param {*} queue
   * @param {*} job
   *
   * aqui ele vai pegar a fila e adicionar um Job,
   * criando então o job, por exemplo CancellationMail
   * e passando junto os dados do contexto, por exemplo
   * o appointment do AppointmentController
   */

  /**
   *  Toda add que é chamado o processQueue entra em ação e processa
   *  em background
   */

  add(queue, job) {
    return this.queues[queue].bee.createJob(job).save();
  }

  processQueue() {
    jobs.forEach((job) => {
      const { bee, handle } = this.queues[job.key];

      bee.on('failed', this.handleFailure).process(handle);
    });
  }

  handleFailure(job, err) {
    console.log(`Queue ${job.queue.name} : FAILED`, err);
  }
}

export default new Queue();
