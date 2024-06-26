export const FirebaseAuthErrors = (err: string) => {
  switch (err) {
    case 'auth/email-already-exists':
      return 'Email already exists'
    case 'auth/internal-error':
      return 'Internal error'
    case 'auth/invalid-credential':
      return 'You\'re not registered!'
    case 'auth/invalid-email':
      return 'Invalid email'
    case 'auth/invalid-email-verified':
      return 'Please verify your email to login'
    case 'auth/invalid-password':
      return 'Invalid password'
    case 'auth/weak-password':
      return 'Password is too weak, password should be at least 6 characters long'
    default:
      return 'An error occurred'
  }
}
