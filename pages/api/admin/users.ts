import { isValidObjectId } from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database';
import { IUser } from '../../../interfaces';
import { User } from '../../../models';

type Data = 
| { message: string }
| IUser[]

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case 'GET':
            return getUser( req, res);

        case 'PUT':
            return updateUser( req, res);
    
        default:
            return res.status(200).json({ message: 'Bad request' });
    }

    
}

const getUser = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
    
    await db.connect();
    const users = await User.find().select('-password').lean();
    await db.disconnect();

    return res.status(200).json(users);
}

const updateUser = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
    
    const { userId = '', role = '' } = req.body;

    if ( !isValidObjectId(userId) ) {
        return res.status(200).json({ message: 'No existe usuario con ese id' });
    }

    const validRole = ['admin', 'super-user', 'SEO', 'client'];

    if ( !validRole.includes(role) ) {
        return res.status(200).json({ message: 'Role no permitido: ' + validRole.join(', ') });
    }

    await db.connect();

    const user = await User.findById( userId );

    if ( !user ) {
        return res.status(200).json({ message: 'Usuario no encontrado: ' + userId });
    }

    user.role = role;
    await user.save();
    await db.disconnect();
}

