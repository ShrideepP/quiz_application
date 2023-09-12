import { useState } from "react";
import { useRouter } from "expo-router";

import { supabase } from "@/config/supabase";

import {
  View,
  ActivityIndicator,
  TouchableOpacity,
  Text,
  Alert
} from "react-native";

import { COLORS } from "@/constants/theme";
import { Icons } from "@/components/icons";
import styles from "./styles";

interface QuestionCardProps {
  id: string;
  question_text: string;
};

export default function QuestionCard({ id, question_text } : QuestionCardProps) {
  const [deleteLoader, setDeleteLoader] = useState(false);
  const router = useRouter();

  async function deleteQue() {
    setDeleteLoader(true);
    try {
      const { error } = await supabase
        .from('questions')
        .delete()
        .eq('id', id);
      if(error) {
        Alert.alert('Oops! something went wrong', JSON.stringify(error), [
          { text: 'Ok' }
        ]);
      };
    } catch (error) {
      Alert.alert('Oops! something went wrong.', JSON.stringify(error), [
        { text: 'Ok' }
      ]);
    } finally {
      setDeleteLoader(false);
    };
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title} numberOfLines={1}>{question_text}</Text>
      <View style={styles.btnContainer}>
        <TouchableOpacity onPress={() => router.push(`/edit/question/${id}`)} style={styles.btnEdit}>
          <Icons.MaterialCommunityIcons 
            name="pencil-outline" 
            size={20}
            color={COLORS.accent} 
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={deleteQue} style={styles.btnDelete}>
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
    </View>
  );
};
