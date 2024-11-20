import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { StatsType } from "@/types";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
  } from "recharts";

type props = {
    statsData: StatsType[];
}
export default function ReportsCard({ statsData }: props) {
  return (
    <>
      <Card>
          <CardHeader>
            <CardTitle>Informes y Estadísticas</CardTitle>
            <CardDescription>
              Analiza el rendimiento del negocio y el comportamiento de los
              clientes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  Ocupación de Citas
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={statsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="appointments" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  Servicios Más Demandados
                </h3>
                <ul className="list-disc pl-5">
                  {statsData
                    .sort((a, b) => b.appointments - a.appointments)
                    .map((service, index) => (
                      <li key={index}>
                        {service.service}: {service.appointments} citas
                      </li>
                    ))}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  Análisis de Comportamiento de Clientes
                </h3>
                <p>Frecuencia promedio de visitas: 2.5 veces al mes</p>
                <p>
                  Servicios más solicitados por clientes recurrentes: Corte de
                  pelo, Manicura
                </p>
                <p>Tasa de cancelación: 5%</p>
              </div>
            </div>
          </CardContent>
        </Card>
    </>
  );
}