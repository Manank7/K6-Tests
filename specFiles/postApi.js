import http from "k6/http";
import { sleep } from "k6";
import { check } from "k6";

export const options = {
  vus: 1,
  duration: "1s",
};

export default () => {
  const url = "https://jsonplaceholder.typicode.com/posts";

  const payload = JSON.stringify({
    title: "K6 Tool Testing",
    body: "K6 test files",
    userId: 1,
    name: "Manan",
    email: "manan@gmail.com",
  });

  const params = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const response = http.post(url, payload, params);
  check(response, {
    "is status 201": (r) => r.status === 201,
    "is response body has name": (r) => r.body.includes("Manan"),
    "is response body has email": (r) => r.body.includes("manan@gmail.com"),
  });
};
