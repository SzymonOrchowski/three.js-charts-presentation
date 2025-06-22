# Interactive 3D Chart Presentation

This project is a dynamic, web-based data visualization tool built with Next.js and Three.js. It transforms data from a spreadsheet into an interactive 3D bar chart, allowing for real-time data editing, exploration, and visualization of changes over time.

**Live Demo:** https://3d-bar-chart.netlify.app/

![Application Screenshot](./public/img/Screenshot.png)

## Key Features

-   **Dual View Interface**: Seamlessly switch between an interactive 3D chart visualization and a fully editable spreadsheet view.
-   **Real-time Data Sync**: Any changes made in the spreadsheet—from cell values to row and column names—are instantly reflected in the 3D visualization.
-   **Interactive 3D Scene**: Orbit, pan, and zoom the 3D chart to inspect the data from any angle, powered by React Three Fiber.
-   **Dynamic Data Exploration**:
    -   Navigate through different data rows (e.g., time periods) using "Next" and "Prev" controls.
    -   Toggle "Difference Mode" to visualize the growth or decline in values compared to the previous data row.
-   **Full-fledged Spreadsheet**:
    -   Add or delete rows and columns via an intuitive context menu.
    -   Features resizable column headers for better data visibility.
-   **Dynamic Preset Management**:
    -   Load pre-configured data sets from the "Load Preset" dropdown.
    -   Create new presets on-the-fly, which are stored for the duration of the session.
    -   Rename presets directly from the spreadsheet view title.
-   **Fluid Animations**: Bar transitions are smoothly animated using React Spring, providing a polished user experience.
-   **Modern UI/UX**: A responsive, dark-themed interface with glassmorphism effects for a contemporary look and feel.

## Technology Stack

This project was built using a modern front-end stack, focusing on performance, scalability, and developer experience.

-   **Framework**: **Next.js 14** (App Router)
-   **3D Rendering**: **Three.js** via **React Three Fiber** (`@react-three/fiber`) and `@react-three/drei` for helpers and abstractions.
-   **Animation**: **React Spring** for fluid, physics-based animations in the 3D scene.
-   **State Management**: **Redux Toolkit** and **React-Redux** for robust and predictable global state management.
-   **Styling**: **Tailwind CSS** for a utility-first styling workflow.
-   **Deployment**: Netlify

## Technical Highlights

-   **Decoupled State Management**: Redux Toolkit is used to manage the application's complex state, including chart data and UI state. This ensures that changes in one part of the application (like the spreadsheet) are seamlessly and efficiently reflected in another (the 3D visualization).
-   **Declarative 3D Scenes**: By using React Three Fiber, the 3D scene is built with reusable React components. This declarative approach greatly simplifies working with Three.js and allows for a clean, maintainable codebase.
-   **Performant Animations**: The use of React Spring for animations offloads them from the main React render loop, resulting in smooth, 60fps animations that don't block the UI thread.

## Getting Started

To run this project locally, follow these steps:

1.  Clone the repository:
    ```bash
    git clone [your-repository-url]
    ```
2.  Navigate to the project directory:
    ```bash
    cd [project-directory]
    ```
3.  Install the dependencies:
    ```bash
    npm install
    # or
    yarn install
    ```
4.  Run the development server:
    ```bash
    npm run dev
    ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Future Improvements

-   **Backend Integration**: Connect the application to a database (e.g., PostgreSQL, MongoDB) via a Node.js API to permanently save and load user-created presets.
-   **Additional Chart Types**: Expand the visualization capabilities to include other chart types like 3D line charts or pie charts.
-   **User Authentication**: Implement user accounts to allow individuals to save and manage their own private datasets.