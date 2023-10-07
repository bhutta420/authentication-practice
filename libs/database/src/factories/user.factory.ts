import { setSeederFactory } from 'typeorm-extension';
import { Roles, UserEntity } from '../entities';

export default setSeederFactory(UserEntity, (faker) => {
    const user = new UserEntity();
    const first_name = faker.name.firstName('male')
    const last_name = faker.name.lastName('male')
    user.name = `${first_name} ${last_name}`;
    user.email = faker.internet.email(first_name, last_name);
    user.role = Roles.ADMIN
    user.password = 'U2FsdGVkX198+Z32548i9M9j/HBk4rIFRzYE14ChDII='
    return user;
})