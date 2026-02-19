import { toast } from "react-toastify";

const toastOptions = {
  style: {
    backgroundColor: "#0a0a0a",
    border: "1px solid rgba(255, 255, 255, 0.05)",
    color: "#fff",
    fontSize: "10px",
    fontWeight: "900",
    letterSpacing: "0.2em",
    fontFamily: "monospace",
    borderRadius: "2px", // Squared edges look more "industrial"
    textTransform: "uppercase",
  },
  progressStyle: {
    background: "#22d3ee", // Cyan progress bar to match your brand
  },
};

export const systemAlert = {
  success: (msg) => {
    toast.success(`[LOG]: ${msg}`, toastOptions);
    console.log(
      `%c [FACILITY_LOG]: ${msg}`,
      "color: #22d3ee; font-weight: bold;",
    );
  },
  error: (msg) => {
    toast.error(`[ERR]: ${msg}`, {
      ...toastOptions,
      progressStyle: { background: "#f43f5e" }, // Red bar for errors
    });
    console.log(
      `%c [SYSTEM_ERROR]: ${msg}`,
      "color: #f43f5e; font-weight: bold;",
    );
  },
};
