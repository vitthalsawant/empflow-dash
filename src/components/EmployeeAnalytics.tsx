import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Employee } from "@/pages/Dashboard";
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar } from "recharts";
import { Download } from "lucide-react";
import { exportToPDF } from "@/lib/exportUtils";
import { useToast } from "@/hooks/use-toast";

interface EmployeeAnalyticsProps {
  employees: Employee[];
}

const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))', 'hsl(var(--chart-5))'];

const EmployeeAnalytics = ({ employees }: EmployeeAnalyticsProps) => {
  const { toast } = useToast();

  const handleExportPDF = async () => {
    try {
      await exportToPDF('analytics-container', `employee-analytics-${new Date().toISOString().split('T')[0]}.pdf`);
      toast({
        title: "Success",
        description: "Analytics charts exported to PDF successfully",
      });
    } catch (error: any) {
      toast({
        title: "Export Error",
        description: error.message || "Failed to export analytics charts",
        variant: "destructive",
      });
    }
  };
  // Department distribution
  const departmentData = employees.reduce((acc, emp) => {
    const dept = emp.department || "Unassigned";
    acc[dept] = (acc[dept] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const departmentChartData = Object.entries(departmentData).map(([name, value]) => ({
    name,
    value,
  }));

  // Position distribution
  const positionData = employees.reduce((acc, emp) => {
    const pos = emp.position || "Unassigned";
    acc[pos] = (acc[pos] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const positionChartData = Object.entries(positionData).map(([name, value]) => ({
    name,
    value,
  }));

  // Hiring trend (last 6 months)
  const monthlyHires = employees.reduce((acc, emp) => {
    if (emp.hire_date) {
      const date = new Date(emp.hire_date);
      const monthYear = `${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`;
      acc[monthYear] = (acc[monthYear] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  const hiringTrendData = Object.entries(monthlyHires)
    .sort((a, b) => new Date(a[0]).getTime() - new Date(b[0]).getTime())
    .slice(-6)
    .map(([month, hires]) => ({
      month,
      hires,
    }));

  // Salary distribution by department
  const salaryByDept = employees.reduce((acc, emp) => {
    if (emp.salary && emp.department) {
      if (!acc[emp.department]) {
        acc[emp.department] = { total: 0, count: 0 };
      }
      acc[emp.department].total += emp.salary;
      acc[emp.department].count += 1;
    }
    return acc;
  }, {} as Record<string, { total: number; count: number }>);

  const salaryChartData = Object.entries(salaryByDept).map(([department, data]) => ({
    department,
    avgSalary: Math.round(data.total / data.count),
  }));

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-bold tracking-tight mb-2">Visual Analytics</h3>
          <p className="text-muted-foreground">Real-time insights from your employee data</p>
        </div>
        <Button onClick={handleExportPDF} variant="outline" disabled={employees.length === 0}>
          <Download className="mr-2 h-4 w-4" />
          Export Charts to PDF
        </Button>
      </div>

      <div id="analytics-container" className="space-y-6">

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Department Distribution - Pie Chart */}
        <Card className="hover-scale">
          <CardHeader>
            <CardTitle>Department Distribution</CardTitle>
            <CardDescription>Employee count by department</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={departmentChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {departmentChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Position Distribution - Bar Chart */}
        <Card className="hover-scale">
          <CardHeader>
            <CardTitle>Position Distribution</CardTitle>
            <CardDescription>Employee count by position</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={positionChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Hiring Trend - Line Chart */}
        <Card className="hover-scale">
          <CardHeader>
            <CardTitle>Hiring Trend</CardTitle>
            <CardDescription>New hires over the last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={hiringTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="hires" stroke="hsl(var(--primary))" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Average Salary by Department - Bar Chart */}
        <Card className="hover-scale">
          <CardHeader>
            <CardTitle>Average Salary by Department</CardTitle>
            <CardDescription>Compensation analysis across departments</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salaryChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="department" angle={-45} textAnchor="end" height={100} />
                <YAxis tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}K`} />
                <Tooltip formatter={(value) => `₹${Number(value).toLocaleString("en-IN")}`} />
                <Bar dataKey="avgSalary" fill="hsl(var(--chart-2))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      </div>
    </div>
  );
};

export default EmployeeAnalytics;
