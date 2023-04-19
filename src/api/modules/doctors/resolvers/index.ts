import {GetSingleDoctorByEmail} from './get-one-doctor.resolver';
import {ChangeDoctorsPasswordResolver} from './changeDoctorPassword';
import {CreatePatientByDoctorResolver} from './create-patient-by-doctor.resolver';
import {DeleteDoctorsResolver} from './delete-doctor.resolver';
import {DoctorResolver} from './get-all-doctors.resolvers'
import {RegisterDoctorResolver} from './register-doctor.resolver'
import {UpdateDoctorResolver} from './update-doctor.resolver'


export {
    GetSingleDoctorByEmail,
    ChangeDoctorsPasswordResolver,
    CreatePatientByDoctorResolver,
    DeleteDoctorsResolver,
    DoctorResolver,
    RegisterDoctorResolver,
    UpdateDoctorResolver
}