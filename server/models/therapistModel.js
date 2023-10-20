/* Therapsit Model
{
    email: string,
    password: string,
    firstname: string,
    lastname: string,
    birthdate: string,
    address: {
        street: string,
        city; string,
        province: string,
        country: string,
        postalCode : string,
    },
    licenses: [
        {   
            role: string,
            licenseNumber: string,
            licenseExp: string,
            country: string,
            province: string,
            supervisorLicenses: [
                {
                    role: string
                    name: string,
                    licenseNum: string,
                    country: string,
                    province: string,
                    licenseExp: string
                }
            ],
            otherCertifications: [
                {
                    type: string,
                    role: string,
                    organization: string,
                    id: string,
                    year: string,
                }
            ],
        }
    ],
    billing: {
        transitNum: number,
        accountNum: number,
        institutionNum: number,
    },
    gender: string,
    ethnicity: string,
    religon: string,
    bio: string,
}
*/
