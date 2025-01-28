import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectId,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('subscriptions')
export class SubscriptionEntity {
  @ObjectIdColumn()
  _id: ObjectId;
  @Column({ type: 'varchar', nullable: false })
  user: ObjectId;
  @Column({ type: 'varchar', nullable: false })
  plan: ObjectId;
  @Column({ type: 'date', nullable: false })
  initDate: Date;
  @Column({ type: 'date', nullable: false })
  endDate: Date;
  @Column({ type: 'varchar', default: 'free' })
  subscription_status: string;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
}
