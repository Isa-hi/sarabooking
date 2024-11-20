'use client'

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AdminDashboard({ children } : { children: React.ReactNode }) {

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-primary text-primary-foreground p-4">
        <h1 className="text-2xl font-bold">Panel de Administración</h1>
      </header>
      <main className="p-4">
        <Tabs defaultValue="services" className="space-y-4">
          <TabsList>
            <TabsTrigger value="services">Servicios</TabsTrigger>
            <TabsTrigger value="appointments">Citas</TabsTrigger>
            <TabsTrigger value="clients">Clientes</TabsTrigger>
            <TabsTrigger value="reports">Informes</TabsTrigger>
          </TabsList>

          { children }
        </Tabs>
      </main>
    </div>
  )
}