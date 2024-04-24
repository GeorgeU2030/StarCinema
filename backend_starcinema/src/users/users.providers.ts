import { DataSource } from "typeorm";
import { User } from "./users.entity";
import { Admin } from "../roles/admin.entity";
import { Employee } from "../roles/employee.entity";
import { Customer } from "../roles/customer.entity";

export const userProviders = [
    {
        provide: 'USERS_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
        inject: ['DATA_SOURCE'],
    },
    {
        provide: 'ADMINS_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Admin),
        inject: ['DATA_SOURCE'],
    },
    {
        provide: 'EMPLOYEES_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Employee),
        inject: ['DATA_SOURCE'],
    },
    {
        provide: 'CUSTOMERS_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Customer),
        inject: ['DATA_SOURCE'],
    }
]