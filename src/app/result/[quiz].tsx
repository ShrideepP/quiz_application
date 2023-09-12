import { useRouter, useLocalSearchParams, router } from "expo-router";

import { 
  SafeAreaView,
  TouchableOpacity, 
  Image,
  View, 
  Text 
} from "react-native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { COLORS } from "@/constants/theme";
import styles from "@/styles/result.style";

const resultImg = require("@/assets/images/result.png");

export default function QuizResult() {
  const { quiz } = useLocalSearchParams()
  const [score, totalQue] = String(quiz).split('_');

  return (
    <SafeAreaView
      style={{
        flex: 1,
        position: 'relative',
        backgroundColor: COLORS.background
      }}
    >
      <StatusBar style="light" />
      <Stack.Screen 
        options={{
          headerStyle:{ backgroundColor: COLORS.accent },
          headerLeft: () => <View></View>,
          headerRight: () => <View></View>,
          headerTitle: () => (
            <Text style={styles.headerTitle}>Quiz Result</Text>
          )
        }}
      />
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <Image
            source={resultImg} 
            resizeMode="contain"
            style={{ width: 400, height: 250 }}
          />
          <Text style={styles.headline}>
            You scored {score} out of {totalQue}
          </Text>
          <TouchableOpacity onPress={() => router.push('/explore')} style={styles.btnPrimary}>
            <Text style={styles.btnPrimaryText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
