import { UserInputError } from "apollo-server-express";
import { Arg, Mutation, Resolver } from "type-graphql";
import db from "../../../../models";
import { ConfirmEmailInput } from "../schemas/user";
import crypto from 'crypto';

@Resolver()
export class ConfirmEmailResolver {
	@Mutation(returns => String, {
		description: "confirm your email"
	})
	async confirmPassword(
		@Arg('input', type => ConfirmEmailInput, {
			description: "confirm user email input"
		})
		{ token }: ConfirmEmailInput
	): Promise<string> {

		const hashedAuthToken = crypto
			.createHash("sha256")
			.update(token)
			.digest("hex");
		
		const user = await db.logged_in_users.findOne({where:{confirmToken: hashedAuthToken}})

		if (!user) {
			throw new UserInputError(
				"User not found...."
			)
		}

		user.confirmed = true;
		user.confirmToken = null;
		await user.save();

		return "You can continue to log in with your credentials...."

	}
}