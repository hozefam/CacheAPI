import { classToPlain, Exclude } from "class-transformer";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class Cache extends BaseEntity {
  constructor(cache: Partial<Cache>) {
    super();
    Object.assign(this, cache);
  }

  @Exclude()
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column({ nullable: false })
  identifier: string;

  @Column()
  cacheJson: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  toJSON() {
    return classToPlain(this);
  }
}
