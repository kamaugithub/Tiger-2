 Tiger POS

       GitHub  
Live demo: kamaugithub.github.io/Tiger-2 

 Table of Contents

1. Project Overview
2. Technologies & Tools
3. Features Implemented
4. Project Structure & Files
5. How to Run / Setup Locally
6. Pending / Future Work
7. Next Steps & Roadmap
8. Contributing / Handoff Notes
9. Contact / Credits


1. Project Overview

Tiger POS is a web-based,(front-end) prototype for a retail Point of Sale system intended to help businesses (e.g. hardware stores, pharmacies, stationery.) manage their inventory, sales, users, and reporting. Its goal is to provide a sleek, intuitive UI layer now, with plans for integrating full backend logic later.




 2. Technologies & Tools

These are the main technologies currently used in the project:

| Layer              | Technology / Tool                               | Purpose                                     |
| ------------------ | ----------------------------------------------- | ------------------------------------------- |
| Frontend           | HTML, CSS, JavaScript                           | Building UI, interactions, layout           |
| CSS / Styling      | Custom styles (e.g. `dashstyle.css`)            | Dashboard styling and custom visual tweaks  |
| JS Modules / Logic | `script.js`, `search.js`, `light-dark.js`, etc. | Core UI logic, search, theme toggling, etc. |
| Asset Files        | `css/`, `images/`, `js/` directories            | Organizing styles, images, scripts          |
| Static Hosting     | GitHub Pages                                    | Host the front-end demo site                |

If/when backend is added later, possible technologies might include Node.js, Express, a database (MySQL, PostgreSQL, MongoDB), etc.



 3. Features Implemented (UI & Static)

Here are the features already represented or partially implemented:

        Landing Page – hero, navigation, sections. 
 About, Features, Contact sections.  
Inventory / Sales / Customer / Reporting / Multi-Branch / Integration modules listed in Features 

        Log in page
Login section

        Dashboard page
 Overview

The Tiger POS Dashboard represents the core interface where most system operations take place.


The dashboard is designed to emulate a full POS (Point of Sale) environment, offering an organized and intuitive structure for managing different business activities.

Layout Description

The dashboard features two main regions:

Sidebar (Left Panel) – serves as the main navigation for various POS functions.
Main Content Area (Right Panel) – dynamically displays cards and modules based on user selections.
Sidebar Components

The sidebar includes action items representing key business operations:

Search – opens the search module for fast lookups.
   -working
Suppliers – displays supplier-related records and details.
   -working
Customers – lists customer records and associated actions.
   -working
Categories – manages product grouping and organization.
   -partially working
Products – displays or manages inventory products.
    -partially working
Stocking – for adding or updating stock entries.
    -not working
Today's Summary – provides a daily overview of transactions.
     -not working
Debts – section for pending balances or customer credit tracking.
       -not working
Reports – data overview and insights placeholder.
        -not working
Units – measurement and quantity management.
         -partially working
Record Issues – records and tracks system or inventory issues.
        -partially working

Some of the working sections loads a related UI component or card dynamically within the main area.
By default, the dashboard displays a welcome card summarizing the current status or message to the user. When a sidebar item is selected, the corresponding card appears, while others remain hidden to preserve workspace clarity.

Functional Highlights
Dynamic content switching is handled through JavaScript (script.js), ensuring smooth transitions between modules.
Responsive layout adapts to different screen widths, though optimization for smaller devices is still ongoing.
Theme toggling between light and dark modes via light-dark.js.
Static data modules (suppliers.js, customers.js, etc.) simulate backend functionality, allowing preview of intended workflows.

Its structure supports scalability — meaning modules can later connect to APIs without changing the front-end layout.

Interaction Flow

User Login:
The user logs in from login.html and is directed to the dashboard interface.

Navigation:
From the sidebar, the user selects an action (e.g., Products, Suppliers). The main section updates accordingly.

Light/Dark Mode:
The top toggle button switches between light and dark modes. This setting persists until the user reloads or changes mode manually.
  
Theme toggling / light-dark mode (`light-dark.js`)
Modular CSS styling and layout
Responsive or semi-responsive layout (needs testing)





Here’s a snapshot of the main directories & files in your repo: (GitHub)

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

Key Files Overview
File	Role / Description
index.html	Main landing page of the app
login.html	Login / initial entry interface
dashboard.html	Dashboard / UI preview of the POS interface
dashstyle.css	Styles for the dashboard layout / components
script.js	Core JS logic and interactivity
search.js	Search functionality (static / dummy logic)
light-dark.js	Theme toggle (light mode / dark mode switch)
categories.js, customers.js, products.js, suppliers.js, variations.js	Data modules / dummy data / scaffolding for different entities
css/*, images/*, js/*	Supporting style rules, assets, and additional scripts
5. How to Run / Setup Locally

Follow these steps to set up and test the project locally.

Clone the repository

git clone https://github.com/kamaugithub/Tiger-2.git
cd Tiger-2


Open the HTML files directly in your browser

You can open index.html or dashboard.html by double-clicking them, or for better results, serve them locally.

Run a simple local server (optional but recommended)

This prevents potential issues with module imports or CORS.

# Using Python 3
python -m http.server 8000


Open the app in your browser

Visit http://localhost:8000 (or the port displayed in your terminal).

Explore the dashboard and modules

Navigate through the interface to view how components load dynamically.

Extend the project

Once ready to move beyond static mode, you can connect the UI to a backend or local API to replace dummy data with live operations.

6. Pending / Future Work

Several functionalities are still under development or planned for later implementation:

Backend and Database
Authentication and user sessions
Role-based access (admin, cashier, supervisor)
Database integration for inventory, sales, and users
CRUD APIs for all entities
Stock level alerts and synchronization between branches
Reporting and Analytics
Dashboard charts and insights (sales, profits, top products)
Export features (PDF, Excel, CSV)
User Experience (UX)
Responsive layout improvements
Interactive loading animations
Form validation and feedback messages
Toast or modal notifications for actions
Security
Input validation and sanitization
Secure API handling with JWT/OAuth
HTTPS and SSL configuration for deployment
Testing & Deployment
Unit and integration tests
Cross-browser testing
CI/CD pipeline configuration
Domain and environment setup for production
7. Next Steps & Roadmap

To move Tiger POS toward a fully functional product, here’s a recommended development roadmap:

Backend Development

Choose a backend stack (Node.js, Laravel, or Django).
Implement authentication and session management.

Database Integration

Create data models for products, sales, customers, and suppliers.
Build RESTful endpoints for CRUD operations.

Frontend-Backend Connection

Replace static JSON or JavaScript dummy data with API calls.
Handle errors and form responses properly.

Analytics Dashboard

Implement charts for visual sales reports.
Add filters and time-based data summaries.

Responsive & UX Updates

Finalize responsive layout for mobile and tablet.
Improve accessibility and design consistency.

Security Hardening

Implement proper input validation and access restrictions.
Configure HTTPS and tokens for authentication.

Testing and Quality Assurance

Perform thorough testing (unit, integration, and usability).
Collect user feedback before release.

Deployment

Deploy to a hosting provider or cloud platform.
Configure domain, SSL, and environment variables.

Post-Deployment Maintenance

Monitor system performance and logs.
Roll out new modules incrementally (e.g., payment integrations).
8. Contributing / Handoff Notes

This section is for anyone who may continue the project in the future.

Code Conventions
Use clear naming conventions for files and variables.
Maintain consistent indentation and commenting.
Keep related modules in their respective directories (e.g., js/, css/).
Adding New Features
Create a new JavaScript file or module.
Link it in the dashboard.html or relevant page.
Follow the existing DOM structure and event handling approach.
Add visual styles to dashstyle.css or a new scoped stylesheet.
Documentation
Use inline comments for complex logic.
Include commit messages describing changes.
Update this README whenever major changes occur.
Known Issues
Some sidebar sections still load static content.
Mobile responsiveness needs adjustments.
Some CSS transitions may not behave as expected in older browsers.
