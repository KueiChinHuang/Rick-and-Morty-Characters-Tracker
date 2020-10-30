> This project is a part of my interview process as well as my #100DaysOfCode progress. I'm opened to any advice and suggestion!

LIVE LINK: [https://rick-and-morty-characters-tracker.kueichinhuang.vercel.app/](https://rick-and-morty-characters-tracker.kueichinhuang.vercel.app/)

# Day 4 of #100DaysOfCode

**Next.js + Docker**

- Install Docker on my Ubuntu VM: [https://docs.docker.com/engine/install/ubuntu/](https://docs.docker.com/engine/install/ubuntu/)
- Create Next.js project and a Dockerfile (Tutorial: Containerize a Next.js app)
- Run docker build to create an image
  - To build the image
    - docker build --tag myImageName .
    - the dot at the end is the path
  - To checkout the images that I built
    - docker images
  - To run my container on port 3333 (So that I can hit my application in a browser at [http://localhost:3333](http://localhost:3333/))
    - docker run -d -p 3333:3000 myImageName
  - or give our process a name
    - docker run -p 3333:3000 --name myContainerName -d myImageName
  - We can see the list of our running containers
    - docker ps
  - or we can see the list of all the containers
    - docker ps -a
- Fetch external API in Next.js project

**Learning Resources**

- Containerize a Next.js app (31 July 2020) [https://thomasgouveia.fr/blog/containerize-next-js.html](https://thomasgouveia.fr/blog/containerize-next-js.html)
- Getting start w/ Next.JS + Docker (09 May 2019) [https://www.ballistiq.com/blog/Getting-started-w-Next-JS-Docker](https://www.ballistiq.com/blog/Getting-started-w-Next-JS-Docker)
- How to Get Started with Docker (Aug 14, 2020) [How to Get Started with Docker](https://youtu.be/iqqDU2crIEQ)

# Day 5 of #100DaysOfCode

**Next.js & SSR**

1. Practice Server-side Rendering (SSR) in Next.js for SEO purpose
2. Filter
3. Next.js + MongoDB

**Learning Resources**

1. Next.js Official Tutorials (latest version) [https://nextjs.org/learn/basics/data-fetching](https://nextjs.org/learn/basics/data-fetching)
2. Static Site Generation (SSG) with external API (at 24:00) (Jan 19, 2018) [Next.js Crash Course - Server Side React](https://youtu.be/IkOVe40Sy0U)
3. Dynamic Routing with external API (Apr 26, 2020) [Making Websites With Next.js And Strapi - [06] - Dynamic Routes](https://youtu.be/RDcW_0iB5UE)
4. Fetching Data in Next.js (Jul 21, 2020) [Next.js 9.3+ Data Fetching Explained: getServerSideProps(), getStaticProps(), and getStaticPaths()](https://youtu.be/eWObYvG0-lI)
5. How to Integrate MongoDB Into Your Next.js App (Sep 10, 2020) [https://developer.mongodb.com/how-to/nextjs-with-mongodb](https://developer.mongodb.com/how-to/nextjs-with-mongodb)

#reactjs #nextjs #SSR #SSG #SEO #API @vercel

# Day 6 of #100DaysOfCode

**Fixing timeout issue**

1. **Issue from yesterday** : Home page would time out due to huge data amount

2. **Goal &amp; Limitation** : Implementing SSR is one of the main resaon of using Next.js, but &quot;getStaticProps()&quot; and &quot;getServerSideProps()&quot; can&#39;t work together in the same page.
3. **Possible Solutions** :

- Implement react package: Infinite Scroll [https://www.npmjs.com/package/infinite-scroll](https://www.npmjs.com/package/infinite-scroll)

  - pros: clean and fast
  - cons: I failed to integrate this package with Next.js SSR solution

- Build the infinite scrolling manually: looks very dirty
- Multiple components for home page: less dirty in my opinion ...

4. **Selected Solution** :
   When user load all the data: go to the page use &quot;getStaticProps()&quot;;
   When user filter something: go to the page use &quot;getServerSideProps&quot;.
   User would feel that they&#39;re on the same page (index page) but they&#39;re actually in different pages when they filter the data.

- HomeIndex component: Doing &quot;getStaticProps()&quot; --\&gt; static data --\&gt; pass to Home component
- HomeFilter component: Doing &quot;getServerSideProps()&quot; --\&gt; fetch data when request --\&gt; pass to Home component
- Home component

5. --\&gt; **Result** : The solution might be horrible but the result is OK. [https://rick-and-morty-characters-tracker.vercel.app/](https://rick-and-morty-characters-tracker.vercel.app/) (This isn&#39;t the end. More is coming up in next few days!)

6. Next.js &amp; API Routes

- I built the back-end application endpoints in pages/api that can fetch my data from external API, but it seems useless because I can&#39;t use that in &quot;getStaticProps()&quot; and &quot;getServerSideProps()&quot;. I currently use some stupid way to get the external data in my library.

# Day 7 of #100DaysOfCode

**API and User Authentication**

1. Tried to use the api endpoint that I set up in my app to fetch the external data for user

--\&gt; failed, because only absolute URL is allowed in pages.

1. User Authentication with Auth0

--\&gt; User can login/logout, but I gonna try to store user&#39;s session info using useContext tomorrow.

--\&gt; The user authentication in the server-less model is not the same as MERN stack so I had a hard time figuring out a better practice of authentication in Next.js.

**Learning Resources**

1. The Ultimate Guide to Next.js Authentication with Auth0 (October 10, 2019) [https://auth0.com/blog/ultimate-guide-nextjs-authentication-auth0/](https://auth0.com/blog/ultimate-guide-nextjs-authentication-auth0/)
2. @auth0/nextjs-auth0 (README.md: 15 days ago) [https://github.com/auth0/nextjs-auth0](https://github.com/auth0/nextjs-auth0)

#reactjs #nextjs #SSR #SSG #SEO #API @vercel

# Day 8 of #100DaysOfCode

**User Sessions**

1. Dump Auth0 and use useContext (temporary) for user session
2. Use mongoose for data schema
3. Live Link: [https://rick-and-morty-characters-tracker-44d4hr16r.vercel.app/](https://rick-and-morty-characters-tracker-44d4hr16r.vercel.app/)
4. Magic could be another solution for authentication with Next.js
5. Redirect in &#39;react-router-dom&#39; is router.push(href) in Next.js!

**Learning Resources**

1. User session with useContext in Next.js (Sep 06, 2019) [https://reacttricks.com/sharing-global-data-in-next-with-custom-app-and-usecontext-hook/](https://reacttricks.com/sharing-global-data-in-next-with-custom-app-and-usecontext-hook/)
2. A more modern way to useContex in Next.js (3 months ago) [https://kaloraat.com/articles/nextjs-react-context-tutorial-how-to-use-context-api-with-nextjs](https://kaloraat.com/articles/nextjs-react-context-tutorial-how-to-use-context-api-with-nextjs)
3. NextJS + MongoDB (Mar 26, 2020) [Build an app with NextJS and MongoDB - Part 1](https://youtu.be/tt9hws5JGRc)
4. Redirect in Next.js [https://nextjs.org/docs/api-reference/next/router#routerpush](https://nextjs.org/docs/api-reference/next/router#routerpush)

#reactjs #nextjs #SSR #SSG #SEO #API @vercel

# Day 9 of #100DaysOfCode

**Users and their favorites**

1. User can login/logout
2. User can add/remove the character to/from their favorite collection (External API + my MongoDB)

**Learning Resources**

1. If fetching data on client side, SWR is super fast --\&gt; [React Hooks SWR: Fetch, Cache and ReValidate server data with SWR and Axios](https://youtu.be/a7JigiLw_OY)

# Day 10 of #100DaysOfCode

**First State Finished**

1. Styles
2. User can only see the filter when they log in
3. User can only add favorite when they log in
