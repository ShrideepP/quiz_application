import { useRouter } from "expo-router"

import {
  SafeAreaView,
  TouchableOpacity,
  View,
  Image,
  Text,
} from "react-native"
import { StatusBar } from "expo-status-bar"
import { Stack } from "expo-router"

import { COLORS } from "@/constants/theme"
import styles from "@/styles/home.styles"

const logo = require("@/assets/images/logo.png")

export default function Home() {
  const router = useRouter();
  
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.muted }}>
      <StatusBar style="light" />
      <Stack.Screen 
        options={{
          headerStyle: { backgroundColor: COLORS.accent },
          headerTitle: () => (
            <View style={{ paddingBottom: 10 }}>
              <Image 
                source={logo}
                resizeMode="contain"
                style={{ width: 28, height: 28 }}
              />
            </View>
          )
        }}
      />
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <Text style={styles.headline}>Welcome to Quixy</Text>
          <Text style={styles.subHeadline}>Engage, Learn, and Test Your Skills</Text>
        </View>
        <View style={styles.btnGroup}>
          <View style={styles.btnContainer}>
            <TouchableOpacity onPress={() => router.push('/create/')} style={styles.btnOutline}>
              <Text style={styles.btnOutlineText}>Create a Quiz</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.btnContainer}>
            <TouchableOpacity onPress={() => router.push('/explore')} style={styles.btnPrimary}>
              <Text style={styles.btnPrimaryText}>Take a Quiz</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}
