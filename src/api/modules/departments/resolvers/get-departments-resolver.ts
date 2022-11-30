import { Query  } from "type-graphql";
import db from "../../../../models";
import { Department } from "../schemas";


export class GetDepartmentsResolver {

	@Query(returns => ([Department]))
	async getDepartments(): Promise<([Department])> {
		const departments = await db.Departments.findAll()
        console.log('====================================');
        console.log(departments);
        console.log('====================================');

		return departments as [Department]
	}
}