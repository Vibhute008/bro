
import { Role, User } from './types';

export const USERS: Record<string, Omit<User, 'id'>> = {
    'boss@raulo.com': { name: 'The Boss', email: 'boss@raulo.com', role: Role.BOSS },
    'techlead@raulo.com': { name: 'Tech Lead', email: 'techlead@raulo.com', role: Role.TECH_LEAD },
    'sales@raulo.com': { name: 'Sales Manager', email: 'sales@raulo.com', role: Role.SALES_MANAGER },
    'telecaller@raulo.com': { name: 'Telecaller', email: 'telecaller@raulo.com', role: Role.TELECALLER },
};

export const CREDENTIALS: Record<string, string> = {
    'boss@raulo.com': 'boss123',
    'techlead@raulo.com': 'tech123',
    'sales@raulo.com': 'sales123',
    'telecaller@raulo.com': 'call123',
};
