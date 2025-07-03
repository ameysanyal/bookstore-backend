## Setup Instructions

1.  Clone the repository
2.  Run `npm install` (it will install all the packages from the `package.json`)
3.  Rename `.env.sample` to `.env` and add all of your environment variable values
4.  Now, Run `npm run dev` command to start the server.

## How to test apis

1.  Access swagger apis docs on this url = `http://localhost:4020/api-docs`
2.  On swagger using Authentication apis, register one user then login using its credentials, it will give jwt token in response
3.  Copy that token and insert it into top right authorize option
4.  Now you can start testing book apis