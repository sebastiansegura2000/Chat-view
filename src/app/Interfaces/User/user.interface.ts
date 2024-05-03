export interface User {
    id: number;
    name: string;
    rrhh_id: number;
    created_at: string;
    updated_at: string;
    lastMessage?: LastMessage;
  }
  
  export interface LastMessage {
    id: number;
    sender_name: string;
    sender_id: number;
    content: string;
    recipient_id: number;
    recipient_name: string;
    created_at: string;
    read: any[];
  }