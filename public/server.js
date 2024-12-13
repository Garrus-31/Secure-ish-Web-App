const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const session = require('express-session');
const db = require('./DB');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(session (
    {
        secret: 'Protocol-15',
        resave: false, 
        saveUninitialized: false,
        cookie: 
            {    
                maxAge: 30000,
                httpOnly: true,
            },
    })
);

app.use((req, res, next) => 
    {
        res.set('Cache-Control', 'no-store');
        next();
    });  

const requireAuth = (req, res, next) => 
    {
        if (req.session.user) 
            {
                next();
            } 
        else 
        {
            res.status(401).send('Unauthorized! Please <a href="/">log in</a>.');
        }
};

app.get('/', (req, res) => 
    {
        res.sendFile(__dirname + '/LoginForm.html');
    });

app.get('/register', (req, res) => 
    {
        res.sendFile(__dirname + '/Registration.html');
    });

app.get('/index', requireAuth, (req, res) => 
    {
        res.sendFile(__dirname + '/index.html');
    });

app.get('/style', (req, res) => 
    {
        res.sendFile(__dirname + '/style.css');
    });

app.get('/valid', (req, res) => 
    {
        res.sendFile(__dirname + '/valid.js');
    });

app.get('/background', (req, res) => 
    {
        res.sendFile(__dirname + '/8PVZsSp.jpeg');
    });

app.post('/register', (req, res) => 
    {
        const { Username, Password } = req.body;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(Username)) 
        {
            return res.status(400).send('Invalid username format. Please provide a valid email address.');
        }

    const passwordRegex = /^[A-Za-z][A-Za-z0-9_]{6,15}$/;
    if (!passwordRegex.test(Password)) 
        {
            return res.status(400).send(
            'Invalid password. Password must be 7-16 characters long, start with a letter, and only contain letters, numbers, or underscores.'
        );
        }

    bcrypt.hash(Password, 10, (err, hashedPassword) => {
        if (err) 
            {
                return res.status(500).send('Error Hashing Password');
            }

        const sql = `INSERT INTO users (username, password) VALUES (?, ?)`;
        db.run(sql, [Username, hashedPassword], (err) => 
            {
                if (err) 
                    {
                        if (err.code === 'SQLITE_CONSTRAINT') 
                            {
                                return res
                                .status(400)
                                .send('Username Already Exists. Please Choose Another Username or <a href="/">Login</a>');
                            }
                        return res.status(500).send('Error Inserting User.');
                    }
            res.send('User Registered Successfully! <a href="/">Login</a>');
        });
    });
});

app.get('/check-session', (req, res) => 
    {
        if (req.session && req.session.user) 
            {   
                res.json({ loggedIn: true });
            } 
        else 
            {
                res.json({ loggedIn: false });
            }
    });  

app.post('/login', (req, res) => 
    {
        const { Username, Password } = req.body;

        const sql = `SELECT * FROM users WHERE username = ?`;
db.get(sql, [Username], (err, row) => 
    {
        if (err) 
            {
                return res.status(500).send('Error Retrieving User.');
            }

        if (row) 
            {
                bcrypt.compare(Password, row.password, (err, result) => 
                    {
                        if (err) 
                            {
                                return res.status(500).send('Error Comparing Passwords');
                            }
        if (result) 
            {
                req.session.user = 
                {
                    id: row.id,
                    username: row.username,
                };
          res.send('Login Successful! <a href="/index">Access Dashboard</a>');
            } 
        else 
             {
                 res.status(400).send('Invalid Password. ');
             }
      });
            } 
            else 
                {
                    res.status(400).send('Username Not Found.');
                }
  });
});

app.post('/logout', (req, res) => 
    {
       if (req.session) 
        {
           req.session.destroy((err) => 
            {
                if (err) 
                    {
                        return res.status(500).send('Error Logging Out.');
                    }
    res.clearCookie('connect.sid');
    res.send('You Have Been Logged Out. <a href="/">Log In Again</a>');
  });
}});

app.listen(port, () => 
    {
        console.log(`Server running at http://localhost:${port}`);
});
