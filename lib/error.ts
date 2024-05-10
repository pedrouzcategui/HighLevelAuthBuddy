import axios, { AxiosError } from "axios";

export default function parseApiErrors(error: AxiosError | unknown) {
  if (axios.isAxiosError(error)) {
    const { name, status, message, cause, request, response } =
      error as AxiosError;
  } else return error;
}
