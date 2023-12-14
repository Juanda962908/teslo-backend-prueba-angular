import * as bcrypt from 'bcrypt'
import { CreateUserDto } from "../../../../modules/auth/dto/create-user.dto";


interface ISeedUserData {
    users: CreateUserDto[];
}


export const initialUsers: ISeedUserData = {
    users: [
        {
            name: 'Andres Molina',
            email: 'andres@google.com',
            password: bcrypt.hashSync('123456',10),
            role: 'admin'
        },
        {
            name: 'Juan Daniel De la hoz',
            email: 'juanda@google.com',
            password: bcrypt.hashSync('123456',10),
            role: 'client'
        },
        {
            name: 'Angela Espinoza',
            email: 'angela@google.com',
            password: bcrypt.hashSync('123456',10),
            role: 'member'
        }
    ]
};
