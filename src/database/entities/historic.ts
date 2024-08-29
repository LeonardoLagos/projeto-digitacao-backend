import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("historic")
export class Historic {
  @PrimaryColumn("uuid")
  id: string;

  @Column({ name: "user_id" })
  userId: string;

  @Column({ name: "hit_count" })
  hitCount: number;

  @Column({ name: "miss_count" })
  missCount: number;

  @Column({ name: "duration" })
  duration: number;

  @Column({ name: "text_length" })
  textLength: number;

  @Column({ name: "created_at" })
  createdAt?: Date;
}
