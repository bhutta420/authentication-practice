import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
export enum Roles {
  ADMIN = 'admin',
  SUB = 'sub',
}
@Entity({
  name: 'users'
})
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: Roles,
    default: Roles.SUB
  })
  role: Roles

  @Column({ 
    nullable: false, 
    unique: true 
  })
  email: string;

  @Column({ 
    nullable: false 
  })
  password: string;
}