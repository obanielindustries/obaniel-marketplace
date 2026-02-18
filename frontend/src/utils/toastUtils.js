import { toast } from "react-toastify";

// this design will help to keep things in sync. 

const toastOptions = {
  style: {
    backgroundColor: "#0a0a0a",
    border: "1px solid #27272a",
    color: "#fff",
    fontSize: "10px",
    fontWeight: "bold",
    letterSpacing: "0.2em",
    fontFamily: "monospace",
    borderRadius: "12px",
  },
  progressStyle: {
    background: "#ea580c",
  },
};

export const systemAlert = {
  success: (msg) => toast.success(msg.toUpperCase(), toastOptions),
  error: (msg) => toast.error(msg.toUpperCase(), toastOptions),
  info: (msg) => toast.info(msg.toUpperCase(), toastOptions),
};
