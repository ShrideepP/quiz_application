# React Native Quiz Application

Welcome to the React Native Quiz Application! This app allows users to create, edit, and take quizzes with ease. It integrates with Supabase for database functionality.

## Screenshots and Videos

### Video Demonstartion

[![Video: How to Create a Quiz]](/demo/video.MP4)

#### Home Screen

![Home Screen](/demo/home.PNG)

#### Explore Quizzes

![Explore Quizzes](/demo/explore.PNG)

#### Create Quiz

![Create Quiz](/demo/create.PNG)

#### Take Quiz

![Take Quiz](/demo/quiz.PNG)

## Features

- Create quizzes with names, descriptions, grading systems, and time limits.
- Add and delete questions with multiple-choice answers to quizzes.
- Take quizzes and receive immediate feedback on your score.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm installed on your development machine.
- Expo CLI installed globally: `npm install -g expo-cli`.
- A Supabase account with the following environment variables set:
  - `EXPO_PUBLIC_SUPABASE_URL`: Your Supabase API URL.
  - `EXPO_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anonymous key.

## Getting Started

To get started with this project, follow these steps:

1. Clone the repository:

```bash
git clone <repository-url>
```

2. Change directory to the project folder:

```bash
cd quiz
```

3. Install dependencies:

```bash
npm install
```

## Usage

To run the application locally, use the following command:

```bash
npx expo start --tunnel
```

This will start the Expo development server and provide options for running the app on Android, iOS, or the web.

## Contributing

We welcome contributions from the community. If you'd like to contribute to this project, please follow these steps:

1. Fork the project.
2. Create a new branch for your feature or bug fix: git checkout -b feature/your-feature-name.
3. Make your changes and commit them: git commit -m 'Add your feature'.
4. Push your changes to your fork: git push origin feature/your-feature-name.
5. Open a pull request to the main branch of the original repository.

## License

This project is not licensed and is provided for demonstration and educational purposes only. You do not have permission to use, modify, or distribute this code for any other purposes.
