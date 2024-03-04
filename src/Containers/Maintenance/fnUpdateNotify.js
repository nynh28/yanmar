import {
  ENDPOINT_BASE_URL,
  ENDPOINT_BASE_URL_YNM2,
  ENDPOINT_BASE_URL_YNM4,
} from "../../Config/app-config";

export async function fnUpdateNotify(data) {
  let response = await fetch(
    ENDPOINT_BASE_URL_YNM4 + "fleet/history/notify/" + data.id,
    {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Accept-Language": data.language,
      },
      body: JSON.stringify(data.body),
    }
  );

  return response.status;
}
