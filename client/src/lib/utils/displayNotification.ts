import { toaster } from "baseui/toast";

type NotificationType = keyof typeof toaster

const displayNotification = (type: NotificationType, message: string, autoHide: boolean = true, onClose: () => any = () => { }) => {
  toaster[type](message, {
    onClose: () => onClose(),
    autoHideDuration: autoHide ? 5000 : undefined,
    closeable: true,
    overrides: {
      Body: {
        style: {
          textTransform: "capitalize",
          width: "auto"
        },
      },
    },
  });
}

export { displayNotification }