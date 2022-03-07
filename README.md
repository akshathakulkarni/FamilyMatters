# Family Matters

Family Matters is a project implemented with PREN stack (PostgreSQL, React, Express, Node JS). 
This project allows users to create an account, add family members, create events, lists, recipes, contacts and even to have a weekly meal planner. Each feature allows creating, updating and deleting. With the help of this webapp, a family can manage all of her day to day schedule all in one place. 

Here is a snap shot of the app's view on the browser : 

## Screenshots
!["Family Matters Homepage"](docs/homepage.png)
!["Family Matters Events"](docs/events.png)
!["Family Matters Recipes"](docs/recipes.png)
!["Family Matters Contacts"](docs/contacts.png)
!["Family Matters Meal planner"](docs/mealplanner.png)

## Getting Started

1. Install dependencies with `npm install`.
2. Create a local db in postgers with the following information :
      username: project
      password: project
      database: final
      (or update .env with your local information)
3. run db file for creating DB and installing seeds `npm run db:reset`
4. run server from Server folder - Instructions below
5. run client from Client folder - Instructions below

## Running Development Server

```sh
npm run local 
```
## Running Development Client

```sh
npm start
```
