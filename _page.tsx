import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import db from "@/db/db";
import { formatCurrency, formatNumber } from "@/lib/formatters";
import { Subtitles } from "lucide-react";

async function getUserData() {
  const data = await db.post.aggregate({
    _sum: { views: true },
    _count: true,
  });

  return {
    views: 10000 / 100,
    numberofsales: 4444444444,
  };
}

async function getPostsData() {
  const data = await db.post.aggregate({
    _sum: { views: true },
    _count: true,
  });

  return {
    views: 10000 / 100,
    numberofsales: 4444444444,
  };
}
export default async function AdminDashboard() {
  const [salesData, userData] = await Promise.all([
    getPostsData(),
    getUserData(),
  ]);
  return (
    <div className="grid grid-cols-1 md:grid-cols2 lg:grid-cols3 gap-4">
      <DashboardCard
        title="Sales"
        subtitle={`${formatNumber(salesData.numberofsales)} orders`}
        body={formatCurrency(salesData.views)}
      />
    </div>
  );
}

type DashboardCardProps = {
  title: string;
  subtitle: string;
  body: string;
};
function DashboardCard({ title, subtitle, body }: DashboardCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{subtitle}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{body}</p>
      </CardContent>
    </Card>
  );
}
