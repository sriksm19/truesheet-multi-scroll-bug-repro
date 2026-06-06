# TrueSheet `scrollable` bug 🐛

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app) to reproduce a bug with [@lodev09/react-native-true-sheet](https://github.com/lodev09/react-native-true-sheet) with scrollviews:

1. Multiple Scroll View issue (Android):

- When there are 2 scrollables (`ScrollView` or `Flatlist`) present in a Truesheet, only the first scrollView is scrollable, the second scrollview doesn't scroll at all (this is despite `scrollable` prop enabled, and doesn't seem to work even with the prop disabled). Works perfectly in iOS

2. ScrollView Height issue (iOS):

- If `scrollable` prop is enabled, then the (first) ScrollView occupies larger height for some reason, and doesn't even acknowledge the explicit `height` (had to resort to workarounds in my production app which is not present in this repro). This works fine on Android

3. Minor:

- Drag to close seems to have a higher threshold in Android after a scroll - sometimes i had to drag harder (Could be my nit pick).

## Get started

1. Install dependencies

    ```bash
    npm install
    ```

2. Start the app

- if iOS:

    ```bash
    npx expo run:ios
    ```

- if Android:

    ```bash
    npx expo run:android
    ```

<!-- In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction). -->
<!--
## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions. -->
