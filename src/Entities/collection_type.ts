import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'collection_type' })
export class collection_type {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ default: null })
  public code!: number;

  @Column({ default: null })
  public description!: string;

  @Column({ default: null })
  public category!: string;

  @Column({ default: false })
  public success!: boolean;

  @Column()
  @CreateDateColumn()
  public createdAt!: Date;

  @Column()
  @UpdateDateColumn()
  public updatedAt!: Date;
}

export default collection_type;
