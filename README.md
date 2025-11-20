# 🚗 EV Service Center Maintenance Management System - Frontend

This is the frontend for the EV Service Center Maintenance Management System, a web application designed to streamline vehicle maintenance operations. It provides a user-friendly interface for customers, technicians, and administrators to manage bookings, services, and vehicle information.

## 📝 Features

-   **User Registration & Authentication**: Secure sign-up, login, and profile management for various roles (Admin, Customer, Staff, Technician).
-   **Service & Vehicle Management**: CRUD operations for managing services, packages, and customer vehicles.
-   **Advanced Booking System**: Create, view, and edit service bookings with a dynamic calendar interface.
-   **Role-Based Dashboards**: Customized dashboards with relevant statistics and actions for each user role.
-   **Profile Management**: Users can view and update their personal information.
-   **Theming**: Supports both Light and Dark modes for user comfort.

## 🚀 Technologies Used

-   **Frontend Framework**: [React](https://reactjs.org/) with [Vite](https://vitejs.dev/) & [TypeScript](https://www.typescriptlang.org/)
-   **UI Library**: [Shadcn/UI](https://ui.shadcn.com/) & [Tailwind CSS](https://tailwindcss.com/)
-   **HTTP Client**: [Axios](https://axios-http.com/)
-   **Form Management**: [React Hook Form](https://react-hook-form.com/) with [Zod](https://zod.dev/) for validation
-   **Routing**: [React Router](https://reactrouter.com/)
-   **State Management**: [TanStack Query](https://tanstack.com/query/latest)
-   **Charts & Data Visualization**: [Recharts](https://recharts.org/)

## ⭐ Getting Started

### Prerequisites

-   Node.js (version 18.x or higher recommended)
-   npm or yarn

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/SWP391-MaintenanceManagementSystem/SWP391_FE.git
    ```
2.  Navigate to the project directory:
    ```bash
    cd SWP391_FE
    ```
3.  Install dependencies:
    ```bash
    npm install
    ```

### Configure Environment Variables

Copy the `.env.example` file to a new `.env` file and update the values as needed.

```bash
cp .env.example .env
```

**`.env`**

```
# The base URL for the backend API
VITE_API_URL=
# The public key for Stripe
VITE_STRIPE_PUBLIC_KEY=
```

### Run the Application

```bash
npm run dev
```

Access the app by opening your browser and visiting `http://localhost:5173`.

## 📁 Project Structure

```
SWP391_FE/
├── public/
├── src/
│   ├── components/   # Reusable UI components
│   ├── pages/        # Top-level page components
│   ├── lib/          # Utilities, Axios instance
│   ├── hooks/        # Custom React hooks
│   ├── contexts/     # React context providers (e.g., Auth)
│   ├── services/     # API services, queries, and mutations
│   ├── router/       # Routing configuration
│   ├── App.tsx
│   └── main.tsx
├── .env.example
├── package.json
└── README.md
```

## 💡 Contribution

Contributions are welcome! Please follow these steps:

1.  Fork the repository.
2.  Create your feature branch: `git checkout -b feature/YourFeature`
3.  Commit your changes: `git commit -m 'Add some feature'`
4.  Push to the branch: `git push origin feature/YourFeature`
5.  Open a pull request.

Please ensure your code follows the project's coding style and includes relevant tests if applicable.

## 📄 License

This project is licensed under the MIT License.

## 🔎 Contact

For questions or support, please open an issue or contact the repository owner:

-   **GitHub**: [SWP391-MaintenanceManagementSystem](https://github.com/SWP391-MaintenanceManagementSystem)
