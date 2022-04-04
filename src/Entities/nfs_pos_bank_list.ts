import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'nfs_pos_bank_list' })
export class nfs_pos_bank_list {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ default: null })
  public bankname!: string;

  @Column({ default: null })
  public bank_code!: number;

  @Column({ default: null })
  public bank_category!: string;

  @Column()
  @CreateDateColumn()
  public createdAt!: Date;

  @Column()
  @UpdateDateColumn()
  public updatedAt!: Date;
}

export default nfs_pos_bank_list;
