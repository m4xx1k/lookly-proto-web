import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

export function handleErrorMessage(error: unknown) {
  if (!axios.isAxiosError(error)) {
    console.log("Error is not an AxiosError:");
    if (error instanceof Error) {
      return error.message;
    }
    return "Unknown error";
  }
  console.log("Error is an AxiosError:");

  const axiosError = error as AxiosError<{
    message?: string | string[];
    error?: string;
    errors?: string[];
  }>;

  if (axiosError.response?.status === 500) {
    return "Internal Server Error";
  }
  const dataMessage = axiosError.response?.data?.message;
  if (dataMessage) {
    if (Array.isArray(dataMessage)) {
      if (dataMessage.length > 1) {
        return formatMessagesArray(dataMessage);
      } else {
        return dataMessage.join("\n");
      }
    } else {
      return dataMessage;
    }
  }

  const dataError = axiosError.response?.data?.errors;
  if (dataError) {
    if (Array.isArray(dataError)) {
      if (dataError.length > 1) {
        return formatMessagesArray(dataError);
      } else {
        return dataError.join("\n");
      }
    } else {
      return dataError;
    }
  }

  return error.message || "Unknown error";
}

export function toastApiError(err: unknown) {
  console.error("API Error:", err);
  toast.error(handleErrorMessage(err));
}

const formatMessagesArray = (messages: string[]): string =>
  messages.map((sentence, i) => `${i + 1}. ${sentence}`).join("\n");
