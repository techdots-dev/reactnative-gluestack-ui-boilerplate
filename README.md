# 🚀 Gluestack UI Boilerplate - Expo Managed Workflow

A production-ready Expo boilerplate with beautiful Gluestack UI components, complete authentication flow, advanced analytics, and comprehensive testing setup.

![Expo](https://img.shields.io/badge/Expo-5.3.0-blue)
![React Native](https://img.shields.io/badge/React%20Native-0.79.5-green)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue)

## ✨ Features

### 🎨 UI & Design
- **Gluestack UI** - Beautiful, accessible components out of the box
- **NativeWind** - Tailwind CSS for React Native
- **Dark/Light Mode** - Automatic system theme detection
- **Responsive Design** - Works on all screen sizes

### 🔐 Authentication
- Complete auth flow: Sign In, Sign Up, Forgot Password
- **React Hook Form** with Zod validation
- Context API for session management
- Secure token storage with AsyncStorage

### 📊 Analytics & Monitoring
- **Sentry** - Error tracking and performance monitoring
- **PostHog** - Product analytics with feature flags
- **Session Replay** - User session recording (optional)
- **Real-time Insights** - Track user behavior and errors

### 🧪 Testing
- **Jest** - Unit testing with React Testing Library
- **Maestro** - E2E testing with local and CI support
- **CircleCI** - Automated testing pipeline
- **Cross-platform** - Android & iOS testing

### 🚀 Deployment
- **EAS** - Expo Application Services for seamless updates
- **Staging & Production** channels
- **One-click rollbacks**
- **OTA Updates** - Update apps without store deployments

### 🔧 Development
- **TypeScript** - Full type safety
- **React Query** - Server state management
- **Expo Router** - File-based routing
- **Mock API** - Switch between mock and real APIs via environment variables

## 🏗️ Project Structure

```
src/
├── components/     # Reusable Gluestack UI components
├── contexts/       # React contexts (auth, theme, etc.)
├── hooks/          # Custom React hooks
├── screens/        # App screens (auth, profile, settings)
├── services/       # API services and clients
├── types/          # TypeScript type definitions
├── utils/          # Helper functions and validations
└── __tests__/      # Unit tests
```

## 🚀 Quick Start

### Prerequisites
- Node.js 20.18.1+
- Expo CLI
- iOS Simulator (for iOS development)
- Android Studio (for Android development)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/gluestack-ui-boilerplate.git
   cd gluestack-ui-boilerplate
   ```

2. **Install dependencies**
   ```bash
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` with your configuration:
   ```env
   # API Configuration
   API_URL=your_api_base_url
   API_MODE=mock

   # Analytics
   SENTRY_DSN=your_sentry_dsn
   POSTHOG_API_KEY=your_posthog_key
   SENTRY_AUTH_TOKEN=your_auth_token

   # Project
   EAS_PROJECT_ID=eas_project_id

   ```

4. **Start development server**
   ```bash
   yarn start
   ```

## 📱 Scripts

### Development
```bash
yarn start          # Start Expo dev server
yarn android        # Run on Android
yarn ios            # Run on iOS simulator
yarn web            # Run on web
```

### Testing
```bash
yarn test           # Run Jest unit tests
yarn maestro:local  # Run Maestro E2E tests locally
```

### Deployment
```bash
yarn release:staging    # Deploy to staging channel
yarn release:prod       # Deploy to production channel
yarn rollback:staging   # Rollback staging to previous version
yarn rollback:prod      # Rollback production to previous version
```

## 🧪 Testing

### Unit Tests
```bash
yarn test
```

### E2E Tests with Maestro

**Local Testing:**
```bash
yarn maestro:local
```

**CI Testing:**
- Tests run automatically on CircleCI for every push to `main`
- Both Android emulator and iOS simulator testing
- Results available in CircleCI test reports

### Test Structure
- `__tests__/` - Unit tests with Jest and React Testing Library
- `.maestro/` - E2E test flows for critical user journeys

## 🔧 Configuration

### Environment Setup
Copy `.env.example` to `.env` and configure:

```env
# API Configuration
API_URL=your_api_base_url
API_MODE=mock

# Analytics
SENTRY_DSN=your_sentry_dsn
POSTHOG_API_KEY=your_posthog_key
SENTRY_AUTH_TOKEN=your_auth_token

# Project
EAS_PROJECT_ID=eas_project_id
```

### Gluestack UI
The project uses Gluestack UI components with custom theming. Modify the design system in `gluestack-ui.config.ts`.

### Analytics Configuration
Toggle analytics features in Settings screen:
- Session replay recording
- User analytics

## 🚀 Deployment

### EAS Setup
1. Install EAS CLI:
   ```bash
   npm install -g @expo/eas-cli
   ```

2. Login to Expo:
   ```bash
   eas login
   ```

3. Configure build profiles in `eas.json`

### Deployment Commands
```bash
# Build and deploy to staging
yarn release:staging

# Build and deploy to production  
yarn release:prod

# Rollback if needed
yarn rollback:staging
yarn rollback:prod
```

## 📊 Monitoring & Analytics

### Sentry
- Error tracking
- Performance monitoring
- Release health tracking

### PostHog
- User behavior analytics
- Feature flags
- Session replays (optional)

## 🔄 CI/CD Pipeline

The project includes a comprehensive CircleCI configuration:

- **Automated testing** on both Android and iOS
- **E2E tests** with Maestro
- **Dependency caching** for faster builds
- **Parallel execution** of Android and iOS tests

## 🛠️ Tech Stack

- **Framework**: Expo Managed Workflow
- **Navigation**: Expo Router
- **UI Library**: Gluestack UI + NativeWind
- **State Management**: React Context + React Query
- **Forms**: React Hook Form + Zod
- **Testing**: Jest + Maestro
- **Analytics**: Sentry + PostHog
- **CI/CD**: CircleCI
- **Deployment**: EAS

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Expo](https://expo.dev) for the amazing development experience
- [Gluestack UI](https://ui.gluestack.io) for beautiful components
- [Sentry](https://sentry.io) for error monitoring
- [PostHog](https://posthog.com) for product analytics
- [Maestro](https://maestro.mobile.dev) for E2E testing

---

## 📞 Support

If you have any questions or need help with setup, please open an issue or reach out to the maintainers.

## 💝 Made with Love

This boilerplate was crafted with ❤️ to help developers build amazing React Native apps faster. We believe in:

Quality - Production-ready code from day one
Developer Experience - Smooth workflows and great tooling
Community - Sharing knowledge and helping each other grow
Innovation - Staying on the cutting edge of React Native ecosystem
If this project helped you, please give it a ⭐️ on GitHub and share with fellow developers!

**Happy coding! 🎉**