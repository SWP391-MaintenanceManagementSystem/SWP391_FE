import { User, Car, CalendarCheck2 } from "lucide-react";
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
    icon: CalendarCheck2,
    title: "Appointments & Bookings",
    description: "Book, manage, and cancel service appointments",
    topQuestions: [
      { question: "How do I book a service appointment?", link: "/booking" },
      { question: "How can I check my appointment status?", link: "/booking" },
    ],
  },
];
