interface participant {
    id: number;
    name: string;
    rrhh_id: number;
    created_at: string;
    updated_at: string;
    pivot: {
      group_id: number;
      user_id: number;
    };
  }
  