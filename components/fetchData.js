/* import { API_URL } from "../global/baseUrl";

export const fetchData = async (END_POINT, idToken, method, bodyData) => {
  fetch(`${API_URL}/${END_POINT}`, {
    method: `${method}`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-AUTH-TOKEN": idToken,
    },
    body: JSON.stringify({
      bodyData,
    }),
  });
};
 */