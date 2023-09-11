import { useState } from "react"
import { useRouter } from "expo-router"
import { supabase } from "@/config/supabase"

import { 
  SafeAreaView,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
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

import { COLORS } from "@/constants/theme"
import styles from "@/styles/create.styles"

interface FormValues {
  name: string
  description: string
  timeLimit: string
}

const initialValues = {
  name: '',
  description: '',
  timeLimit: '',
}

export default function CreateQuiz() {
  const router = useRouter()

  const [loading, setLoading] = useState(false);

  async function handleSubmit(values: FormValues) {
    setLoading(true);

    try {
      const { data } = await supabase
        .from('quizzes')
        .insert({
          'quiz_name': values.name,
          'description': values.description,
          'time_limit': values.timeLimit
        })
        .select('id')
      if(data) router.push(`/create/${data[0].id}`)
    } catch (error) {
      if(error) {
        Alert.alert('Oops, something went wrong!', 'Please try again later.', [
          { text: 'Ok' }
        ])
      }
    } finally {
      setLoading(false)
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
              <Text style={styles.headerTitle}>Create a Quiz</Text>
            </View>
          ),
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()} style={{ paddingBottom: 10 }}>
              <Icons.AntDesign name="arrowleft" color={COLORS.background} size={20} />
            </TouchableOpacity>
          )
        }} 
      />
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <Formik
            validationSchema={quizDetailsSchema}
            initialValues={initialValues}
            onSubmit={handleSubmit}
          >
            {({ handleSubmit, handleChange, values, errors }) => (
              <>
                <View style={styles.formContainer}>
                  <Text style={styles.headline}>Quiz Details</Text>
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
              </>
            )}
          </Formik>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  )
}
