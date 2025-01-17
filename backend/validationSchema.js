import {z} from 'zod';

export const signupSchema = z.object({
    firstName  : z.string().min(2).max(30),
    lastName  : z.string().min(2).max(30),
    email  : z.string().min(2).max(30).email(),
    password  : z.string().min(2).max(30).regex(/[A-Za-z0-9]/),

})

export const loginSchema = z.object({
    email : z.string(),
    password : z.string()
})