export const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8383/api/v1/"
    : "/api/v1/";
export const token =
  process.env.NODE_ENV === "development"
    ? "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWVzdEBsYW1pc3BsdXMub3JnIiwiYXV0aCI6IlN1cGVyIEFkbWluIiwibmFtZSI6Ikd1ZXN0IEd1ZXN0IiwiZXhwIjoxNzE0MDc5ODUxfQ.lulzgTY2eCjeToB9L_Gtp-yYPZm3Gykm6ZW867-odMXNrPxSgW9DuhKjjZ0mh56Cu4_UfAHTcBtSipE2_Ytklg"
    : new URLSearchParams(window.location.search).get("jwt");