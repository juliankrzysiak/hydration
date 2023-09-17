<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a name="readme-top"></a>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/CastillejaCode/water-schedule">
    <img src="./client/public/android-chrome-512x512.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">Hydration</h3>

  <p align="center">
   A watering schedule for your plants.
    <br/>
  Keeps track of when you need to water your plants based on provided schedules.
    <br/>
  Uses a monthly calendar to easily keep tabs on when your babies need some hydration. 
    <br />
    <br />
    <a href="https://water-schedule.pages.dev">View Demo</a>
    ·
    <a href="https://github.com/CastillejaCode/water-schedule/issues">Report Bug</a>
    ·
    <a href="https://github.com/CastillejaCode/water-schedule/issues">Request Feature</a>
  </p>
</div>

<!-- ABOUT THE PROJECT -->
## About The Project
Desktop              |  Mobile 
-------------------------|-------------------------
<img src="https://imgur.com/7A0fjZg.png" alt="Desktop screenshot">  |  <img src="https://imgur.com/kSvC2mO.png" alt="Mobile screenshot">

### Built With

<a href="https://www.typescriptlang.org/">  
<img alt="Typescript Static Badge" src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=ffffff" height="50">
</a>
<br/>
<a href="https://react.dev/">  
<img alt="React Static Badge" src="https://img.shields.io/badge/React-23272f?style=for-the-badge&logo=react" height="50">
</a>
<br/>
<a href="https://tailwindcss.com/">  
<img alt="Tailwind Css Static Badge" src="https://img.shields.io/badge/Tailwind%20CSS-2A233E?style=for-the-badge&logo=tailwindcss&logoColor=0EA5E9&color=%230f172a" height="50">
</a>
<br/>
<a href="https://expressjs.com/">  
<img alt="Express Static Badge" src="https://img.shields.io/badge/Express-ffffff?style=for-the-badge&logo=express&logoColor=000000" height="50">
</a>
<br/>
<a href="https://www.postgresql.org/">  
<img alt="PostGreSQL Static Badge" src="https://img.shields.io/badge/PostGreSQL-212121?style=for-the-badge&logo=postgresql" height="50">
</a>
<br/>


### How It's Made

I wanted to build a simple one-page personal website, and with each new project I might as well learn something new.

So I picked Astro, a framework utilzing server-side rendering for static sites, which was the perfect use case for me; a small, fast, simple website.
It didn't take too long to code, everything was HTML and CSS, great for speed. The only JS I have is dedicated to controlling the light/dark mode. 

### Optimizations

Using server-side rendering along with just Hml and Css makes the website pretty fast already. The included images are also optimized by Astro. 

Designing the whole website for both mobile and desktop, in both light and dark mode, was very beneficial. I can mess up and develop the design much faster in Figma,
and then I just have to copy the design over. The design is also more coherent and clean. 

Also, I had to change some things in order to be more accessible; I would rather have a more accessible site than a "pretty" aesthetic. 
I was going to add some superfluous animtaions and the like, but at the end of the day, this website is just for information.


### Learning Outcomes

| The Good                               | The Bad                                              | The Ugly |
|----------------------------------------|------------------------------------------------------|----------|
| New framework was easy to implement    | Config for prettier and Astro was confusing at first |          |
| Designing beforehand, not while coding | Figuring out dark mode logic                         |          |
| Added dark mode                        |                                                      |          |
| Responsive design                      |                                                      |          |

<!-- GETTING STARTED -->
## Getting Started

If you want to get a local copy runnning for some reason, here you go.

### Prerequisites

* pnpm
  ```
  npm install -g pnpm
  ```

### Installation

1. Clone the repo
   ```
   git clone https://github.com/CastillejaCode/portfolio.git
   ```
2. Install NPM packages
   ```
   pnpm install 
   ```
3. Run local development server
   ```
   pnpm dev
   ```
 4. Switch out my info for yours

    For projects, you can just replace the array with your project objects, and they will be automatically created



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<!-- CONTACT -->
## Contact

Julian Krzysiak - jkrzysiak13@gmail.com

<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* Favicon generator - [favicon.io](https://favicon.io/)
* Icons - [Hero Icons](https://heroicons.com/)
* Readme Template - [Best-README-Template](https://github.com/othneildrew/Best-README-Template)

<p align="right">(<a href="#readme-top">back to top</a>)</p>




# Hydration
Watering Schedule for your plants.

Keeps track of when you need to water your plants based on provided schedules.

Uses a monthly calendar to easily keep tabs on when your babies need some hydration.

**Link to running project:** https://water-schedule.pages.dev

![Project Photo - Mobile](https://i.imgur.com/gfErxUa.png)
![Project Photo - Desktop](https://i.imgur.com/mdYoW3r.png)


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

The Good

* More organized file structure for easier navigation and scalability
* The importance of routing for easier UX and DX
* Learning to deploy the frontend and backend separately and to different providers
* Creating a CI/CD pipeline for easier deployment and lowering the possibility of bugs being pushed into prod
* Trying out new technologies that lead to a better DX, making future projects more efficient and more enjoyable to work with
* SQL is great, I will probably stick with relational databses from now on
* It is very satisfying creating a project that I will use in my daily life
* 


The Bad 

* I should have designed the website from the beginning, designing while developing wastes time and leads to less coherent designs




# Hydration
Watering Schedule for your plants.

Keeps track of when you need to water your plants based on provided schedules.

Uses a monthly calendar to easily keep tabs on when your babies need some hydration.

**Link to running project:** https://water-schedule.pages.dev

![Project Photo - Mobile](https://i.imgur.com/gfErxUa.png)
![Project Photo - Desktop](https://i.imgur.com/mdYoW3r.png)


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

The Good

* More organized file structure for easier navigation and scalability
* The importance of routing for easier UX and DX
* Learning to deploy the frontend and backend separately and to different providers
* Creating a CI/CD pipeline for easier deployment and lowering the possibility of bugs being pushed into prod
* Trying out new technologies that lead to a better DX, making future projects more efficient and more enjoyable to work with
* SQL is great, I will probably stick with relational databses from now on
* It is very satisfying creating a project that I will use in my daily life

The Bad 

* I should have designed the website from the beginning, designing while developing wastes time and leads to less coherent designs

