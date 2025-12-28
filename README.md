# GenMillenauts

This project is a web application built with React, Vite, and Tailwind CSS. It appears to be a mental wellness platform that connects users with therapists, provides AI-powered tools, and includes features for stress analysis and community support.

## Folder Structure

The project follows a standard structure for a React application. Here's an overview of the key directories and files:

```
e:genMillenauts
├───.gitignore
├───babel.config.js
├───eslint.config.js
├───index.html
├───jest.config.js
├───package-lock.json
├───package.json
├───README.md
├───vite.config.js
├───__mocks__
│   └───styleMock.js
├───public
│   ├───favcon.png
│   └───vite.svg
└───src
    ├───App.css
    ├───App.jsx
    ├───index.css
    ├───main.jsx
    ├───TestMotion.jsx
    ├───assets
    │   ├───AI_VID.mp4
    │   └───react.svg
    ├───components
    │   ├───AiCheckInSection.jsx
    │   ├───CommunitySection.jsx
    │   ├───FeatureSection.jsx
    │   ├───Footer.jsx
    │   ├───HeroSection.jsx
    │   ├───Navbar.jsx
    │   ├───TherapistSection.jsx
    │   ├───Auth
    │   │   ├───AuthCard.jsx
    │   │   ├───LoginForm.jsx
    │   │   ├───OTPInput.jsx
    │   │   ├───ProtectedRoute.jsx
    │   │   ├───RegisterForm.jsx
    │   │   ├───SignUpForm.jsx
    │   │   └───common
    │   │       └───AuthBackground.jsx
    │   ├───dashboard
    │   │   ├───AddAlertContactForm.jsx
    │   │   ├───AiCompanion.jsx
    │   │   ├───BookingDetails.jsx
    │   │   ├───BookingList.jsx
    │   │   ├───BreathingExercise.jsx
    │   │   ├───CreateSlotForm.jsx
    │   │   ├───FeatureCard.jsx
    │   │   ├───FormattedBotMessage.jsx
    │   │   ├───FormattedBotMessage.test.jsx
    │   │   ├───JournalPrompt.jsx
    │   │   ├───LatestStress.jsx
    │   │   ├───MoodTracker.jsx
    │   │   ├───SettingsForm.jsx
    │   │   ├───SlotList.jsx
    │   │   ├───TherapistProfile.jsx
    │   │   ├───WeeklyStressChart.jsx
    │   │   └───WelcomeCard.jsx
    │   └───ui
    │       ├───Button.jsx
    │       ├───LoginOptions.jsx
    │       ├───SignupOptions.jsx
    │       └───utils.js
    ├───hooks
    │   ├───useAuthApi.js
    │   ├───useBookingApi.js
    │   ├───useOutsideClick.js
    │   ├───useSlotApi.js
    │   └───useTherapistApi.js
    ├───pages
    │   ├───AddAlertContactPage.jsx
    │   ├───AlertContactsPage.jsx
    │   ├───AvailableSlotsPage.jsx
    │   ├───DashBoardPage.jsx
    │   ├───LoginPage.jsx
    │   ├───SettingsPage.jsx
    │   ├───SignupPage.jsx
    │   ├───TherapistDashboardPage.jsx
    │   ├───TherapistLoginPage.jsx
    │   ├───TherapistRegisterPage.jsx
    │   ├───TherapistSignupPage.jsx
    │   ├───TherapistSlotsBookingPage.jsx
    │   ├───TherapistSlotsPage.jsx
    │   └───TherapistsPage.jsx
    ├───redux
    │   ├───store.js
    │   └───slices
    │       ├───authSlice.js
    │       ├───bookingSlice.js
    │       ├───slotSlice.js
    │       └───stressSlice.js
    ├───services
    │   ├───aiService.js
    │   ├───authService.js
    │   ├───bookingService.js
    │   ├───slotService.js
    │   ├───therapistService.js
    │   └───userService.js
    └───utils
        └───jwt.js
```

- **`src`**: Contains all the source code for the application.
  - **`assets`**: Static assets like images, videos, and SVGs.
  - **`components`**: Reusable React components.
    - **`Auth`**: Components related to user authentication (login, signup, etc.).
    - **`dashboard`**: Components used in the user and therapist dashboards.
    - **`ui`**: General-purpose UI components like buttons.
  - **`hooks`**: Custom React hooks for handling API calls and other logic.
  - **`pages`**: Top-level components for each page/route in the application.
  - **`redux`**: Redux store, slices, and related logic for state management.
  - **`services`**: Modules for interacting with external APIs.
  - **`utils`**: Utility functions.
- **`public`**: Static assets that are not processed by Vite and are served directly.
- **Configuration Files**:
  - `vite.config.js`: Vite configuration.
  - `tailwind.config.js`: Tailwind CSS configuration (if present).
  - `postcss.config.js`: PostCSS configuration.
  - `babel.config.js`: Babel configuration.
  - `eslint.config.js`: ESLint configuration.
  - `jest.config.js`: Jest configuration.

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

Make sure you have Node.js and npm installed on your machine.
* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/[YOUR_USERNAME]/genmillenauts.git
   ```
2. Navigate to the project directory
   ```sh
   cd genmillenauts
   ```
3. Install NPM packages
   ```sh
   npm install
   ```

## Available Scripts

In the project directory, you can run the following commands:

### `npm run dev`

Runs the app in the development mode.<br />
Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `dist` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

### `npm run preview`

Serves the production build from the `dist` folder. It's a good way to check if the production build is working correctly before deploying.

### `npm run lint`

Runs the ESLint linter to check for code quality and style issues.

### `npm run test`

Launches the test runner in the interactive watch mode.

## Technologies Used

* [React](https://reactjs.org/)
* [Vite](https://vitejs.dev/)
* [Redux Toolkit](https://redux-toolkit.js.org/)
* [Tailwind CSS](https://tailwindcss.com/)
* [React Router](https://reactrouter.com/)
* [Framer Motion](https://www.framer.com/motion/)
* [Axios](https://axios-http.com/)
* [Jest](https://jestjs.io/)

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the ISC License.

