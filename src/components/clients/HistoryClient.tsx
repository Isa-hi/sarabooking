'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface Appointment {
  id: number
  date: string
  service: string
  status: 'completed' | 'cancelled' | 'no-show'
}

interface ClientHistoryProps {
  clientName: string
  appointments: Appointment[]
}

export default function ClientAppointmentHistory({ clientName, appointments }: ClientHistoryProps) {
  const [isOpen, setIsOpen] = useState(false)

  const getStatusEmoji = (status: Appointment['status']) => {
    switch (status) {
      case 'completed':
        return '✅'
      case 'cancelled':
        return '❌'
      case 'no-show':
        return '🚫'
      default:
        return ''
    }
  }

  const getServiceEmoji = (service: string) => {
    switch (service.toLowerCase()) {
      case 'corte de pelo':
        return '💇'
      case 'manicura':
        return '💅'
      case 'facial':
        return '🧖‍♀️'
      case 'maquillaje':
        return '💄'
      case 'masaje':
        return '💆‍♀️'
      default:
        return '🌟'
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">📅 Ver Historial</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Historial de Citas de {clientName}</DialogTitle>
          <DialogDescription>
            Resumen de todas las citas pasadas del cliente
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[400px] w-full rounded-md border p-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Fecha</TableHead>
                <TableHead>Servicio</TableHead>
                <TableHead>Estado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {appointments.map((appointment) => (
                <TableRow key={appointment.id}>
                  <TableCell>{appointment.date}</TableCell>
                  <TableCell>
                    {getServiceEmoji(appointment.service)} {appointment.service}
                  </TableCell>
                  <TableCell>
                    {getStatusEmoji(appointment.status)} {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}