import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'document_store' })
export class DocumentStore {
  @PrimaryGeneratedColumn()
  public file_id!: number;

  @Column('simple-json', { nullable: true })
  public file_content!: {};

  @Column({ default: null })
  public business_process!: string;

  @Column()
  public creation_date!: Date;
}

export default DocumentStore;
