const App = require('./app');

class Server {
    static start() {
        const app = new App();
        return app;
    }
}

Server.start();