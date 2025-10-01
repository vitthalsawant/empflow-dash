import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Edit, Trash2, Check, X } from "lucide-react";
import { Employee } from "@/pages/Dashboard";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface EmployeeListProps {
  employees: Employee[];
  onEdit: (employee: Employee) => void;
  onDelete: (id: string) => void;
}

const EmployeeList = ({ employees, onEdit, onDelete }: EmployeeListProps) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Employee>>({});
  const { toast } = useToast();

  const handleEditStart = (employee: Employee) => {
    setEditingId(employee.id);
    setEditForm(employee);
  };

  const handleEditCancel = () => {
    setEditingId(null);
    setEditForm({});
  };

  const handleEditSave = async () => {
    if (!editingId) return;

    try {
      const { error } = await supabase
        .from("employees")
        .update({
          name: editForm.name,
          email: editForm.email,
          phone: editForm.phone,
          department: editForm.department,
          position: editForm.position,
          salary: editForm.salary,
          hire_date: editForm.hire_date,
        })
        .eq("id", editingId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Employee updated successfully",
      });

      setEditingId(null);
      setEditForm({});
      onEdit({} as Employee); // Trigger refresh
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="rounded-md border animate-fade-in">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Position</TableHead>
            <TableHead>Salary</TableHead>
            <TableHead>Hire Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {employees.map((employee) => (
            <TableRow key={employee.id}>
              <TableCell>
                {editingId === employee.id ? (
                  <Input
                    value={editForm.name || ""}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    className="h-8"
                  />
                ) : (
                  employee.name
                )}
              </TableCell>
              <TableCell>
                {editingId === employee.id ? (
                  <Input
                    value={editForm.email || ""}
                    onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                    className="h-8"
                  />
                ) : (
                  employee.email
                )}
              </TableCell>
              <TableCell>
                {editingId === employee.id ? (
                  <Input
                    value={editForm.phone || ""}
                    onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                    className="h-8"
                  />
                ) : (
                  employee.phone || "-"
                )}
              </TableCell>
              <TableCell>
                {editingId === employee.id ? (
                  <Input
                    value={editForm.department || ""}
                    onChange={(e) => setEditForm({ ...editForm, department: e.target.value })}
                    className="h-8"
                  />
                ) : (
                  employee.department || "-"
                )}
              </TableCell>
              <TableCell>
                {editingId === employee.id ? (
                  <Input
                    value={editForm.position || ""}
                    onChange={(e) => setEditForm({ ...editForm, position: e.target.value })}
                    className="h-8"
                  />
                ) : (
                  employee.position || "-"
                )}
              </TableCell>
              <TableCell>
                {editingId === employee.id ? (
                  <Input
                    type="number"
                    value={editForm.salary || ""}
                    onChange={(e) => setEditForm({ ...editForm, salary: parseFloat(e.target.value) })}
                    className="h-8"
                  />
                ) : (
                  employee.salary ? `$${employee.salary.toLocaleString()}` : "-"
                )}
              </TableCell>
              <TableCell>
                {editingId === employee.id ? (
                  <Input
                    type="date"
                    value={editForm.hire_date || ""}
                    onChange={(e) => setEditForm({ ...editForm, hire_date: e.target.value })}
                    className="h-8"
                  />
                ) : (
                  employee.hire_date ? new Date(employee.hire_date).toLocaleDateString() : "-"
                )}
              </TableCell>
              <TableCell className="text-right">
                {editingId === employee.id ? (
                  <div className="flex gap-2 justify-end">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handleEditSave}
                    >
                      <Check className="h-4 w-4 text-green-600" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handleEditCancel}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="flex gap-2 justify-end">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEditStart(employee)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Employee</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete {employee.name}? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => onDelete(employee.id)}
                            className="bg-destructive hover:bg-destructive/90"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default EmployeeList;
