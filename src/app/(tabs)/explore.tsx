import { 
  useState, 
  useCallback, 
  useEffect
} from 'react';

import {
  SafeAreaView,
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Alert,
  Image,
  View
} from "react-native"
import { StatusBar } from "expo-status-bar"
import { Stack } from "expo-router"

import { supabase } from "@/config/supabase"

const logo = require("@/assets/images/logo.png")
import QuizCard from "@/components/QuizCard"

import { 
  COLORS, 
  SPACING 
} from "@/constants/theme"
import styles from "@/styles/explore.styles"

interface Quiz {
  id: string
  quiz_name: string
  description: string
  time_limit: number
}

export default function ExploreQuizzes() {
  const [quizzes, setQuizzes] = useState<[] | any>([])
  const [loading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)

  async function fetchQuizzes() {
    setLoading(true)
    try {
      const { data } = await supabase
        .from('quizzes')
        .select('*')
      if(data) setQuizzes(data)
    } catch (error) {
      if(error) Alert.alert('Oops! something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    fetchQuizzes()
    setRefreshing(false)
  }, [refreshing]);

  useEffect(() => {
    fetchQuizzes()
  }, [])
  
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
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator
            size="large"
            color={COLORS.accent} 
          />
        </View>
      ) : (
        <View style={styles.container}>
          <FlatList 
            data={quizzes}
            keyExtractor={(item: Quiz) => item.id}
            contentContainerStyle={{ rowGap: SPACING.md }}
            showsVerticalScrollIndicator={false}
            extraData={refreshing}
            refreshControl={
              <RefreshControl 
                refreshing={refreshing} 
                onRefresh={onRefresh} 
              />
            }
            renderItem={({ item } : { item: Quiz }) => (
              <QuizCard
                id={item.id}
                quiz_name={item.quiz_name}
                description={item.description}
                time_limit={item.time_limit} 
              />
            )}
          />
        </View>
      )}
    </SafeAreaView>
  )
}
