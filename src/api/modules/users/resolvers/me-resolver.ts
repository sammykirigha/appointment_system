
import { Authorized, Ctx, Query, Resolver } from "type-graphql";
import db from "../../../../models";
import { sign } from "jsonwebtoken";
import { User } from "../schemas/user";
import { Context } from "../../../common/interfaces/context.interface";

@Resolver()
export class MeResolver {
	@Query(returns => User, {
		description: "get the current user"
	})
	@Authorized()
	async currentUser(
		@Ctx() ctx: Context): Promise<User | null> {

		const userId = ctx.user?.id

		if (!userId) {
			throw new Error("Invalid access token")
		}

		const user = await db.logged_in_users.findByPk(userId)

		const newToken = sign(
			{
				id: user.id,
				status: user.status,
				email: user.email
			},
			'sammykightgfhgcvbnb',
			{ expiresIn: '24h' }
		)

		user.token = newToken;
		return user;
	}
}