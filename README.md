# Intelligent Prep
All of Soma's exam prep platform code

## Getting Started
1. [Download PostresSQL](https://www.postgresql.org/download/) if you don't have it installed locally. If you have it installed locally, skip to step 3.
Note: If on Mac, you can also install PostgreSQL using Homebrew.
2. Open the installer and follow the instructions to install PostgresSQL locally. Make a note of your username and password. If you need to create a Database, name it `intelligentprep`. Here is an [example](https://www.postgresqltutorial.com/install-postgresql-macos/) for installing PostgresSQL on Mac.
3. Create a new Database for the application (if not created in Step 2):
* Open PSQL on your terminal by typing `psql -d postgres`
* Type `CREATE DATABASE intelligentprep;` then `exit;`. Note: DB name must be lowercase.
4. Navigate to the `api/src/sql` directory and run the following commands:  
* Open the PSQL terminal by typing `psql intelligentprep`
* Type `\i sql/dbInit.sql`to create and populate tables. Once completed `exit;`
5. While on the `api/` directory, create a new `.env` file and add the following variable: `DATABASE_URL = "postgres://<your-psql-username>:'<your-psql-password>'@localhost:5432/intelligentprep"`
6. Test that your backend server and postgres was set up correctly by:
* Navigate to the backend directory and 1) Install node modules `yarn install` 2) start the backend server `yarn start`
* Send a request via your browser (or Postman) to `http://localhost:4000/testdb`
* If everything went smoothly, you should see subjects in the subjects table.
7. Navigate to api or frontend and start coding!
