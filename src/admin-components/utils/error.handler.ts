import { useToast } from "@/common-component/custom-toast/ToastContext";
import axios, { AxiosError } from "axios";
interface ErrorResponse {
    message: string;
    [key: string]: any; // Optional: to account for additional fields in the response
  }

export const handleError = (error: unknown, showToast:any) => {
    if (axios.isAxiosError(error)) {
      // Axios Error
      const axiosError = error as AxiosError<ErrorResponse>;
      const { response, message } = axiosError;
  
      if (response) {
        const { status, statusText, data } = response;
        console.log(`${statusText} ${status} :`, data?.message || message);
        showToast(data?.message || "Bad Request. Please check the input data.", "error");
            
      } else if (axiosError.code === "ECONNABORTED") {
        // Timeout error
        console.error("Request Timeout: ", message);
        showToast("Request timed out. Please try again.", "error");
      } else if (axiosError.code === "ERR_NETWORK") {
        // Network error
        console.error("Network Error: ", message);
        showToast("Network error. Please check your connection.", "error");
      } else {
        // Any other Axios errors
        console.error("Axios Error: ", message);
        showToast("An error occurred. Please try again later.", "error");
      }
    } else if (error instanceof Error) {
      // Handle generic JavaScript errors (not Axios)
      console.error("General Error: ", error.message);
      showToast("An unexpected error occurred. Please try again later.", "error");
    } else {
      // Handle unknown error types
      console.error("Unknown Error:", error);
      showToast("An unknown error occurred. Please try again later.", "error");
    }
  };
  