import { ForbiddenException, Injectable } from "@nestjs/common";
import {User, Note} from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDTO } from "./dto";
import * as argon from "argon2";

@Injectable({})
export class AuthService {
    constructor(private prismaService: PrismaService) {
    }
    async getUser(): Promise<string> {
        console.log(11111111111)
        return "user"; 
    }
    async registerUser(data: AuthDTO): Promise<any> {
        console.log(`registerUser: ${JSON.stringify(data)}`)
        const hashedPassword = await argon.hash(data.password);
        console.log({hashedPassword});
        try {
            const user = await this.prismaService.user.create({
                data: {
                    email: data.email,
                    hashedPassword,
                    firstName: 'Truong',
                    lastName: 'Nguyen',
                    updatedAt: new Date(),
                    createdAt: new Date()
                    // password: hashedPassword,
                }
            });
            return user;
        } catch (error) {
            throw new ForbiddenException(error.message)
        // return `Register error: ${JSON.stringify(error)}`
            
        }
        
    }
    async login(data: AuthDTO): Promise<any> {
        console.log(`loginUser: ${JSON.stringify(data)}`)
        const user = await this.prismaService.user.findUnique({
            where: {
                email: data.email
            }
        });
        if(!user){
            throw new ForbiddenException("User is not exist")
        }
        const passwordMatched = await argon.verify(user.hashedPassword, data.password)
        if(passwordMatched){
            delete user.hashedPassword;
            return user;
        }
        throw new ForbiddenException("Wrong password")
        // return `Login ${JSON.stringify(data)}`
    }
}
//