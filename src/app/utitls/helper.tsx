// src/utils/validatePassword.ts

export const validatePassword = (password: string): string | null => {
    // if (password.length < 8) {
    //   return 'Password must be at least 8 characters long';
    // }
  
    // if (!/[A-Z]/.test(password)) {
    //   return 'Password must contain at least one uppercase letter';
    // }
  
    // if (!/[a-z]/.test(password)) {
    //   return 'Password must contain at least one lowercase letter';
    // }
  
    // if (!/[0-9]/.test(password)) {
    //   return 'Password must contain at least one number';
    // }
  
    // if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    //   return 'Password must contain at least one special character';
    // }
  
    // if (/\s/.test(password)) {
    //   return 'Password must not contain whitespace';
    // }
  
    return null; // Valid password
  };


  export const storeUserInLocalStorage = (newUser: { username: string, password: string }) => {
    // Retrieve the current list of users from localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
  
    // Check if the user already exists by username
    const userExists = users.some((user: { username: string }) => user.username === newUser.username);
  
    if (userExists) {
      console.error("User already exists.");
      return false; // User already exists
    }
  
    // Add the new user to the users list
    users.push(newUser);
  
    // Save the updated list of users back to localStorage
    localStorage.setItem('users', JSON.stringify(users));
    return true; // Successfully added
  };

  export const checkUserExists = (username: string, password: string): boolean => {
    // Retrieve the list of users from localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
  
    // Check if a user with the given username and password exists
    const userFound = users.some((user: { username: string, password: string }) => user.username === username && user.password === password);
  
    return userFound;
  };
  
  