export const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8383/api/v1/"
    : "/api/v1/";
export const token =
  process.env.NODE_ENV === "development"
    ? "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWVzdEBsYW1pc3BsdXMub3JnIiwiYXV0aCI6IlN1cGVyIEFkbWluIiwibmFtZSI6Ikd1ZXN0IEd1ZXN0IiwiZXhwIjoxNzEzODc3MzI2fQ.IOjFVUIy32ziWDg74j0ALqrwtcLEQqKKCGqq8EXecoGne2LOecblvhaG9ATh981pbkm35SKVfUXx0DL--pKDqQ"
    : new URLSearchParams(window.location.search).get("jwt");