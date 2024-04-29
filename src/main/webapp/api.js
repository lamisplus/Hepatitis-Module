export const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8383/api/v1/"
    : "/api/v1/";
export const token =
  process.env.NODE_ENV === "development"
    ? "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWVzdEBsYW1pc3BsdXMub3JnIiwiYXV0aCI6IlN1cGVyIEFkbWluIiwibmFtZSI6Ikd1ZXN0IEd1ZXN0IiwiZXhwIjoxNzE0MzQ4MzE4fQ.UqWd0jAN5NmKQARyWfdexVSkhOU6GH6alFY0hLhMYG6TUFgOi-iByrGJta0nzoWvaxieqn6I__1r7_wj0LH7zA"
    : new URLSearchParams(window.location.search).get("jwt");