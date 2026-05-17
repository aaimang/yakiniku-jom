Project Brief
Goal
Provide a clear, mobile-friendly website where diners can verify Halal and allergen-safe Japanese yakiniku options before visiting.

Audience
Kuala Lumpur diners seeking Halal Japanese cuisine, especially those needing strict allergen or dietary transparency (e.g., vegan, no seafood).

Stack
HTML5, CSS3, and Vanilla JavaScript. This stack is enough for a beginner because it requires zero server setup, runs entirely in the browser, and focuses purely on core web fundamentals without overwhelming frameworks.

Pages
Home: Welcomes the user, explains the concept, and drives them to book via WhatsApp.

Menu: Displays food/drinks with a functional dietary filter.

Contact: Provides static operating hours, location details, and a Waze link.

Features (max 3)
JavaScript Menu Filter: Clickable buttons to instantly show/hide menu items based on diet (Halal, Vegan, No Seafood).

External App Routing: Direct deep-linking to WhatsApp (for bookings) and Waze (for navigation).

Responsive Layout: A simple, three-page structure that scales perfectly on mobile phones.

Non-goals
Backend booking or reservation databases.

Dynamic, auto-updating operating hours based on local time zones.

Complex image carousels or slideshows.

Pulling live reviews from Google or TripAdvisor.

Build order
Gather Assets: Collect images, menu text, and generate WhatsApp/Waze links.

HTML Skeleton: Build the basic unstyled structure for index.html, menu.html, and contact.html.

CSS Styling: Add style.css to make the pages mobile-friendly and visually cohesive.

JavaScript Filtering: Write app.js to make the menu filter buttons work.

Test and Deploy: Verify all links on a mobile screen, then drag-and-drop the folder to Netlify or GitHub Pages to publish.

Success check
The first version is done when a user can load the site on their phone, tap to filter the menu for "Vegan" items, and successfully click the WhatsApp button to open a new chat window.