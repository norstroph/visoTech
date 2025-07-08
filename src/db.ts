import Dexie, {type Table} from 'dexie';
import {Add, GetByEmail, GetCollection} from './db/indexedDb.service';
import type { User } from './@types/User';





export const db = new Dexie('MVDB')
db.version(1).stores({
    user: '++id, email, password',
});

  export const AddUserTable = async (email:string, password:string) =>{
     const newUser: Omit<User, "id"> = {

         email: email,
         password: password,
     };
     return await Add("user",newUser)}
export const GetUserTable = async () =>{
    return await GetCollection("user")
}
 export const  GetMail = async (email:string)=> {
     return await GetByEmail("user", email)
 }


