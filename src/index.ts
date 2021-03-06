import Flasher, {
  Envelope,
  FlasherInterface,
  FlasherOptions,
  QueueableInterface,
} from '@flasher/flasher';
import Swal, { SweetAlertOptions } from 'sweetalert2';

import 'sweetalert2/dist/sweetalert2.min.css';

type SwalType = typeof Swal;

export default class SweetAlertFactory implements FlasherInterface, QueueableInterface {
  swalToastr?: SwalType;

  queue: Envelope[] = [];

  public render(envelope: Envelope) {
    const { notification } = envelope;
    const { options } = notification;

    return this.swalToastr?.fire(options as SweetAlertOptions).then(function (promise) {
      window.dispatchEvent(new CustomEvent('flasher:sweet_alert:promise', {
        detail: {
          promise,
          envelope,
        },
      }));
    });
  }

  public renderOptions(options: FlasherOptions): void {
    this.swalToastr = this.swalToastr || Swal.mixin(options as SweetAlertOptions);
  }

  public addEnvelope(envelope: Envelope): void {
    this.queue?.push(envelope);
  }

  public resetQueue() {
    this.queue = [];
  }

  public async renderQueue() {
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < this.queue.length; i++) {
      // eslint-disable-next-line no-await-in-loop
      await this.render(this.queue[i]);
    }
  }
}

const flasher = Flasher.getInstance();
flasher.addFactory('sweet_alert', new SweetAlertFactory());
