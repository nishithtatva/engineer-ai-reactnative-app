import React from "react"
import { createNativeStackNavigator } from "react-native-screens/native-stack"
import { PostScreen, PostDetailScreen } from "../screens"
import { PrimaryParamList } from "./types"

const Stack = createNativeStackNavigator<PrimaryParamList>()

export function PrimaryNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        gestureEnabled: true,
      }}
    >
      <Stack.Screen name="Post" component={PostScreen} />
      <Stack.Screen name="PostDetail" component={PostDetailScreen} />
    </Stack.Navigator>
  )
}

/**
 * A list of routes from which we're allowed to leave the app when
 * the user presses the back button on Android.
 *
 * Anything not on this list will be a standard `back` action in
 * react-navigation.
 */
export const exitRoutes: string[] = ["Post"]
