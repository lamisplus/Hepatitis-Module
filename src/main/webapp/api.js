export const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8383/api/v1/"
    : "/api/v1/";
export const token =
  process.env.NODE_ENV === "development"
    ? "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWVzdEBsYW1pc3BsdXMub3JnIiwiYXV0aCI6IlN1cGVyIEFkbWluIiwibmFtZSI6Ikd1ZXN0IEd1ZXN0IiwiZXhwIjoxNzEzOTYxNjI5fQ.paV-dRG0fCifq8JJK1GRZCkUnui0puPE3e3IsAYOB9TuM1yow0m9kVyhZ1EJfaZ5ZgGYlHLbQuVcgSPBoA3izw"
    : new URLSearchParams(window.location.search).get("jwt");