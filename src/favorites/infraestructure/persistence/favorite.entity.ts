import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectId,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('favorites')
export class FavoriteEntity {
  @ObjectIdColumn()
  _id: ObjectId;
  @Column({ type: 'varchar', nullable: false })
  user: ObjectId;
  @Column({ type: 'varchar', nullable: false })
  recipe: ObjectId;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
}
