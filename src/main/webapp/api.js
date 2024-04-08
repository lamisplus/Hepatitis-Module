export const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8789/api/v1/"
    : "/api/v1/";
export const token =
  process.env.NODE_ENV === "development"
    ? "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWVzdEBsYW1pc3BsdXMub3JnIiwiYXV0aCI6IlN1cGVyIEFkbWluIiwibmFtZSI6Ikd1ZXN0IEd1ZXN0IiwiZXhwIjoxNzEyMDcyMjAzfQ.RmqylQRMwNVmbSLctK9UeAQ4XzfxUpiRkXAmVjvmb7B8i5C6cnNyZnsJSeMK4sUh8OAJ1R8WATqv2dfKlF4KWg"
    : new URLSearchParams(window.location.search).get("jwt");