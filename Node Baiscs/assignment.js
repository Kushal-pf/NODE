const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    if (req.url === '/' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`
            <html>
                <head><title>Node.js Assignment</title></head>
                <body>
                    <h1>Welcome to the Node.js Server!</h1>
                    <form action="/create-user" method="POST">
                        <input type="text" name="username" placeholder="Enter username" required>
                        <button type="submit">Submit</button>
                    </form>
                </body>
            </html>
        `);
    } else if (req.url === '/users' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`
            <html>
                <head><title>Users</title></head>
                <body>
                    <h2>List of Users</h2>
                    <ul>
                        <li>User 1</li>
                        <li>User 2</li>
                        <li>User 3</li>
                    </ul>
                    <a href="/">Go Back</a>
                </body>
            </html>
        `);
    } else if (req.url === '/create-user' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            const username = new URLSearchParams(body).get('username');
            console.log(`New user submitted: ${username}`);

            res.writeHead(302, { 'Location': '/' });
            res.end();
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Page Not Found');
    }
});

server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
