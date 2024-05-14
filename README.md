<img src="./images/logo.sample.png" alt="Logo of the project" align="right">

# CMSO Superplatform (Backend) 
> Repository for CMSO Website (Backend)


|      | Version | Note |
| ---- | ------- | ---- |
| Dev  | v2.1    |      |
| Prod | v1      |      |

**Before committing to the repo, make sure that you are working in the `feat/*` directory**


## Installing / Getting started

Clone this git and run this commands in the main directory to download dependencies

```shell
npm install 
```

Then, copy .env_example to be .env and add the data to each variable.

After that, initiate your database and create new database named 'cmso_db'

Finally, run this command to sync the database schema with prisma

```shell
npm run dbsync 
```

## Developing

### Built With

- Express
- mariadb (depricated after v1 obsolete)
- Prisma

### Prerequisites

Don't forget to install

- VS Code
- Postman
- Xampp
- Git manager (Sourcetree)


### To run development server:

Run this commands in the main directory to run a development server

```shell
npm run dev 
```

Server automatically restart when user save the files.


### Deploying / Publishing

After finishing develop the feature, make a merge request from `feat/*` to `dev` branch.
Your senior will test the feature and make a docs before approved your request.