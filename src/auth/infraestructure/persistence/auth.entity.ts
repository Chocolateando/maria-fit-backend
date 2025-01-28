import { Entity, Column, ObjectId, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class AuthEntity {
  @PrimaryGeneratedColumn()
  _id: ObjectId;
  @Column({ type: 'varchar', nullable: false })
  password_hash: string;
  @Column({ type: 'varchar', nullable: false })
  email: string;
  @Column({ type: 'int', default: 1 })
  status: number;
  @Column({ type: 'varchar', default: '' })
  uType: string;
}
