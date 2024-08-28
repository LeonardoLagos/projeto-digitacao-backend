import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("texts")
export class Texts {
  @PrimaryColumn("uuid")
  id: string;

  @Column()
  text: string;

  @Column()
  category: string;

  @Column({ name: "created_at" })
  createdAt: Date;

  @Column()
  status: string;
}
