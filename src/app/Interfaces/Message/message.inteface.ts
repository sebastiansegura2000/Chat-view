export interface Message {
  id: number;
  sender_id: number;
  content: string;
  created_at: string;
  updated_at: string;
  recipient_type?: string;
  recipient_entity_id: number;
  sender_name: string;
  read?: ReadInfo[];
}

export interface ReadInfo {
  user_id: number;
  name: string;
  read_at: string;
}
