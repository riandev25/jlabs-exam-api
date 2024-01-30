// const http = require('http');
// const PORT = 3001;

// const server = http.createServer((req, res) => {
//   const allowedOrigin = 'http://localhost:3000';
//   console.log(`Received ${req.method} request to ${req.url}`);
//   // Set CORS headers
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Methods', 'POST');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

//   // Set response headers
//   res.setHeader('Content-Type', 'application/json');

//   // Handle the POST request for login
//   if (req.method === 'POST' && req.url === '/api/login') {
//     // Parse incoming data
//     console.log('triggered');
//     let data = '';
//     req.on('data', (chunk) => {
//       data += chunk;
//     });

//     req.on('end', () => {
//       try {
//         // Parse JSON data
//         const { email, password } = JSON.parse(data);

//         if (email === 'test@example.com' && password === 'password123') {
//           res.statusCode = 200;
//           res.end(
//             JSON.stringify({ success: true, message: 'Login successful!' })
//           );
//         } else {
//           res.statusCode = 401;
//           res.end(
//             JSON.stringify({
//               success: false,
//               error: 'Invalid email or password.',
//             })
//           );
//         }
//       } catch (error) {
//         res.statusCode = 400;
//         res.end(
//           JSON.stringify({ success: false, error: 'Invalid JSON payload.' })
//         );
//       }
//     });
//   } else {
//     res.statusCode = 404;
//     res.end(JSON.stringify({ error: 'Not Found' }));
//   }
// });

// server.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });

const http = require('http');
const PORT = 3001;

const server = http.createServer((req, res) => {
  const allowedOrigin = 'http://localhost:3000';
  console.log(`Received ${req.method} request to ${req.url}`);

  // Set CORS headers for preflight requests
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', allowedOrigin);
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.statusCode = 200;
    res.end();
    return;
  }

  // Set CORS headers for actual requests
  res.setHeader('Access-Control-Allow-Origin', allowedOrigin);
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Set response headers
  res.setHeader('Content-Type', 'application/json');

  // Handle the POST request for login
  if (req.method === 'POST' && req.url === '/api/login') {
    // Parse incoming data
    let data = '';
    req.on('data', (chunk) => {
      data += chunk;
    });

    req.on('end', () => {
      try {
        // Parse JSON data
        const { email, password } = JSON.parse(data);

        if (email === 'test@example.com' && password === 'password123') {
          res.statusCode = 200;
          res.end(
            JSON.stringify({ success: true, message: 'Login successful!' })
          );
        } else {
          res.statusCode = 401;
          res.end(
            JSON.stringify({
              success: false,
              error: 'Invalid email or password.',
            })
          );
        }
      } catch (error) {
        res.statusCode = 400;
        res.end(
          JSON.stringify({ success: false, error: 'Invalid JSON payload.' })
        );
      }
    });
  } else {
    res.statusCode = 404;
    res.end(JSON.stringify({ error: 'Not Found' }));
  }
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
