// fetches installation id

/*
You can also use the REST API to find the ID for an installation of your app. For example, you can get an installation ID with the GET /users/{username}/installation, GET /repos/{owner}/{repo}/installation, GET /orgs/{org}/installation, or GET /app/installations endpoints. For more information, see REST API endpoints for GitHub Apps.

u can get installation id by username
installation id not super private, can be stored directly in db

user
- id
- email
- profile pic
- installation id
- repos

repo
- user
- clone permission
- name
- url
*/