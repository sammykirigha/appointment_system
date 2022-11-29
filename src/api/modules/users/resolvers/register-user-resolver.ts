import { UserInputError } from "apollo-server-express";
import { Arg, Mutation, Resolver } from "type-graphql";
import db from "../../../../models";
import { CreateUserInput, User } from "../schemas/user";
import bcryptjs from 'bcryptjs';
import { sign } from "jsonwebtoken";
import crypto from 'crypto';
import sendMail from "../../../utils/sendEmail";
import loadTemplate from "../../../utils/loadEmailTemplate";
import { ISecret } from "../../../common/interfaces/secret";
import * as dotenv from "dotenv"
dotenv.config();

@Resolver()
export class RegisterUserResolver {
	
	@Mutation(returns => User, {
		description: "creating user"
	})
	async registerUser(
		@Arg('input', type => CreateUserInput, {
			description: "create user input values"
		})
		input: CreateUserInput
	): Promise<User> {

		const user = await db.logged_in_users.findOne({where: {email: input.email}})

		if (user) {
			throw new UserInputError("User already exists with that email")
		}

		const salt = await bcryptjs.genSaltSync(10)
		const hashedPassword = await bcryptjs.hashSync(input.password, salt);

		const transaction = await db.sequelize.transaction();

		try {
			const user = await db.logged_in_users.create({
				...input,
				password: hashedPassword
			},
				{
					transaction
				}
			)

			if (user) {
				const authToken = crypto.randomBytes(32).toString("hex");
				const hashedAuthToken = crypto
					.createHash("sha256")
					.update(authToken)
					.digest("hex");

				const link = `http://localhost:3000/confirm-email/${authToken}`

				const htmlData = await loadTemplate('email_two', {username: user.username, name: user.username, accountType: user.role, link: link })

				await sendMail({
					from: {
						name: "Doctirs Medical Hospital",
						address: "doctriswork@outlook.com"
					},
					to: `${user.email}`,
					subject: "Confirmation Email",
					text: "Please check your email to confirm before your registration before you continue. The email is valid for 30 min",
					html: htmlData
				}
				)

				transaction.commit();
				user.confirmToken = hashedAuthToken;
				console.log('this user', user);
				
				await user.save()

				const secret:string  = process.env.SECRET_KEY || 'sammykightgfhgcvbnb';

				const token = sign({
					id: user.id,
					email: user.email,
				}, secret, { expiresIn: '24h' })


				user.token = token;
				return user as User;
			} else {
				throw new Error("Could not create the user")
			}
			
		} catch (error) {
           await transaction.rollback();
			throw error;
		}
	}
}