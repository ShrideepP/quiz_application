import {
  useState,
  useEffect
} from "react"
import { 
  useRouter, 
  useLocalSearchParams 
} from "expo-router"

import { supabase } from "@/config/supabase"

import {
  SafeAreaView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
  Alert,
  View,
  TextInput,
  Text
} from "react-native"
import { StatusBar } from "expo-status-bar"
import { Stack } from "expo-router"
import { Icons } from "@/components/icons"

import { Formik } from "formik"
import { quizDetailsSchema } from "@/lib/schema"

import { 
  COLORS,
  SPACING 
} from "@/constants/theme"
import styles from "@/styles/edit.styles"

interface FormValues {
  name: string
  description: string
  timeLimit: string
}

export default function EditQuiz() {

  const router = useRouter()
  const { quizId } = useLocalSearchParams()

  const [quizDetails, setQuizDetails] = useState<any>({})
  const [loading, setLoading] = useState(false)
  const [submitLoader, setSubmitLoader] = useState(false)

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

  async function handleSubmit(values: FormValues) {
    const { name, description, timeLimit } = values;
    setSubmitLoader(true)
    
    try {
      const { error } = await supabase
        .from('quizzes')
        .update({
          'quiz_name': name,
          'description': description,
          'time_limit': timeLimit
        })
        .eq('id', quizId)
      if(error) {
        Alert.alert('Oops, something went wrong!', JSON.stringify(error), [
          { text: 'Ok' }
        ])
      } else router.push('/explore')
    } catch (error) {
      if(error) {
        Alert.alert('Oops, something went wrong!', 'Please try again later.', [
          { text: 'Ok' }
        ])
      }
    } finally {
      setSubmitLoader(false)
    }
  }

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
              <Text style={styles.headerTitle}>Edit Quiz</Text>
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
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.container}>
            <Formik
              onSubmit={handleSubmit}
              validationSchema={quizDetailsSchema}
              initialValues={{
                name: quizDetails.quiz_name,
                description: quizDetails.description,
                timeLimit: String(quizDetails.time_limit)
              }}
            >
              {({ handleSubmit, handleChange, values, errors }) => (
                <View style={styles.formContainer}>
                  <Text style={styles.headline}>Update Details</Text>
                  <View style={{ borderBottomWidth: 1, borderBlockColor: 'rgba(0,0,0,0.1)' }} />
                  <View style={styles.inputWrapper}>
                    {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
                    <TextInput
                      value={values.name}
                      onChangeText={handleChange('name')}
                      placeholder="Enter quiz name"
                      placeholderTextColor={COLORS.mutedForground}
                      style={styles.inputField}
                    />
                  </View>
                  <View style={styles.inputWrapper}>
                    {errors.description && <Text style={styles.errorText}>{errors.description}</Text>}
                    <TextInput
                      value={values.description}
                      onChangeText={handleChange('description')}
                      placeholder="Add a description"
                      placeholderTextColor={COLORS.mutedForground}
                      style={styles.inputField}
                    />
                  </View>
                  <View style={styles.inputWrapper}>
                    {errors.timeLimit && <Text style={styles.errorText}>{errors.timeLimit}</Text>}
                    <TextInput
                      value={values.timeLimit}
                      onChangeText={handleChange('timeLimit')}
                      keyboardType="numeric"
                      placeholder="Enter time limit in minutes"
                      placeholderTextColor={COLORS.mutedForground}
                      style={styles.inputField}
                    />
                  </View>
                  <TouchableOpacity onPress={() => handleSubmit()} style={styles.btnPrimary}>
                    {submitLoader ? (
                      <ActivityIndicator 
                        size="small" 
                        color={COLORS.background} 
                      />
                    ) : (
                      <Text style={styles.btnPrimaryText}>Publish and Continue</Text>
                    )}
                  </TouchableOpacity>
                </View>
              )}
            </Formik>
          </View>
        </TouchableWithoutFeedback>
      )}
    </SafeAreaView>
  )
}
