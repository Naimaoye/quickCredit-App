import Authenticate from '../middle_ware/authenticate';


const users = [
    {
        id: 1,
        email: 'doyin@email.com',
        firstName: 'Ade',
        lastName: 'doyin',
        password: Authenticate.hashPassword('password'),
        address: 'cresent street',
        status: 'verified',
        isAdmin: false,
    },
    {
        id: 2,
        email: 'adebayo@ware.ng',
        password: Authenticate.hashPassword('password'),
        firstName: 'james',
        lastName: 'john',
        address: 'New york city',
        status: 'not verified',
        isAdmin: false,
    },
    {
        id: 3,
        email: 'adebayo@quickcredit.com',
        password: Authenticate.hashPassword('password'),
        firstName: 'john',
        lastName: 'doe',
        address: 'Lekki phase I, Lagos',
        status: 'verified',
        isAdmin: true,
    },
];

export default users;
