import Flasher, { Envelope, FlasherInterface, FlasherOptions } from '@flasher/flasher';
import Swal, { SweetAlertOptions } from 'sweetalert2';

import 'sweetalert2/dist/sweetalert2.min.css';

type SwalType = typeof Swal;

export default class SweetAlertFactory implements FlasherInterface {
  swalToastr?: SwalType;

  render(envelope: Envelope): void {
    const { notification } = envelope;
    const { options } = notification;

    this.swalToastr?.fire(options as SweetAlertOptions);
  }

  renderOptions(options: FlasherOptions): void {
    this.swalToastr = this.swalToastr || Swal.mixin(options as SweetAlertOptions);
  }
}

const flasher = Flasher.getInstance();
flasher.addFactory('sweet_alert', new SweetAlertFactory());
