import { Tabs } from "expo-router"
import { Icons } from "@/components/icons"

import { COLORS } from "@/constants/theme";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: COLORS.accent,
      }}
    >
      <Tabs.Screen 
        name="index" 
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <Icons.FontAwesome 
              name="home" 
              size={18} 
              color={color} 
            />
          ),
        }}
      />
      <Tabs.Screen 
        name="explore" 
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => (
            <Icons.AntDesign 
              name="search1" 
              size={18} 
              color={color} 
            />
          ),
        }}
      />
    </Tabs>
  )
}