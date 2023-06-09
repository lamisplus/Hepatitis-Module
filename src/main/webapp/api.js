export const  token = (new URLSearchParams(window.location.search)).get("jwt")
export const url = '/api/v1/'
// export const url =  'http://localhost:8787/api/v1/';
// export const  token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWVzdEBsYW1pc3BsdXMub3JnIiwiYXV0aCI6IlN1cGVyIEFkbWluIiwibmFtZSI6Ikd1ZXN0IEd1ZXN0IiwiZXhwIjoxNjg1NzAwNDg5fQ.wAWpMg2cOxKQYO6hJRRyNGai3GI9_NEQ0U5B4KzI4ix8j7VaajHXZ4YLyWsZYORcUzJbG2FupZcxQbH2bTFUiQ';