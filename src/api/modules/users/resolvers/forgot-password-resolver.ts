import { UserInputError } from "apollo-server-express";
import { Arg, Mutation, Resolver } from "type-graphql";
import db from "../../../../models";
import crypto from 'crypto';
import sendMail from "../../../utils/sendEmail";
import { ForgotPasswordInput } from "../schemas/user";


@Resolver()
export class ForgotPasswordResolver {
	@Mutation((returns) => String, {
		description: 'Forgot password'
	})
	async forgotUserPasssword(
		@Arg('email', type => ForgotPasswordInput, {
			description: "users input"
		})
		{email}: ForgotPasswordInput
	): Promise<string> {

		const user = await db.logged_in_users.findOne({ where: {email: email } })

		console.log(user);
		
		if (!user) {
			throw new UserInputError("User not found")
		}

		const resetToken = crypto.randomBytes(32).toString("hex") 
		const passwordResetToken = crypto.createHash("sha256").update(resetToken).digest("hex") 

		const passwordResetExpires = Date.now() + 30 * 60 * 1000;

		await sendMail({
			from: {
				name: "Doctris Medical Hospital",
				address: "doctriswork@outlook.com"
			},
			to: `${user.email}`,
			subject: "Password reset Email",
			text: "Please check your email to confirm before you continue. The email is valid for 30 min",
			html: `<p>To complete your change of sign-in method, please confirm your email address
					by clicking this link: <a href="http://localhost:3000/reset-password/${resetToken}">Reset Password</a></p>`
		}
		)

		user.passwordResetToken = passwordResetToken;
		user.passwordResetExpires = passwordResetExpires;

		await user.save();

		return "Password Reset link sent to the email provided"
	}
}