import { Seeder/*, SeederFactoryManager*/ } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Roles, UserEntity } from '../entities';
import * as CryptoJS from 'crypto-js'

export default class UserSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    // factoryManager: SeederFactoryManager
  ): Promise<any> {
    const password = await CryptoJS.AES.encrypt(process.env.ADMIN_USER_PASSWORD, process.env.PASSWORD_SECRET).toString()
    const repository =  dataSource.getRepository(UserEntity);
    await repository.insert([
      {
        name: 'Admin User',
        role: Roles.ADMIN,
        email: process.env.ADMIN_USER_EMAIL,
        password: password,
      }
    ]);
    // const userFactory = await factoryManager.get(UserEntity);
    // await userFactory.save();
    // await userFactory.saveMany(5);
  }
}