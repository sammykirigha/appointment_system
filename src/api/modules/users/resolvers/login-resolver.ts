import { UserInputError } from "apollo-server-express";
import { Arg, Mutation } from "type-graphql";
import db from "../../../../models";
import bcryptjs from 'bcryptjs'
import { sign } from "jsonwebtoken";
import { LoginUserInput, User } from "../schemas/user";
import * as dotenv from "dotenv"
dotenv.config();

export class LoginResolver {
	@Mutation(returns => User, {
		description: "login patient mutation"
	})
	async loginUser(
		@Arg('input', type => LoginUserInput, {
			description: "login Patients Input"
		})
		input: LoginUserInput,
	): Promise<User | null> {

		const user = await db.logged_in_users.findOne({ where: { email: input.email } })



		if (!user) {
			throw new UserInputError(
				"Invalid credentials "
			)
		}

		const isValid = await bcryptjs.compare(input.password, user.password)

		if (!isValid) {
			throw new UserInputError(
				"Invalid credentials"
			)
		}

        const secret:string  = process.env.SECRET_KEY || 'sammykightgfhgcvbnb';

		const newToken = sign({
			id: user.id,
			status: user.status,
		}, secret, { expiresIn: '24h' })


		user.token = newToken;
		return user;
	}
}