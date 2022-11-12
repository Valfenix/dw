import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('nfs_pos')
export class nfs_pos {
  // @PrimaryGeneratedColumn()
  // public id!: number;

  @Column({ default: null })
  public TransactionDate!: Date;

  @Column({ default: null })
  public SourceBank!: string;

  @Column({ default: null })
  public DestinationBank!: string;

  @Column({ default: null })
  public CollectionType!: string;

  @Column({ default: null })
  public Volumn!: number;

  @Column({ type: 'decimal', precision: 18, scale: 2, nullable: true })
  public value_!: number;

  // @Column()
  // @CreateDateColumn()
  // public createdAt!: Date;

  // @Column()
  // @UpdateDateColumn()
  // public updatedAt!: Date;
}

export default nfs_pos;
