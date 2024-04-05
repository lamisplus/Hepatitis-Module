export const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8383/api/v1/"
    : "/api/v1/";
export const token =
  process.env.NODE_ENV === "development"
    ? "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWVzdEBsYW1pc3BsdXMub3JnIiwiYXV0aCI6IlN1cGVyIEFkbWluIiwibmFtZSI6Ikd1ZXN0IEd1ZXN0IiwiZXhwIjoxNzEyMzM0MDE4fQ.9Ze5lj0TIvNWJYJNaB1BpomYyXK-Z2FWAcW2xihsPjOaxGBezXhgqLSLyvWmvl8wQeK4bdQnRLKFrATInp4-kg"
    : new URLSearchParams(window.location.search).get("jwt");
