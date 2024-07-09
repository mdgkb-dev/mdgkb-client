import { ref } from 'vue';

import AdminHead from './AdminHead';
import AdminUI from './AdminUI';
import Dialog from './Dialog';
import Loading from './Loading';
import Notification from './Notification';

export default abstract class PHelp {
  static Dialog = reactive(Dialog);
  static Notification = reactive(Notification);
  static Loading = reactive(Loading);
  static adminHead = ref(AdminHead);
  static AdminUI = reactive(AdminUI);

  static AdminHead() {
    return PHelp.adminHead.value;
  }
}
