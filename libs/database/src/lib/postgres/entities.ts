import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Blueprint {
  @PrimaryGeneratedColumn("uuid")
  id!: number;

  @Column("text")
  label?: string;

  @Column("text", { nullable: true })
  description?: string;

  @Column("text")
  game_version?: string;

  @Column("text", { unique: true })
  blueprint_hash?: string;

  @Column("varchar", { length: 40 })
  image_hash?: string;

  @Column("text")
  image_version?: string;

  @Column("time without time zone")
  created_at?: number;

  @Column("time without time zone")
  updated_at?: number;

  @Column("text", { array: true })
  tags?: string;

  @Column("text", { nullable: true })
  factorioprints_id?: number;
}
