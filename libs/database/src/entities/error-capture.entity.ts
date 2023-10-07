import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
  name: 'error_capture'
})
export class ErrorCaptureEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    nullable: true,
    default: null,
  })
  domain: string;
  @Column({
    nullable: true,
    default: null,
  })
  url: string;
  @Column({
    nullable: true,
    default: null,
  })
  method: string;
  @Column({
    nullable: true,
    default: null,
  })
  status: string;
  @Column({
    nullable: true,
    default: null,
  })
  accountcode: string;
  @Column({
    nullable: true,
    default: null,
  })
  ip: string;
}