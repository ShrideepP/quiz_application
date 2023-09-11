import {
  useState,
  useEffect
} from "react"
import { 
  useRouter,
  useLocalSearchParams 
} from "expo-router";

import { supabase } from "@/config/supabase";

import { 
  SafeAreaView, 
  Alert,
  ActivityIndicator,
  TouchableOpacity, 
  View,
  Text 
} from "react-native";
import { StatusBar } from "expo-status-bar"
import { Stack } from "expo-router";

import {
  COLORS,
  FONT_SIZE,
  SPACING,
} from "@/constants/theme"
import styles from "@/styles/quiz.style";
import { Icons } from "@/components/icons";

export default function Quiz() {
  const [quiz, setQuiz] = useState<any>({})
  const [questions, setQuestions] = useState<any>({})
  const [isLoading, setIsLoading] = useState(false)
  
  const router = useRouter()
  const { quizId } = useLocalSearchParams()

  async function fetchData() {
    setIsLoading(true)
    try {
      const { data: quizData, error: quizError } = await supabase
        .from('quizzes')
        .select('time_limit, total_questions')
        .eq('id', quizId)

      const { data: questionData, error: questionError } = await supabase
        .from('questions')
        .select('*')
        .eq('quiz_id', quizId)
      
      if(quizError || questionError) {
        Alert.alert('Oops! something went wrong.', `Please try again later`, [
          { text: 'Ok', onPress: () => router.push('/explore') }
        ])
      } else {
        setQuiz(quizData[0])
        setQuestions(questionData)
      }
    } catch (error) {
      Alert.alert(JSON.stringify(error))
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])
  
  return (
    <SafeAreaView style={{ flex: 1, position: 'relative', backgroundColor: COLORS.muted }}>
      <StatusBar style="light" />
      <Stack.Screen
        options={{
          headerTitle: '',
          headerStyle: { backgroundColor: COLORS.accent },
          headerLeft: () => (
            <View 
              style={{ 
                marginBottom: 10, 
                paddingHorizontal: 18, 
                paddingVertical: 4, 
                borderRadius: 99,
                backgroundColor: 'rgba(255, 255, 255, 0.2)'
              }}
            >
              <Text
                style={{ 
                  color: COLORS.background, 
                  fontSize: FONT_SIZE.base,
                  fontFamily: 'Raleway-SemiBold' 
                }}
              >
                {isLoading ? 'Loading' : '1:25:07'}
              </Text>
            </View>
          ),
          headerRight: () => (
            <TouchableOpacity style={{ marginBottom: 10 }}>
              <Icons.Ionicons 
                name="ios-exit-outline" 
                color={COLORS.background} 
                size={20}
              />
            </TouchableOpacity>
          )
        }} 
      />
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator 
            size="large"
            color={COLORS.accent}
          />
        </View>
      ) : (
        <View style={styles.container}>
          <View style={styles.contentContainer}>
            <View style={{ paddingHorizontal: SPACING.lg, gap: SPACING.md }}>
              <Text style={styles.questionText}>
                {questions[0]?.question_order}. {questions[0]?.question_text}
              </Text>
              <View style={{ borderBottomWidth: 1, borderBlockColor: 'rgba(0,0,0,0.1)' }} />
            </View>
            <View>
              <TouchableOpacity style={styles.optionContainer}>
                <View style={[styles.optionLabel]}>
                  <Text style={[styles.optionLabelText]}>A</Text>
                </View>
                <Text style={styles.optionText}>Hello World</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.optionContainer}>
                <View style={[styles.optionLabel]}>
                  <Text style={[styles.optionLabelText]}>B</Text>
                </View>
                <Text style={styles.optionText}>Hello World</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.optionContainer}>
                <View style={[styles.optionLabel]}>
                  <Text style={[styles.optionLabelText]}>C</Text>
                </View>
                <Text style={styles.optionText}>Hello World</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.optionContainer}>
                <View style={[styles.optionLabel]}>
                  <Text style={[styles.optionLabelText]}>D</Text>
                </View>
                <Text style={styles.optionText}>Hello World</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  )
}
