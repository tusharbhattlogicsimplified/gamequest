
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
  
    return null; 
  };


  export const storeUserInLocalStorage = (newUser: { username: string, password: string }) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
  
    const userExists = users.some((user: { username: string }) => user.username === newUser.username);
  
    if (userExists) {
      console.error("User already exists.");
      return false; 
    }
  
    users.push(newUser);
  
    localStorage.setItem('users', JSON.stringify(users));
    return true;
  };

  export const checkUserExists = (username: string, password: string): boolean => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
  
    const userFound = users.some((user: { username: string, password: string }) => user.username === username && user.password === password);
  
    return userFound;
  };
  
  