import { Stack } from "expo-router"

const _layout = () => {
  return (
  <Stack screenOptions={{headerShown:false}}>
    <Stack.Screen name="index"/>
    <Stack.Screen name="profile"/>
    <Stack.Screen name="chat"/>
  </Stack>
  )
}

export default _layout