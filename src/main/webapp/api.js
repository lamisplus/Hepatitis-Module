export const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8383/api/v1/"
    : "/api/v1/";
export const token =
  process.env.NODE_ENV === "development"
    ? "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWVzdEBsYW1pc3BsdXMub3JnIiwiYXV0aCI6IlN1cGVyIEFkbWluIiwibmFtZSI6Ikd1ZXN0IEd1ZXN0IiwiZXhwIjoxNzE0NDA5Nzg3fQ.Vyq6mOhQ1vE5BvuFatmTjl2qCj1aEurOoxkg2_wiAkuanvQ0ZHWyTD45oilKlZjAt_oWel4IJ0-pJDJtE1Tb7w"
    : new URLSearchParams(window.location.search).get("jwt");