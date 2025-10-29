import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@radix-ui/react-accordion";

const faqData = [
  {
    question: "How do I create an account on Vehicle Maintenance Web?",
    answer:
      "To create an account, click the 'Sign Up' button on the top right of the homepage. Fill in your name, email, and password, then submit the form. You’ll receive a confirmation email — click the link inside to verify and activate your account.",
  },
  {
    question: "How can I add my vehicle to the system?",
    answer:
      "After logging in, go to the 'My Vehicles' section and click 'Add Vehicle'. Enter your vehicle details such as license plate, model, brand, and year of manufacture. You can manage or edit your vehicles anytime from your dashboard.",
  },
  {
    question: "How do I schedule a maintenance service?",
    answer:
      "Go to the 'Bookings' page and select 'New Appointment'. Choose your vehicle, preferred service type, and date/time. After submitting, you’ll receive a confirmation once your booking is approved by the service center.",
  },
  {
    question: "Can I edit or cancel a booking after it’s made?",
    answer:
      "Yes. Open your 'My Bookings' page, find the appointment you want to change, and click 'Edit' or 'Cancel'. Note that cancellations are only allowed before the service date.",
  },
  {
    question: "How can I view my maintenance history?",
    answer:
      "Go to the 'Maintenance Records' section to view all past services, repairs, and part replacements. Each record includes the service date, technician details, cost, and status.",
  },
  {
    question: "How do I receive maintenance reminders?",
    answer:
      "You’ll automatically get reminders before your next scheduled service. To customize your notification preferences, go to 'Settings' → 'Notifications' and choose how you want to be notified (email, SMS, or in-app alerts).",
  },
  {
    question: "Can I make payments online?",
    answer:
      "Yes. We support secure online payments through credit/debit cards and e-wallets. When confirming your booking, choose 'Online Payment' to pay in advance and receive an instant invoice.",
  },
  {
    question: "How can I download or view my invoices?",
    answer:
      "After a service is completed, you can download your invoice from the 'Payment History' page or the booking details section. All past invoices remain available for reference.",
  },
  {
    question: "What should I do if I can't access my account?",
    answer:
      "If you're unable to log in, try resetting your password using the 'Forgot Password' option on the login page. If the issue continues, contact our support team for assistance.",
  },
  {
    question: "How do I delete my account?",
    answer:
      "To delete your account, go to 'Account Settings' and click 'Delete Account'. Once confirmed, all your personal data, booking history, and vehicle information will be permanently removed from the system.",
  },
  {
    question: "Is my personal and vehicle data safe?",
    answer:
      "Yes. We use encrypted data storage and secure authentication to ensure your personal and vehicle information is fully protected. You can also enable two-factor authentication in your security settings for extra safety.",
  },
  {
    question: "How can I contact support?",
    answer:
      "You can reach our support team through the 'Contact Us' form on the website, or by emailing support@vehiclemaintenance.com. Our team typically replies within 24 hours on business days.",
  },
];

export function FAQAccordion() {
  return (
    <div className="py-16 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl mb-4 text-gray-900">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600">
            Find quick answers to common questions
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqData.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border border-gray-200 rounded-lg px-6 bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <AccordionTrigger className="text-left py-6 hover:no-underline">
                <span className="pr-4">{faq.question}</span>
              </AccordionTrigger>
              <AccordionContent className="pb-6 pt-2 text-gray-700 leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
