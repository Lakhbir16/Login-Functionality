const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');

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

// Passport Local Strategy
passport.use(new LocalStrategy(
    { usernameField: 'email', passwordField: 'pass' }, // Match POST request field names
    (email, password, done) => {
        connection.query('SELECT * FROM user_data WHERE email = ?', [email], (err, results) => {
            if (err) { return done(err); }
            if (results.length === 0) {
                return done(null, false, { message: 'Incorrect email.' });
            }

            const user = results[0];
            if (password === user.password) {
                return done(null, user);
            } else {
                return done(null, false, { message: 'Incorrect password.' });
            }
        });
    }
));

passport.serializeUser((user, done) => {
    done(null, user.email);
});

passport.deserializeUser((email, done) => {
    connection.query('SELECT * FROM user_data WHERE email = ?', [email], (err, results) => {
        if (err) { return done(err); }
        done(null, results[0]);
        // console.log(results)
    });
});

// Routes
app.get("/", (req, res) => {
    res.send("Hey client !");
});

app.post("/login",
    passport.authenticate('local', {
      successRedirect: '/user',
      failureRedirect: '/unauth'
    })
  );

app.post("/login", (req, res) => {
    const { email, pass } = req.body;
    connection.query('SELECT * FROM user_data WHERE email = ?', [email], (err, results) => {
        if (err) {
            res.status(500).send("An error occurred");
            return;
        }

        if (results.length === 0) {
            res.status(401).send("Incorrect email or password");
            return;
        }

        const user = results[0];
        if (pass === user.password) {
            req.login(user, (err) => {
                if (err) {
                    res.status(500).send("An error occurred during login");
                    return;
                }
                res.send(user); // Respond with the user data
            });
        } else {
            res.status(401).send("Incorrect email or password");
        }
    });
});

app.get("/test", (req, res) => {
    let {email="not fount"}= req.cookies;
    const cookieValue = req.cookies;
    res.send(cookieValue)

});

app.get('/user', (req, res) => {
    
    res.json(req.user)
    console.log(req.user)

  });

  app.get('/unauth', (req, res) => {
    
    res.send("Unautherized acccess")

   
  });

  app.get('/logout',(req,res)=>{
        req.logout((err) => {
          if (err) {
            return next(err);
          }

          req.session.destroy((err) => {
            if (err) {
              return next(err);
            }
            res.redirect('/login');
          });
        });
  })


const port = 3001;
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
