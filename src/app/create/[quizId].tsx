import { useState } from "react"
import { 
  useRouter, 
  useGlobalSearchParams 
} from "expo-router"

import { supabase } from "@/config/supabase";

import { 
  SafeAreaView,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  View,
  TextInput,
  Text, 
} from "react-native";
import { StatusBar } from "expo-status-bar"
import { Stack } from "expo-router"
import { Icons } from "@/components/icons"

import {
  Formik,
  type FormikHelpers
} from "formik"
import { quizQueSchema } from "@/lib/schema"

import { COLORS } from "@/constants/theme"
import styles from "@/styles/addQuestion.styles"

interface FormValues {
  questionName: string
  option1: string
  option2: string
  option3: string
  option4: string
  correctAnswer: string
}

const initialValues = {
  questionName: '',
  option1: '',
  option2: '',
  option3: '',
  option4: '',
  correctAnswer: '',
}

export default function AddQuestion() {
  const router = useRouter()
  const { quizId } = useGlobalSearchParams()

  const [loading, setLoading] = useState(false)

  const handleSubmit = async (values: typeof initialValues, { resetForm }: FormikHelpers<typeof initialValues>) => {
      setLoading(true)

      try {
        const { error: questionError } = await supabase
          .from('questions')
          .insert({
            'question_text': values.questionName,
            'options': [values.option1, values.option2, values.option3, values.option4],
            'correct_option': values.correctAnswer,
            'quiz_id': quizId,
          })

        if(questionError) {
          Alert.alert('Oops, something went wrong!', 'Please try again later', [
            { text: 'Ok', onPress: () => router.push('/') }
          ])
        } else {
          router.setParams({ quizData: `${quizId}` })
          Alert.alert('SUCCESS!', 'The question has been added successfuly! would you like to add more?', [
            { text: 'No', onPress: () => router.push('/') },
            { text: 'Yes' },
          ])
        }
      } catch (error) {
        Alert.alert('Oops, something went wrong!', 'Please try again later.', [
          { text: 'Ok' }
        ])
      } finally {
        setLoading(false)
        resetForm()
      }
    }

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
            <TouchableOpacity onPress={() => router.push('/')} style={{ paddingBottom: 10 }}>
              <Icons.AntDesign name="arrowleft" color={COLORS.background} size={20} />
            </TouchableOpacity>
          )
        }} 
      />
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <Formik
            onSubmit={handleSubmit}
            validationSchema={quizQueSchema}
            initialValues={initialValues}
          >
            {({ handleSubmit, handleChange, values, errors }) => (
              <View style={styles.formContainer}>
                <Text style={styles.headline}>Add Question</Text>
                <View style={{ borderBottomWidth: 1, borderBlockColor: 'rgba(0,0,0,0.1)' }} />
                <View style={styles.inputWrapper}>
                  {errors.questionName && <Text style={styles.errorText}>{errors.questionName}</Text>}
                  <TextInput 
                    value={values.questionName}
                    onChangeText={handleChange('questionName')}
                    placeholder="Enter question"
                    placeholderTextColor={COLORS.mutedForground}
                    style={styles.inputField}
                  />
                </View>
                <View style={styles.inputWrapper}>
                  {errors.option1 && <Text style={styles.errorText}>{errors.option1}</Text>}
                  <TextInput 
                    value={values.option1}
                    onChangeText={handleChange('option1')}
                    placeholder="Enter option 1"
                    placeholderTextColor={COLORS.mutedForground}
                    style={styles.optionField}
                  />
                </View>
                <View style={styles.inputWrapper}>
                  {errors.option2 && <Text style={styles.errorText}>{errors.option2}</Text>}
                  <TextInput 
                    value={values.option2}
                    onChangeText={handleChange('option2')}
                    placeholder="Enter option 2"
                    placeholderTextColor={COLORS.mutedForground}
                    style={styles.optionField}
                  />
                </View>
                <View style={styles.inputWrapper}>
                  {errors.option3 && <Text style={styles.errorText}>{errors.option3}</Text>}
                  <TextInput 
                    value={values.option3}
                    onChangeText={handleChange('option3')}
                    placeholder="Enter option 3"
                    placeholderTextColor={COLORS.mutedForground}
                    style={styles.optionField}
                  />
                </View>
                <View style={styles.inputWrapper}>
                  {errors.option4 && <Text style={styles.errorText}>{errors.option4}</Text>}
                  <TextInput 
                    value={values.option4}
                    onChangeText={handleChange('option4')}
                    placeholder="Enter option 4"
                    placeholderTextColor={COLORS.mutedForground}
                    style={styles.optionField}
                  />
                </View>
                <View style={styles.inputWrapper}>
                  {errors.correctAnswer && <Text style={styles.errorText}>{errors.correctAnswer}</Text>}
                  <TextInput 
                    value={values.correctAnswer}
                    onChangeText={handleChange('correctAnswer')}
                    placeholder="Right answer of the above question."
                    placeholderTextColor={COLORS.mutedForground}
                    style={styles.inputField}
                  />
                </View>
                <TouchableOpacity onPress={() => handleSubmit()} style={styles.btnPrimary}>
                  {loading ? (
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
    </SafeAreaView>
  )
}
