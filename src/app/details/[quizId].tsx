import { 
  useState, 
  useEffect 
} from 'react';
import { 
  useRouter, 
  useLocalSearchParams 
} from "expo-router"

import { supabase } from '@/config/supabase';

import { 
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  View,
  Text 
} from "react-native"
import { StatusBar } from "expo-status-bar"
import { Stack } from "expo-router"
import { Icons } from "@/components/icons"

import { 
  COLORS,
  SPACING,
  FONT_SIZE 
} from "@/constants/theme"
import styles from "@/styles/details.styles"

export default function QuizDetails() {
  const router = useRouter()
  const { quizId } = useLocalSearchParams()

  const [quizDetails, setQuizDetails] = useState<any>({})
  const [loading, setLoading] = useState(false)
  const [deleteLoader, setDeleteLoader] = useState(false)

  async function fetchQuizDetails() {
    setLoading(true)
    try {
      const { data } = await supabase
        .from('quizzes')
        .select('*')
        .eq('id', quizId)
      if(data) setQuizDetails(data[0])
    } catch (error) {
      if(error) Alert.alert('Oops! something went wrong')
    } finally {
      setLoading(false)
    }
  }

  async function deleteQuiz() {
    setDeleteLoader(true);
    try {      
      const { error: questionError } = await supabase
        .from('questions')
        .delete()
        .eq('quiz_id', quizId)
        
      const { error: quizError } = await supabase 
        .from('quizzes')
        .delete()
        .eq('id', quizId)

      if(quizError || questionError) {
        Alert.alert('Oops! something went wrong', `${JSON.stringify(quizError)} ${JSON.stringify(questionError)}`)
      } else router.push('/explore')
    } catch (error) {
      if(error) Alert.alert('Oops! something went wrong')
    } finally {
      setDeleteLoader(false);
    }
  }

  function handleDeleteOnPress() {
    Alert.alert("Are you sure?", "This action cannot be undone. This will permanently delete the Quiz!", [
      { text: 'Cancel' },
      { text: 'Continue', onPress: deleteQuiz }
    ])
  };

  useEffect(() => {
    fetchQuizDetails();
  }, [])

  return (
    <SafeAreaView style={{ flex: 1, position: 'relative', backgroundColor: COLORS.muted }}>
      <StatusBar style="light" />
      <Stack.Screen 
        options={{
          headerStyle: { backgroundColor: COLORS.accent },
          headerTitle: () => (
            <View style={{ paddingBottom: 10 }}>
              <Text style={styles.headerTitle}>Quiz Details</Text>
            </View>
          ),
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()} style={{ paddingBottom: 10 }}>
              <Icons.AntDesign name="arrowleft" color={COLORS.background} size={20} />
            </TouchableOpacity>
          )
        }} 
      />
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.accent} />
        </View>
      ) : (
        <View style={styles.container}>
          <View style={styles.contentContainer}>
            <Text style={styles.title}>{quizDetails.quiz_name}</Text>
            <View style={{ borderBottomWidth: 1, borderBlockColor: 'rgba(0,0,0,0.1)' }} />
            <View style={{ gap: SPACING.sm }}>
              <Text style={styles.subTitle}>Description:</Text>
              <Text style={styles.body}>{quizDetails.description}</Text>
            </View>
            <View style={{ borderBottomWidth: 1, borderBlockColor: 'rgba(0,0,0,0.1)' }} />
            <View style={{ flexDirection: 'row', gap: SPACING.md }}>
              <View style={styles.iconBox}>
                <Icons.AntDesign 
                  name='questioncircleo' 
                  color={COLORS.accent} 
                  size={20}
                />
                <Text style={styles.subTitle}>
                  {quizDetails.total_questions} questions
                </Text>
              </View>
              <View style={styles.iconBox}>
                <Icons.Entypo 
                  name='stopwatch' 
                  color={COLORS.accent} 
                  size={20}
                />
                <Text style={styles.subTitle}>
                  {quizDetails.time_limit} min
                </Text>
              </View>
            </View>
            <View style={{ borderBottomWidth: 1, borderBlockColor: 'rgba(0,0,0,0.1)' }} />
            {quizDetails.total_questions > 0 ? (
              <TouchableOpacity style={styles.btnPrimary}>
                <Text style={styles.btnPrimaryText}>Start Quiz</Text>
              </TouchableOpacity>
            ) : (
              <View style={{ flexDirection: 'row', gap: SPACING.sm }}>
                <Text style={styles.body}>There are no questions in this quiz!</Text>
                <TouchableOpacity onPress={() => router.push(`/create/${quizDetails.id}_${quizDetails.total_questions}`)}>
                  <Text style={{ color: COLORS.accent, fontSize: FONT_SIZE.base, fontFamily: 'Raleway-SemiBold', lineHeight: 25 }}>Add Questions?</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      )}
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => router.push(`/edit/${quizDetails.id}`)} style={styles.btnEdit}>
          <Icons.MaterialCommunityIcons 
            name="pencil-outline" 
            size={20}
            color={COLORS.accent} 
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnDelete} onPress={handleDeleteOnPress}>
          {deleteLoader ? (
            <ActivityIndicator  
              size="small"
              color={COLORS.destructive}
            />
          ) : (
            <Icons.Feather 
              name="trash-2" 
              size={20}
              color={COLORS.destructive} 
            />
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}
