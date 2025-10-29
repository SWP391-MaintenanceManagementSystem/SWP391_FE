
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  User, 
  Car, 
  Wrench, 
  CalendarCheck2, 
  CreditCard
} from "lucide-react";

const categories = [
  {
    icon: User,
    title: "Account & Login",
    description: "Manage your account, sign in issues, and profile settings",
    topQuestions: [
      "How do I create an account?",
      "I forgot my password",
      "How to update my profile?",
      "Account verification issues",
    ]
  },
  {
    icon: Car,
    title: "Vehicle Management",
    description: "Add, edit, and organize your registered vehicles",
    topQuestions: [
      "How to add a new vehicle to my account?",
      "How to remove a vehicle from my list?",
    ]
  },
  {
    icon: Wrench,
    title: "Maintenance & Service Records",
    description: "ack repairs, maintenance history, and upcoming schedules",
    topQuestions: [
      "Can I view past maintenance history??",
    ]
  },
  {
    icon: CalendarCheck2,
    title: "Appointments & Bookings",
    description: "Book, manage, and cancel service appointments",
    topQuestions: [
      "How do I book a service appointment?",
      "How can I check my appointment status?",
      "How do I choose a preferred mechanic or service center?",
    ]
  },
  {
    icon: CreditCard,
    title: "Payments & Invoices",
    description: "Handle billing, payments, and transaction history",
    topQuestions: [
      "How can I view my payment history?",
      "How to download my invoice or receipt?",
    ]
  },
 
];

export function HelpCategories() {
  return (
    <div className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl mb-4 text-gray-900">Browse Help Topics</h2>
          <p className="text-lg text-gray-600">
            Find answers organized by category
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer border border-gray-200">
                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <IconComponent className="h-6 w-6 text-blue-600" />
                    </div>
                    <CardTitle className="text-xl">{category.title}</CardTitle>
                  </div>
                  <CardDescription className="text-gray-600">
                    {category.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-700 mb-3">Top Questions:</p>
                    {category.topQuestions.map((question, qIndex) => (
                      <div key={qIndex}>
                        <a 
                          href="#" 
                          className="text-sm text-blue-600 hover:text-blue-800 hover:underline block py-1"
                        >
                          {question}
                        </a>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}