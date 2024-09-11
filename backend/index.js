const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const jwt = require('jsonwebtoken');

// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
    secret: 'secretkey123',
    resave: false,
    saveUninitialized: false,
    cookie:{
        expires : Date.now() +1000*60*60*24*3,
        maxAge: 1000*60*60*24*3,
        httponly: true
    },
}));


app.use(cors({
    origin: 'http://localhost:5173', // Replace with your client's origin
    credentials: true
  }));
  app.use(express.json());

app.use(passport.initialize());
app.use(passport.session());
const cookieParser = require('cookie-parser');
app.use(cookieParser());

// MySQL connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'testlogin',
    password: '123456',
});

connection.connect((err) => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to database.');
});

const JWT_SECRET = '123456789';

// Passport Local Strategy


// Routes
app.get("/", (req, res) => {
    res.send("Hey client !");
});



app.post('/register', (req, res) => {
    const { email, password } = req.body;
  
    // Check if the email already exists
    connection.query('SELECT * FROM user_data WHERE email = ?', [email], (err, result) => {
      if (err) {
        console.error('Error checking email:', err);
        res.status(500).json({ error: 'Error checking email' });
        return;
      }
  
      if (result.length > 0) {
        res.status(400).json({ error: 'Email already exists' });
        return;
      }
  
      // Generate a JWT token
      const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1h' });
  
      // SQL query to insert data
      const query = 'INSERT INTO user_data (email, password, token) VALUES (?, ?, ?)';
  
      // Execute the query with the provided values
      connection.query(query, [email, password, token], (err, result) => {
        if (err) {
          console.error('Error storing data:', err);
          res.status(500).json({ error: 'Error storing data' });
        } else {
          res.status(200).json({ message: 'User registered successfully', token });
        }
      });
    });
  });
  
  

  app.get("/test", (req, res) => {
   
    res.json({"Name":"Admin"})
    })


// Login route
app.post('/login', (req, res) => {
    const { email, password } = req.body;
   
    // SQL query to check if the email and password match
    const query = 'SELECT * FROM user_data WHERE email = ? AND password = ?';
  
    connection.query(query, [email, password], (err, result) => {
      if (err) {
        console.error('Error checking login:', err);
        res.status(500).json({ error: 'Error checking login' });
        return;
      }
  
      if (result.length == 0) {
        res.status(401).json({ error: 'Invalid email or password' });
        return;
      }
  
      // Generate a new JWT token
      const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1h' });
  
      // Update the token in the database
      const updateTokenQuery = 'UPDATE user_data SET token = ? WHERE email = ?';
      connection.query(updateTokenQuery, [token, email], (err, result) => {
        if (err) {
          console.error('Error updating token:', err);
          res.status(500).json({ error: 'Error updating token' });
          return;
        }
  
        res.status(200).json({ message: 'Login successful', token });
      });
    });
  });
  



app.get('/data',(req,res)=>{

  //access token
  const token = req.headers.authorization?.split(' ')[1];

  console.log(token)
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  // Verify the token
  jwt.verify(token, JWT_SECRET, (err, decoded) => { 

    if (err) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    const { email } = decoded;
    console.log(decoded.email)

    const query = 'SELECT * FROM user_data WHERE email = ?';
  
    connection.query(query, [email], (err, result) => {
      if (err) {
        console.error('Error checking login:', err);
        res.status(500).json({ error: 'Error checking login' });
        return;
      }
    const {email,password}=(result[0])
    res.json(result)
    });



  })
   

  // res.send("working")
})


// app.get('*',(req,res)=>{
//   res.json
// })


const port = 3005;
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
