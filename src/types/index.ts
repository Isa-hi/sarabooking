export type ServiceType = {
  id: string;
  name: string;
  icon: string;
  description: string;
  cost: number;
  schedules: string[];
};

export type AppointmentType = {
  id: string;
  clientName: string;
  service: string;
  day: string;
  hour: string;
  status: string;
};

export type ClientType = {
  id: string;
  name: string;
  email: string;
  phone: string;
  appointments: number;
  preferences: string;
};
