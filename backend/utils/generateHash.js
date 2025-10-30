const bcrypt = require('bcryptjs');

// Generate hash for default admin password
const password = 'Admin@123';

bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
        console.error('Error generating hash:', err);
        return;
    }
    console.log('Password:', password);
    console.log('Hash:', hash);
    console.log('\nUse this hash in your database schema for the default admin user.');
});
