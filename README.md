# Webtools Example Application

## Background

This is a small laravel/react/antd application created by the Webtools team to dispaly a list of tasks to a user.

### Candidate Requirements

Please extend the application to allow a user to do the following

- Add the ability to categorize and tag the tasks
- Fix any bugs that you notice along the way

## Repo Setup Steps

2. Clone this repo
2. Create a new private repo and push to GitHub
3. Make changes as required below
4. Share with GitHub users `karl-d` and `kibbonz`


## Backend Setup Steps

### Pre-requisites

- PHP 8.3 or higher installed on the machine

### Steps

1. Setup the SQLITE DB
   1. Create the DB `touch database/database.sqlite`
   2. Update DB_DATABASE in the .env file to `<ABSOLUTE_PATH>/database/database.sqlite`
3. `composer install`
4. `php artisan migrate --seed`
5. `php artisan serve` (Run the dev server)


## Frontend Setup Steps

### Pre-requisites

- Node 20 or higher installed on the machine

### Steps

1. `npm install`
2. `npm run dev` (Run the dev server)