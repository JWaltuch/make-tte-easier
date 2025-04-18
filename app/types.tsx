export type BasicRowType = {
  id: string;
  name: string;
  description: string;
  day: string;
  type_id: string;
  type: string;
  room_name: string;
  space: string;
  date_created: Date | string;
  date_updated: Date | string;
  view_uri: string;
  duration: string;
};

export type AdvancedRowType = {
  id: string;
  name: string;
  description: string;
  startdaypart_name: string;
  type_id: string;
  type: {
    name: string;
  };
  room_name: string;
  space_name: string;
  date_created: Date | string;
  date_updated: Date | string;
  view_uri: string;
  duration: string;
};

export type ConventionType = {
  name: string;
  id: string;
};
