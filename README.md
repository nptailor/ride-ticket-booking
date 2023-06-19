# Booking tickets for a ride in a theme park

## Steps to run the project in local
1. Run `npm i` command.
2. Run `npm run start` command.

## Steps to load test the application in local
1. Run `npm i autocannon -g` command to install Autocannon benchmarking tool.
2. Run the application using `npm run start`.
3. Open a new terminal
4. Run command `autocannon -c 50 -p 50 -d 60 http://localhost:3000/ride/details?id=<_id>`, to test the GET endpoint '/ride/details'.
5. Run command `autocannon -c 50 -p 10 -d 60 --body '{"ticket": {"rideId": "<rideId>","userId": "<userId>","riderName": "Molly James","date": "05-27-2023","age": 30}}' -m 'POST' --header 'Content-Type: application/json' http://localhost:3000/ticket/book`, to test the POST endpoint '/ticket/book'
