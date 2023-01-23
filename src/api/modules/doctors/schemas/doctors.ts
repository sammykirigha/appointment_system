import { IsEmail, IsNotEmpty, MinLength } from "class-validator";
import { Field, InputType, ObjectType } from "type-graphql";
import { Appointment } from "../../appointments/schemas";

@ObjectType()
export class Doctor {
	@Field({ description: "ID of the patient" })
	id: string;

	@Field({ description: "firstname of the patient" })
	firstname: string;

	@Field({ description: "lastname of the patient" })
	lastname: string;

	@Field({ description: "email of the patient" })
	email: string;

	@Field({ description: "phone of the patient" })
	phone: string;

	@Field({nullable: true, description: "gender of the patient" })
	gender: string;

	@Field({ description: "address of the patient" })
	address: string;

	@Field({nullable: true, description: "department of the patient" })
	department: string;

	@Field({ nullable: true, description: "doctor treating the patient" })
	token: string;

	@Field({ nullable: true, description: "doctor treating the patient" })
	rating: number;

	@Field({ nullable: true, description: "doctor treating the patient" })
	specialization: string;

	@Field({ nullable: true, description: "doctor treating the patient" })
	experience: string;


	@Field({ nullable: true, description: "doctor treating the patient" })
	image: string;

	@Field({ nullable: true, description: "doctor treating the patient" })
	facebooklLink: string;

	@Field({ nullable: true, description: "doctor treating the patient" })
	linkedinlLink: string;

	@Field({ nullable: true, description: "doctor treating the patient" })
	instagramlLink: string;

	@Field({ nullable: true, description: "doctor treating the patient" })
	twitterlLink: string;

	@Field((_returns) => [Appointment],{
		nullable: true,
		description: "appointments of the patients"
	})
	appointments!: [Appointment]
}


@InputType()
export class CreateDoctorInput {

	@Field({
		nullable: false,
		description: "Username of a user"
	})
	@IsNotEmpty()
	firstname: string

	@Field({
		nullable: false,
		description: "Username of a user"
	})
	@IsNotEmpty()
	lastname: string;

	@Field({
		nullable: false,
		description: "email of a user"
	})
	@IsNotEmpty()
	@IsEmail()
	email: string;

	@Field({
		nullable: false,
		description: "address of a user"
	})
	address: string;


	@Field({
		nullable: false,
		description: "phone of a user"
	})
	phone: string;

	@Field({
		nullable: true,
		description: "gender of a user"
	})
	gender: string;

	@Field({
		nullable: true,
		description: "rating of a doctor"
	})
	rating: number;


	@Field({
		nullable: true,
		description: "department of a user"
	})
	department: string;

	@Field({
		nullable: true,
		description: "specialization of the user"
	})
	specialization: string;

	
	@Field({
		nullable: true,
		description: "experience of the user"
	})
	experience: string;


	@Field({
		nullable: true,
		description: "image of the user"
	})
	image: string;

	@Field({
		nullable: true,
		description: "facebooklLink of the user"
	})
	facebooklLink: string;


	@Field({
		nullable: true,
		description: "linkedinlLink of the user"
	})
	linkedinlLink: string;


	@Field({
		nullable: true,
		description: "instagramlLink of the user"
	})
	instagramlLink: string;


	@Field({
		nullable: true,
		description: "twitterlLink of the user"
	})
	twitterlLink: string;
}

@InputType()
export class GetSingleDoctorInputById {
	@Field()
	id: string
}

@InputType()
export class GetSingleDoctorInputByEmail {
	

	@Field({
		nullable: false,
		description: "email of a user"
	})
	@IsNotEmpty()
	@IsEmail()
	email: string;
} 

@InputType()
export class UpdateDoctorInput {
	@Field({
		nullable: true,
		description: "Username of a user"
	})
	id: string

	@Field({
		nullable: true,
		description: "Username of a user"
	})
	firstname?: string

	@Field({
		nullable: true,
		description: "Username of a user"
	})
	lastname?: string;

	@Field({
		nullable: true,
		description: "email of a user"
	})
	@IsEmail()
	email?: string;

	@Field({
		nullable: true,
		description: "address of a user"
	})
	address?: string;

	@Field({
		nullable: true,
		description: "phone of a user"
	})
	phone?: string;

	@Field({
		nullable: true,
		description: "gender of a user"
	})
	gender?: string;

	@Field({
		nullable: true,
		description: "rating of a doctor"
	})
	rating: number;


	@Field({
		nullable: true,
		description: "department of a user"
	})
	department: string;

	// @Field({
	// 	nullable: true,
	// 	description: "password of the user"
	// })
	// @MinLength(8)
	// password: string;

	@Field({
		nullable: true,
		description: "specialization of the user"
	})
	specialization: string;

	@Field({
		nullable: true,
		description: "experience of the user"
	})
	experience: string;


	@Field({
		nullable: true,
		description: "image of the user"
	})
	image: string;

	@Field({
		nullable: true,
		description: "facebooklLink of the user"
	})
	facebooklLink: string;


	@Field({
		nullable: true,
		description: "linkedinlLink of the user"
	})
	linkedinlLink: string;


	@Field({
		nullable: true,
		description: "instagramlLink of the user"
	})
	instagramlLink: string;


	@Field({
		nullable: true,
		description: "twitterlLink of the user"
	})
	twitterlLink: string;
}

@InputType()
export class ChangePasswordInput {
	@Field({
		nullable: true,
		description: "Username of a user"
	})
	id: string

	@Field({
		nullable: true,
		description: "password of a user"
	})
	password: string

	@Field({
		nullable: true,
		description: "newPassword of a user"
	})
	newPassword: string
}


