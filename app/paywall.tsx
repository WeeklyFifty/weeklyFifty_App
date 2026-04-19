// app/paywall.tsx
// Modal paywall. TODO(arch §11.5): RevenueCat hosted paywall via
// `react-native-purchases-ui` (deferred to Phase D — D10).

import { Stack } from "expo-router";

import { Screen } from "@/ui/Screen";
import { Text } from "@/ui/Text";

export default function Paywall() {
  return (
    <>
      <Stack.Screen options={{ presentation: "modal", headerShown: false }} />
      <Screen>
        <Text variant="heading">paywall</Text>
        <Text color="secondary">Stub modal — arch §11.5</Text>
      </Screen>
    </>
  );
}
