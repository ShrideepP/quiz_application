import { useState, useEffect } from "react";
import { useRouter, useLocalSearchParams } from "expo-router"

import { supabase } from "@/config/supabase";

import {
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  View,
  Text
} from "react-native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import CountDown from "react-native-countdown-component";

import { COLORS, FONT_SIZE } from "@/constants/theme";
import { Icons } from "@/components/icons";
import styles from "@/styles/quiz.style";

const ALPHABETS = ['A', 'B', "C", 'D'];

export default function Quiz() {
  const router = useRouter();
  const { quizId } = useLocalSearchParams();

  const [timeLimit, setTimeLimit] = useState(0)
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [currentQue, setCurrentQue] = useState<any>({});
  const [currentQueIndex, setCurrentQueIndex] = useState(0);
  
  const [running, setRunning] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const [isSelected, setIsSelected] = useState('');
  const [score, setScore] = useState<boolean[]>([]);
      
  function handleOnPress(option: string) {
    setIsSelected(option);
  };

  function handleOnPrev() {
    const updatedScore = score.slice(0, -1);
    setScore(updatedScore);
    setIsSelected('');
    setCurrentQueIndex((prevIndex) => {
      return prevIndex - 1;
    });
  };

  function handleOnNext() {
    if(!isSelected) return Alert.alert('Oops!', 'Please select an option for the current question first.', [
      { text: 'Ok' }
    ]);
    else {
      if(isSelected === currentQue.correct_option) setScore([...score, true]);
      setIsSelected('');
      setCurrentQueIndex((prevIndex) => {
        return prevIndex + 1;
      });
    };
  };
  
  function onQuizComplete() {
    setRunning(false);
    router.push(`/result/${score.length + '_' + totalQuestions}`)
  };

  function onTimeout() {
    Alert.alert("Time's Up!", "Your quiz session has timed out. Don't worry, you can try again later.", [
      { text: 'Ok', onPress: onQuizComplete }
    ]);
  };

  async function fetchData() {
    setIsLoading(true);
    try {
      const { data: quiz, error: errorWhileFetchingTimeLimit } = await supabase
        .from('quizzes')
        .select('time_limit')
        .eq('id', quizId);

      const { data: questions, error: errorWhileFetchingQuestions } = await supabase
        .from('questions')
        .select('*')
        .eq('quiz_id', quizId);

      if(errorWhileFetchingTimeLimit || errorWhileFetchingQuestions) {
        Alert.alert('Oops! something went wrong', 'Please try again later', [
          { text: 'Ok', onPress: () => router.back() },
        ])
      } else {
        setTimeLimit(quiz[0].time_limit * 60);
        setTotalQuestions(questions.length)
        setCurrentQue(questions[currentQueIndex]);
      };
    } catch (error) {
      Alert.alert('Oops! something went wrong', JSON.stringify(error), [
        { text: 'Ok' }
      ])
    } finally {
      setIsLoading(false)
    };
  };

  useEffect(() => {
    fetchData()
  }, [currentQueIndex]);

  return (
    <SafeAreaView style={{ flex: 1, position: 'relative', backgroundColor: COLORS.muted }}>
      <StatusBar style="light" />
      <Stack.Screen
        options={{
          headerTitle: () => (
            <Text 
              style={{
                color: COLORS.background,
                fontSize: FONT_SIZE.sm,
                fontFamily: 'Raleway-SemiBold',
                marginBottom: 10
              }}
            >
              {currentQueIndex + 1} / {totalQuestions}
            </Text>
          ),
          headerStyle: { backgroundColor: COLORS.accent },
          headerLeft: () => (
            <View style={{ marginBottom: 10 }}>
              {timeLimit ? (
                <CountDown 
                  until={20 * 60}
                  timeToShow={['H', 'M', 'S']}
                  onFinish={onTimeout}
                  digitStyle={{
                    width: 25,
                    height: 25,
                    backgroundColor: 'rgba(255,255,255,0.2)'
                  }}
                  digitTxtStyle={{
                    color: COLORS.background,
                    fontSize: FONT_SIZE.sm,
                    fontFamily: 'Raleway-SemiBold'
                  }}
                  timeLabelStyle={{ display: 'none' }}
                  running={running}
                />
              ) : (
                <Text 
                  style={{
                    color: COLORS.background,
                    fontSize: FONT_SIZE.sm,
                    fontFamily: 'Raleway-SemiBold'
                  }}
                >
                  Loading
                </Text>
              )}
            </View>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={onTimeout} style={{ marginBottom: 10 }}>
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
          <View style={styles.header}>
            <Text style={styles.headerTitle}>
              {currentQueIndex + 1}. {currentQue.question_text}
            </Text>
            <View style={{ borderBottomWidth: 1, borderBottomColor: 'rgba(0,0,0,0.1)' }} />
          </View>
          {currentQue?.options && (
            <View>
              {currentQue?.options.map((option: string, index: number) => (
                <TouchableOpacity 
                  key={option} 
                  onPress={() => handleOnPress(option)} 
                  style={[
                    styles.optionContainer, 
                    option === isSelected ? { backgroundColor: 'rgba(14,165,233,0.1)' } : null
                  ]}
                >
                  <View 
                    style={[
                      styles.optionLabelContainer,
                      option === isSelected ? { backgroundColor: COLORS.accent } : null
                    ]}
                  >
                    <Text 
                      style={[
                        styles.optionLabel,
                        option === isSelected ? { color: COLORS.background } : null
                      ]
                    }>
                      {ALPHABETS[index]}
                    </Text>
                  </View>
                  <Text style={styles.option}>{option}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
          <View style={styles.footer}>
            <View style={{ borderBottomWidth: 1, borderBottomColor: 'rgba(0,0,0,0.1)' }} />
            <View style={styles.btnContainer}>
              <TouchableOpacity 
                onPress={handleOnPrev} 
                disabled={currentQueIndex === 0}
                style={[
                  styles.btnOutline, 
                  currentQueIndex === 0 ? { opacity: 0.4 } : null
                ]}
              >
                <Icons.Entypo 
                  name="chevron-small-left" 
                  size={25} 
                  color={COLORS.accent} 
                />
                <Text style={styles.btnOutlineText}>Previous</Text>
              </TouchableOpacity>
              {currentQueIndex + 1 === totalQuestions ? (
                <TouchableOpacity 
                  onPress={onQuizComplete}
                  disabled={!isSelected}
                  style={[
                    styles.btnPrimary, 
                    !isSelected ? { opacity: 0.4 } : null 
                  ]}
                >
                  <Text style={styles.btnPrimaryText}>Continue</Text>
                  <Icons.Entypo 
                    name="chevron-small-right" 
                    size={25} 
                    color={COLORS.background} 
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity 
                  onPress={handleOnNext} 
                  disabled={currentQueIndex + 1 === totalQuestions}
                  style={[
                    styles.btnPrimary, 
                    currentQueIndex + 1 === totalQuestions ? { opacity: 0.4 } : null
                  ]}
                >
                  <Text style={styles.btnPrimaryText}>Next</Text>
                  <Icons.Entypo 
                    name="chevron-small-right" 
                    size={25} 
                    color={COLORS.background} 
                  />
                </TouchableOpacity>
                )}
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};
