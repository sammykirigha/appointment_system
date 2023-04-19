import { UserInputError } from "apollo-server-express";
import { Arg, Mutation, Resolver } from "type-graphql";
import db from "../../../../models";
import bcryptjs from 'bcryptjs'
import crypto from 'crypto';
import { Op } from "sequelize";
import { PasswordResetInput } from "../schemas/user";

@Resolver()
export class ResetPasswordResolver {
	@Mutation(returns => String, {
		description: "reset users password"
	})
	async resetUsersPassword(
		@Arg('input', type => PasswordResetInput, {
			description: "Create Patients Input"
		})
		input: PasswordResetInput
	): Promise<string> {


		const hashedResetToken = crypto
			.createHash("sha256")
			.update(input.token)
			.digest("hex");
		
		console.log(hashedResetToken);
		

		const user = await db.logged_in_users.findOne({
			where:
			{
				passwordResetToken: hashedResetToken,
				passwordResetExpires: {
					[Op.gt]: Date.now()
				}
			}
		})

		if (!user) {
			throw new UserInputError(
				"User not found...."
			)
		}

		const salt = await bcryptjs.genSaltSync(10)
		const hashedPassword = await bcryptjs.hashSync(input.password, salt);

		user.password = hashedPassword;

		user.passwordResetToken = null;
		user.passwordResetExpires = null;

		await user.save()

		return "Your password has been reset successfully"

	}
}