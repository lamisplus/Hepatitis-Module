export const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8383/api/v1/"
    : "/api/v1/";
export const token =
  process.env.NODE_ENV === "development"
    ? "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWVzdEBsYW1pc3BsdXMub3JnIiwiYXV0aCI6IlN1cGVyIEFkbWluIiwibmFtZSI6Ikd1ZXN0IEd1ZXN0IiwiZXhwIjoxNzEzOTkwNjMxfQ.gi4jnDzckPf8rEmmZ0_EmwWb91Z2jgPQMVh7nuyuyZo1pLYc9yvNAQyDhB02Ha5xVeDnW_QxmxpVGeXZYO2D7w"
    : new URLSearchParams(window.location.search).get("jwt");