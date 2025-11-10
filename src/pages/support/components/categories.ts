import { User, Car, Wrench, CalendarCheck2, CreditCard } from "lucide-react";
export const categories = [
  {
    icon: User,
    title: "Account & Login",
    description: "Manage your account, sign in issues, and profile settings",
    topQuestions: [
      { question: "I forgot my password", link: "/forgot-password" },
      { question: "How to update my profile?", link: "/profile" },
      "Account verification issues",
    ],
  },
  {
    icon: Car,
    title: "Vehicle Management",
    description: "Add, edit, and organize your registered vehicles",
    topQuestions: [
      {
        question: "How to add a new vehicle to my account?",
        link: "/vehicles",
      },

      {
        question: "How to remove a vehicle from my list?",
        link: "/vehicles",
      },
    ],
  },
  {
    icon: Wrench,
    title: "Maintenance & Service Records",
    description: "ack repairs, maintenance history, and upcoming schedules",
    topQuestions: ["Can I view past maintenance history?"],
  },
  {
    icon: CalendarCheck2,
    title: "Appointments & Bookings",
    description: "Book, manage, and cancel service appointments",
    topQuestions: [
      { question: "How do I book a service appointment?", link: "/booking" },
      { question: "How can I check my appointment status?", link: "/booking" },
    ],
  },
  {
    icon: CreditCard,
    title: "Payments & Invoices",
    description: "Handle billing, payments, and transaction history",
    topQuestions: [
      "How can I view my payment history?",
      "How to download my invoice or receipt?",
    ],
  },
];
