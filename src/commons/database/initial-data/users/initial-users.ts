import { CreateUserAuthDto } from "../../../../modules/auth/dto/create-user-auth.dto";


interface ISeedUserData {
  users: CreateUserAuthDto[];
}


export const initialUsers: ISeedUserData = {
  users: [
    {
      name: 'Andres Molina',
      email: 'andres@google.com',
      password: '123456',
      role: 'admin'
    },
    {
      name: 'Juan Daniel De la hoz',
      email: 'juanda@google.com',
      password: '123456',
      role: 'client'
    },
    {
      name: 'Angela Espinoza',
      email: 'angela@google.com',
      password: '123456',
      role: 'member'
    }
  ]
};
