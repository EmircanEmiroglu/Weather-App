1. API is provided by https://openweathermap.org/ to get the weather information.

2. Project includes
    - Node.js using Express.js
    - Axios for making HTTP requests
    - EJS for templating

3. Create a config.js file in the main directory and an object in it. Then, export the object.
    const config = {
        API_KEY : "Api_Key_You_Get"
    };
    export { config };

4. In the console, type
    - "npm i" to install the dependencies and node_modules folder
    - "nodemon index.js" or "node index.js" to start the server (port: 3000)