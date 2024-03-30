export type UUID = string;

export interface UUIDv1Options {
  node_id?: Uint8Array
  clock_sequence?: number
  millsecs?: number
  nanosecs?: number
  seed?: Uint8Array
}
