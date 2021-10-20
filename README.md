# lumen-react-project
## _Backend as Lumen rest API and frontend Recat js_

Lets Start with project. First we need cloned or download project file into local web server directory and then set a virtual host for them.
(eg:- http://lumen-rest-api/ that i created for my local environment) 
Note: Do not use php server like artisan or else because they are single threaded and you will face issue while you use internal api calling via CURL or Guzzel.

For authantication i use Passport

then we need to download dependencies using 
```sh
composer update
```
then set up database credential in .env file

and then run migration
```sh
php artisan migrate 
```

here are few api url for data processing..
- <local-url>/api/login 
- <local-url>/api/logout
- <local-url>/api/register
- <local-url>/api/users

## API Features and usage
### <local-url>/api/login
#### request:

 ```sh
email:murazik.dario@example.net
password:123456
```
#### response:

 ```sh
{
    "token_type": "Bearer",
    "expires_in": 31536000,
    "access_token": "XXXXXXXXXXXXXXXXXXXXXXXXXXX",
    "refresh_token": "XXXXXXXXXXXXXXXXXXXXXXX"
}
```
### <local-url>/api/logout
#### request:
 ```sh
Authorisation: bearer XXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```
### <local-url>/api/register
#### request:
 ```sh
email:rony.dariooo@gmail.net
password:123456
name:rony
```
#### response:
 ```sh
{
    "token_type": "Bearer",
    "expires_in": 31536000,
    "access_token": "XXXXXXXXXXXXXXXXXXXXXXXXXXX",
    "refresh_token": "XXXXXXXXXXXXXXXXXXXXXXX"
}
```
### <local-url>/api/users
#### request:
 ```sh
Authorisation: bearer XXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```
#### response:
 ```sh
[
    {
        "id": 1,
        "name": "Ardella Dooley",
        "email": "murazik.dario@example.net",
        "created_at": "2021-10-13T11:39:35.000000Z",
        "updated_at": "2021-10-13T11:39:35.000000Z"
    },
    {
        "id": 2,
        "name": "Mr. Derek Sawayn I",
        "email": "vbotsford@example.com",
        "created_at": "2021-10-13T11:39:35.000000Z",
        "updated_at": "2021-10-13T11:39:35.000000Z"
    }
]
```

## Frontend set up
Move to frontend directory via CD command
after moved into a directory 
```sh
npm start
```
it will automatically start development server
