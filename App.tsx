import React from "react";
import { SafeAreaView, StatusBar } from "react-native";
import SettingsPanel from "./components/SettingsPanel";

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" />
      <SettingsPanel />
    </SafeAreaView>
  );
};

export default App;
