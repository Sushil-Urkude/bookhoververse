import { hash } from 'bcrypt';

async function generateHash(password: string) {
  const hashedPassword = await hash(password, 10);
  console.log('Store this hash in your ADMIN_PASSWORD_HASH environment variable:');
  console.log(hashedPassword);
}

// Replace 'your_admin_password' with the actual password you want to use
generateHash('your_admin_password'); 