export type ServiceType = {
    id: number;
    name: string;
    icon: string;
    description: string;
}

export type AppointmentType = {
    id: number;
    clientName: string;
    service: string;
    date: string;
    time: string;
    status: string;
}

export type ClientType = {
    id: number;
    name: string;
    email: string;
    phone: string;
    appointments: number;
    preferences: string;
}

export type StatsType = {
    service: string;
    appointments: number;
}