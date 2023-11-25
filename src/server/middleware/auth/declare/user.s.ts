import { User } from '@prisma/client';

declare module 'Express' {
  export interface Request {
    user: User;
  }
}
