import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("historic")
export class Historic {
  @PrimaryColumn("uuid")
  id: number;

  @Column({ name: "user_id" })
  userId: string;

  @Column({ name: "full_text" })
  fullText: string;

  @Column({ name: "hit_count" })
  hitCount: number;

  @Column({ name: "miss_count" })
  missCount: number;

  @Column({ name: "correction_count" })
  correctionCount: number;

  @Column({ name: "duration" })
  duration: number;

  @Column({ name: "wpm" })
  wpm: number;

  @Column({ name: "created_at" })
  createdAt: Date;
}
