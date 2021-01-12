# shortener-webapp
This is a quick project using Angular with [nebular UI Library](https://github.com/akveo/nebular) and spring-boot e POSTGRESQL

## Running the project in a development server
In order to run the project you have to follow these simple steps.

### frontend
first go to the Angular root folder, install the dependencies running the npm install command

    npm install

then start the development server at `localhost:4200`. using this command on the terminal

    ng serve

### backend

#### POSTGRESQL Database
Create a Postgres Database named `url_shortener`, with the owner being the `postgres` and password being `root`

#### spring-boot project
Import the project as a Maven project/spring-boot project to your IDE, wait for the dependencies to be downloaded and just change the `spring.jpa.hibernate.ddl-auto` under the `urlshortener/src/main/resources/application.properties`
    
    ...
    /* This properties controls whether or not the hibernate should generate the DATABASE tables and relations */
    spring.jpa.hibernate.ddl-auto=create
    ...


start the spring-boot application and it will create the DB for you. After starting for the first time, change the `create` property to `none` like this:

    ...
    
    spring.jpa.hibernate.ddl-auto=none
    ...

 now just run the spring-boot application and it should be all set-up.


The backend was done only using the idea IDE, if you use it, will probably be easier to set up everything. But I guess that you can just open in another IDE and just run the spring-boot application normally.

### production server

The project was not yet set up to a production enviroment.