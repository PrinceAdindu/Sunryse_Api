/* 
const ClinicModel {
  userId: string;
  otpCode: number,
  clinicName: string,
  stripeId: string;
  email: string;
  password: string;
  refreshToken: string;
  profile: {
    firstname: string;
    lastname: string;
    birthdate: string;
    gender: string;
    ethnicity: string;
    religon: string;
    bio: string;
    address: {
      street: string;
      city: string;
      province: string;
      country: string;
      postalCode: string;
    };
  };
  schedule: [
    {
      day: string;
      times: [
        {
          start: string;
          end: string;
        },
      ];
    },
  ];
  timeZone: string;
  licenses: [
    {
      role: string;
      licenseNumber: string;
      licenseExp: string;
      country: string;
      province: string;
      supervisorLicenses: [
        {
          role: string;
          name: string;
          licenseNum: string;
          country: string;
          province: string;
          licenseExp: string;
        },
      ];
      otherCertifications: [
        {
          type: string;
          role: string;
          organization: string;
          id: string;
          year: string;
        },
      ];
    },
  ];
  billing: {
    transitNum: number;
    accountNum: number;
    institutionNum: number;
  };
  services: [
    {
      name: string;
      description: string;
      duration: string;
      availabilityType: string;
      customAvailability: [
        {
          day: string;
          times: [
            {
              start: string;
              end: string;
            },
          ];
        }
      ];
      price: number;
      tax: string;
      taxPercent: number
      currency: string;
      status: string;
      policy: string,
      notice: string,
      lateFee: number,
    },
  ];
}
*/

const DEFAULT_BUSINESS_HOURS = [
  {
    day: 'sunday',
    on: false,
    times: [{ start: '09:00', end: '17:00', error: false }],
  },
  {
    day: 'monday',
    on: true,
    times: [{ start: '09:00', end: '17:00', error: false }],
  },
  {
    day: 'tuesday',
    on: true,
    times: [{ start: '09:00', end: '17:00', error: false }],
  },
  {
    day: 'wednesday',
    on: true,
    times: [{ start: '09:00', end: '17:00', error: false }],
  },
  {
    day: 'thursday',
    on: true,
    times: [{ start: '09:00', end: '17:00', error: false }],
  },
  {
    day: 'friday',
    on: true,
    times: [{ start: '09:00', end: '17:00', error: false }],
  },
  {
    day: 'saturday',
    on: false,
    times: [{ start: '09:00', end: '17:00', error: false }],
  },
];

const DEFAULT_CLINIC_DATA = {
  clinicName: '',
  refreshToken: '',
  schedule: DEFAULT_BUSINESS_HOURS,
  timezone: 'Pacific Time - US & Canada',
  directory: {
    url: '',
    status: '',
  },
  services: [
    {
      name: 'Free Consultation',
      description:
        'A 15 minute free consultation to see if you are a good fit for our clinic.',
      duration: 15,
      availabilityType: 'all',
      availability: DEFAULT_BUSINESS_HOURS,
      price: 0,
      currency: 'cad',
      tax: 'none',
      taxPercent: 0,
    },
  ],
  bookings: [],
};

module.exports = {
  DEFAULT_CLINIC_DATA,
};
