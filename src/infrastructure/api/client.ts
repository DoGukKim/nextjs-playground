import FetchClient from "@/shared/api/fetchClient/fetchClient";

export const apiClient = FetchClient.create({
  headers: {
    "Content-Type": "application/json",
  },
});
