import { auth } from 'firebase-admin';

const validateToken = async (token: string) => {
  try {
    await auth().verifyIdToken(token);
    return true;
  } catch (e) {
    return false;
  }
};

export default validateToken;
