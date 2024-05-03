export interface Group {
    id: number;
    name: string;
    onwer_id: number;
    status: boolean;
    created_at: string;
    updated_at: string;
    lastMessage?: LastMessage;
  }
  
  export interface LastMessage {
    id: number;
    sender_id: number;
    content: string;
    created_at: string;
    updated_at:string;
    recipient_type:string;
    recipient_entity_id:number;
    sender_name: string;
    read: any[];
  }