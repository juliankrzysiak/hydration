# Hydration
Watering Schedule for your plants.

Keeps track of when you need to water your plants based on provided schedules.

Uses a monthly calendar to easily keep tabs on when your babies need some hydration.

**Link to running project:** https://water-schedule.pages.dev/


## How it's Made:
**Core tech used:** HTML, Tailwind CSS, TypeScript, React, Express, SQL

**New tech/libraries used:** Tanstack Query, Zustand, Zod, React Router, Github Actions

*Technologies used in this project are in bold*

For the backend, I utilized the trustworthy **Express**.  
I decided to opt for **SQL** instead of MongoDB this time, as I thought a relational database would be more relevant for the data stored. 
I could have used an ORM, but for learning purporses I just wanted to learn raw SQL queries (specifically **PostgreSQL**) rather than use an abstraction. 
I also implemented testing for the REST calls to ensure a working API. 

For the frontend, I used the usual React.  
For state management, I opted for **Zustand** instead of Redux w/ RTK. Much simpler to use. 
For data fetching and caching, I opted for **Tanstack Query** instead of RTK Query. 
Similar in performance, and while RTK seems a bit more flexible, Tanstack Query was much simpler to use and got the job done the same, so I will most likely use this for future projects. 
I also wanted to use navigable pages, so I added **React Router** for routing purposes.

Due to the larger scope of the project, I drew inspiration from [Bulletproof React](https://github.com/alan2207/bulletproof-react) for restructuring my frontend file structure. 
In essence, I broke down specific portions of the project into different features, where one could find all the relevant components, libs, utils, etc.

I also wanted to focus on creating a more streamlined deployment process, so I created a CI/CD pipeline using **Github Actions**. 
It tests and lints the code, deploys the client or server based on the changed files, and further creates tags for easier tracking of any potential issues. 

## Optimizations

Initially I had formulated the API so that one POST call would be needed to mark one plant as watered. 
I then implemented a button where one could mark all the plants for one day at the same time, as to not have to click on every single plant. 
But initially I had just made a forEach loop on the all the plants, so I was making many singular POST calls in succession... so I just changed the API so that it would accept an array, so that only one query would have to be made. 

I refactored the code to remove extraneous usage of global state management. The usage of routing allowed me to move away from this reliance I had done earlier in a SPA. 
I only use zustand now for communicating the calendar date to all other components, and the toast notification whenever a query is completed. 

The use of Tanstack Query, which includes caching, helps with saving data when the data returned is the same.

In the future, I will move the static assets to a CDN for smaller bundle sizes.

## Learning Outcomes

* More organized file structure for easier navigation and scalability
* The importance of routing for easier UX and DX
* Learning to deploy the frontend and backend separately and to different providers
* Creating a CI/CD pipeline for easier deployment and lowering the possibility of bugs being pushed into prod
* Trying out new technologies that lead to a better DX, making future projects more efficient and more enjoyable to work with
* SQL is great, I will probably stick with relational databses from now on
* I should have designed the website from the beginning, designing while developing wastes time and leads to less coherent designs
* It is very satisfying creating a project that I will use in my daily life

