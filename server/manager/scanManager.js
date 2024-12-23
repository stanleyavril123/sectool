const { v4: uuidv4 } = require('uuid');

class scanManager {
    constructor(scanManager) {
        this.scanManager = scanManager;
    }

    async getUsers() {
        const users = JSON.parse(await this.scanManager.readFile());
        return users;
    }

    async createUser(userData) {
        const token = uuidv4();
        const users = await this.getUsers();
        const storedUser = users.find(user => user.username === userData.username);
        
        if (storedUser) {
            return null;
        }

        const newUser = {
            username: userData.username,
            password: userData.password,
            token: token
        }

        users.push(newUser);
        await this.scanManager.writeData(users);

        return token;
    }

    async logInUser(username, password) {
        try {
            const users = await this.getUsers();
            const storedUser = users.find(user => user.username === username && user.password === password);

            if (!storedUser) {
                return null;                
            }

            const newToken = uuidv4();
            storedUser.token = newToken;
            await this.scanManager.writeData(users);

            return newToken;
        }
        catch (error) {
            // faire message erreur (maybe)
            return null;
        }        
    }

    async logOffUser(userToken) {
        try {
            const users = await this.getUsers();
            const storedUser = users.find(user => user.token === userToken);

            if (!storedUser) {
                return false
            }

            delete storedUser.token;
            await this.scanManager.writeData(users);

            return true;
        }   
        catch(error) {
            // faire message erreur (maybe)
            return false;
        }
    }

    async validateToken(userToken) {
        const users = await this.getUsers();
        const storedUser = users.find(user => user.token === userToken);

        return storedUser ? storedUser : undefined;
    }
}

module.exports = { scanManager };