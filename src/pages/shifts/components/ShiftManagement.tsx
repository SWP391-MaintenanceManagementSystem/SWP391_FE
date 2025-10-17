import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export default function ShiftsManagementPage() {
  return (
    <Card className="w-full h-full">
      <CardHeader>
        <CardTitle className="text-2xl">Shift Management</CardTitle>
        <CardDescription>Total shifts: 10</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  );
}
