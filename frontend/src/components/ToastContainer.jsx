import { useState, useEffect } from "react";
import Notification from "./Notification";
import { subscribeToAlerts } from "../utils/toastUtils"; // We'll create this

const ToastContainer = () => {
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    // Subscribe to the systemAlert calls from your store
    const unsubscribe = subscribeToAlerts((msg, type) => {
      setAlert({ msg, type });

      // Auto-clear after 4 seconds
      setTimeout(() => setAlert(null), 4000);
    });

    return () => unsubscribe();
  }, []);

  return (
    <Notification
      isVisible={!!alert}
      message={alert?.msg}
      type={alert?.type}
      onClose={() => setAlert(null)}
    />
  );
};

export default ToastContainer;
