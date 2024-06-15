const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv')
const User = require('./models/user'); 
const authRoute = require('./routes/auth');
const leaveRequestRoutes = require('./routes/leaveRequests');
const adminRoutes = require('./routes/admin')

dotenv.config();
const app = express();

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

app.use('/api', authRoute);
app.use('/api/admin',adminRoutes);
app.use('/api/leave-requests', leaveRequestRoutes);

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('Connected to MongoDB');

    await insertInitialData(); // Insert initial data (example)

    app.listen(5000, () => {
      console.log('Server is listening on port', 5000);
    });
  })
  .catch(err => {
    console.error('Error connecting to MongoDB', err);
  });

  async function insertInitialData() {
    try {
      // Check if users already exist
      const existingUsers = await User.find();
      if (existingUsers.length === 0) {
        // Hash passwords
        const hashedPasswordAdmin = await bcrypt.hash('adminpassword', 10); // Replace 'adminpassword' with actual admin password
        const hashedPasswordEmployee = await bcrypt.hash('employeepassword', 10); // Replace 'employeepassword' with actual employee password
  
        // Sample users data with hashed passwords
        const users = [
          {
            email: 'admin@example.com',
            password: hashedPasswordAdmin,
            role: 'admin'
          },
          {
            email: 'employee1@example.com',
            password: hashedPasswordEmployee,
            role: 'employee'
          },
          {
            email: 'employee2@example.com',
            password: hashedPasswordEmployee,
            role: 'employee'
          }
        ];
  
        // Insert users into the database
        const insertedUsers = await User.insertMany(users);
        console.log('Initial data inserted:', insertedUsers);
      }
    } catch (error) {
      console.error('Error inserting initial data:', error);
    }
}
