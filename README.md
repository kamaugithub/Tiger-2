Tiger POS

GitHub: [https://github.com/kamaugithub/Tiger-2](https://github.com/kamaugithub/Tiger-2)
Live Demo: [https://kamaugithub.github.io/Tiger-2](https://kamaugithub.github.io/Tiger-2)



Table of Contents

1. Project Overview
2. Technologies & Tools
3. Features Implemented
4. Project Structure & Files
5. Pending / Future Work
6. Next Steps & Roadmap
7. Contributing / Handoff Notes
8. Contact / Credits




 1. Project Overview

Tiger POS is a web-based (front-end) prototype for a retail Point of Sale system designed to help businesses (e.g., hardware stores, pharmacies, stationery shops) manage inventory, sales, users, and reporting.
Its goal is to provide a sleek, intuitive UI layer now, with plans for integrating full backend logic later.





2. Technologies & Tools

Below are the main technologies currently used in the project:

| Layer              | Technology / Tool                               | Purpose                                     |
| ------------------ | ----------------------------------------------- | ------------------------------------------- |
| Frontend           | HTML, CSS, JavaScript                           | Building UI, interactions, layout           |
| CSS / Styling      | Custom styles (e.g., `dashstyle.css`)           | Dashboard styling and visual tweaks         |
| JS Modules / Logic | `script.js`, `search.js`, `light-dark.js`, etc. | Core UI logic, search, theme toggling, etc. |
| Asset Files        | `css/`, `images/`, `js/` directories            | Organizing styles, images, and scripts      |
| Static Hosting     | GitHub Pages                                    | Hosting the front-end demo site             |





3. Features Implemented (UI & Static)

These are the features already represented or partially implemented:

Landing Page

* Hero, navigation, and content sections (About, Features, Contact)
* Modules for Inventory, Sales, Customers, Reporting, Multi-Branch, and Integrations are listed in Features

Login Page

Functional login section for user access

Dashboard Page

    Overview

The Tiger POS Dashboard represents the core interface where most system operations take place.
It is designed to emulate a full POS (Point of Sale) environment, offering an organized and intuitive structure for managing different business activities.

Layout Description

The dashboard features two main regions:

Sidebar (Left Panel) – Serves as the main navigation for various POS functions.
Main Content Area (Right Panel)– Dynamically displays cards and modules based on user selections.

 Sidebar Components

The sidebar includes action items representing key business operations:

| Section         | Status            |
| --------------- | ----------------- |
| Search          | Working           |
| Suppliers       | Working           |
| Customers       | Working           |
| Categories      | Partially Working |
| Products        | Partially Working |
| Stocking        | Not Working       |
| Today's Summary | Not Working       |
| Debts           | Not Working       |
| Reports         | Not Working       |
| Units           | Partially Working |
| Record Issues   | Partially Working |

Some working sections load a related UI component or card dynamically within the main area.
By default, the dashboard displays a welcome card summarizing the current status or message to the user.
When a sidebar item is selected, the corresponding card appears while others remain hidden to maintain workspace clarity.

 Functional Highlights

* Dynamic content switching is handled through JavaScript (`script.js`) for smooth transitions between modules.
* Responsive layout adapts to different screen widths (optimization for small screens is ongoing).
* Theme toggling between light and dark modes via `light-dark.js`.
* Static data modules (`suppliers.js`, `customers.js`, etc.) simulate backend functionality to preview intended workflows.
* The structure supports scalability — modules can later connect to APIs without changing the front-end layout.

 Interaction Flow

User Login:The user logs in from `login.html` and is directed to the dashboard interface.
Navigation: From the sidebar, the user selects an action (e.g., Products, Suppliers). The main section updates accordingly.
Light/Dark Mode: The top toggle button switches between light and dark modes. The setting persists until the user reloads or changes it manually.

 Additional UI Features

* Theme toggling / light-dark mode (`light-dark.js`)
* Modular CSS styling and layout
* Responsive or semi-responsive design (needs further testing)





 4. Project Structure & Files

Here’s a snapshot of the main directories and files in the repository:

```
/
├── css/
│   └── (stylesheets)
├── images/
│   └── (image assets)
├── js/
│   └── (JavaScript modules)
├── categories.js
├── customers.js
├── dashboard.html
├── dashstyle.css
├── index.html
├── light-dark.js
├── login.html
├── products.js
├── script.js
├── search.js
├── suppliers.js
├── variations.js
└── README.md
```

 Key Files Overview

| File                                                                            | Role / Description                                             |
| ------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| `index.html`                                                                    | Main landing page of the app                                   |
| `login.html`                                                                    | Login / initial entry interface                                |
| `dashboard.html`                                                                | Dashboard / UI preview of the POS interface                    |
| `dashstyle.css`                                                                 | Styles for the dashboard components                            |
| `script.js`                                                                     | Core JS logic and interactivity                                |
| `search.js`                                                                     | Search functionality (static / dummy logic)                    |
| `light-dark.js`                                                                 | Theme toggle (light / dark mode switch)                        |
| `categories.js`, `customers.js`, `products.js`, `suppliers.js`, `variations.js` | Data modules / dummy data / scaffolding for different entities |
| `css/`, `images/`, `js/`                                                        | Supporting style rules, assets, and additional scripts         |





 5. Pending / Future Work

Several functionalities are under development and planned for later implementation:

 Backend and Database

* Authentication and user sessions
* Role-based access (admin, cashier, supervisor)
* Database integration for inventory, sales, and users
* CRUD APIs for all entities
* Stock level alerts and synchronization between branches

 Reporting and Analytics

* Dashboard charts and insights (sales, profits, top products)
* Export features (PDF, Excel, CSV)

 User Experience (UX)

* Responsive layout improvements
* Interactive loading animations
* Form validation and feedback messages
* Toast or modal notifications for actions

 Security

* Input validation and sanitization
* Secure API handling with JWT/OAuth
* HTTPS and SSL configuration for deployment

 Testing & Deployment

* Unit and integration tests
* Cross-browser testing
* CI/CD pipeline configuration
* Domain and environment setup for production





 6. Next Steps & Roadmap

To move Tiger POS toward a fully functional product, here’s a recommended development roadmap:

 Backend Development

* Choose a backend stack (Node.js, Laravel, or Django).
* Implement authentication and session management.

 Database Integration

* Create data models for products, sales, customers, and suppliers.
* Build RESTful endpoints for CRUD operations.

 Frontend–Backend Connection

* Replace static JSON or JavaScript dummy data with API calls.
* Handle errors and form responses properly.

 Analytics Dashboard

* Implement charts for visual sales reports.
* Add filters and time-based data summaries.

 Responsive & UX Updates

* Finalize responsive layout for mobile and tablet.
* Improve accessibility and design consistency.

 Security Hardening

* Implement proper input validation and access restrictions.
* Configure HTTPS and token-based authentication.

 Testing & Quality Assurance

* Perform thorough unit, integration, and usability testing.
* Collect user feedback before public release.

 Deployment

* Deploy to a hosting provider or cloud platform.
* Configure domain, SSL, and environment variables.

 Post-Deployment Maintenance

* Monitor system performance and logs.
* Roll out new modules incrementally (e.g., payment integrations).





 7. Contributing / Handoff Notes

This section is for anyone who may continue the project in the future.

 Code Conventions

* Use clear and consistent naming for files and variables.
* Maintain consistent indentation and commenting.
* Keep related modules in their respective directories (e.g., `js/`, `css/`).

 Adding New Features

* Create a new JavaScript file or module.
* Link it in `dashboard.html` or the relevant page.
* Follow the existing DOM structure and event handling approach.
* Add styles to `dashstyle.css` or a new scoped stylesheet.

 Documentation

* Use inline comments for complex logic.
* Include clear commit messages describing changes.
* Update this README whenever major changes occur.

 Known Issues

* Some sidebar sections still load static content.
* Mobile responsiveness needs refinement.
* Some CSS transitions may not behave as expected in older browsers.



