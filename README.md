# seerrTV

A React Native application for Apple TV that serves as a frontend for Overseerr (or Jellyseerr), built using react-native-tvos.

## Overview

seerrTV brings the power of seerr (formerly Overseerr and Jellyseerr) to your Apple TV, allowing you to manage and request media directly from your television. Built with react-native-tvos, this application provides a native tvOS experience while maintaining the functionality you love from Overseerr.

## Features

- Native tvOS interface optimized for television displays
- Browse and search available media
- Request new movies and TV shows

## Prerequisites

- Node.js (version 18 or higher)
- Xcode (latest version recommended)
- CocoaPods
- An existing Overseerr or Jellyseerr instance

## Installation

1. Clone the repository:
```bash
git clone https://github.com/arvinsingla/seerr-tv.git
cd seerr-tv
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Install iOS dependencies:
```bash
cd ios
pod install
cd ..
```

4. Run the application:
```bash
npm run tvos
# or
yarn tvos
```

## Development Environment Setup

This project uses

- the [React Native TV fork](https://github.com/react-native-tvos/react-native-tvos), which supports both phone (Android and iOS) and TV (Android TV and Apple TV) targets
- the [React Native TV config plugin](https://github.com/react-native-tvos/config-tv/tree/main/packages/config-tv) to allow Expo prebuild to modify the project's native files for TV builds

Make sure you have the following tools installed and configured:
- Xcode with tvOS SDK
- Apple TV Simulator or physical Apple TV device
- React Native development environment

## Contributing

We welcome contributions from the community! Whether it's bug fixes, feature additions, or documentation improvements, your help is appreciated.

### How to Contribute

1. Fork the repository
2. Create a new branch for your feature or fix:
```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-fix-name
```

3. Make your changes
4. Commit your changes with clear, descriptive commit messages
5. Push to your fork
6. Submit a Pull Request

### Pull Request Guidelines

- Provide a clear description of the changes
- Include any relevant issue numbers
- Ensure your code follows the existing style
- Add tests if applicable
- Update documentation as needed

### Code Style

- Follow the existing code style
- Use meaningful variable and function names
- Comment complex logic
- Keep functions focused and concise

## License

This project is licensed under the GNU Affero General Public License v3.0 (AGPL-3.0).
This means:

- You must disclose your source code when you distribute this software
- If you modify and use this software in a network service (like a web app), you must make your modified source code available
- You must state all significant changes made to the software
- You must include the original copyright and license notices
- You cannot use this software for commercial purposes without explicit permission

For more details, see the [full license text](https://www.gnu.org/licenses/agpl-3.0.en.html).

## Support

For support, please:
- Open an issue in the repository

## Acknowledgments

- [react-native-tvos](https://github.com/react-native-tvos/react-native-tvos) team
- [seerr](https://github.com/seerr-team/seerr) project
