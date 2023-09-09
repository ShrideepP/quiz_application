import { useRouter } from 'expo-router';
import {
  TouchableOpacity,
  View,
  Text
} from 'react-native';
import { Icons } from '@/components/icons';

import { COLORS } from '@/constants/theme';
import styles from './styles';

interface QuizCardProps {
  id: string;
  quiz_name: string;
  description: string;
  time_limit: number;
}

export default function QuizCard({
  id,
  quiz_name,
  description,
  time_limit
} : QuizCardProps) {
  const router = useRouter();
  return (
    <TouchableOpacity style={styles.container} onPress={() => router.push(`/details/${id}`)}>
      <Text style={styles.title} numberOfLines={1}>
        {quiz_name}
      </Text>
      <Text style={styles.body}>
        {description}
      </Text>
      <View style={styles.iconBox}>
        <Icons.Entypo 
          name='stopwatch' 
          color={COLORS.accent} 
          size={20}
        />
        <Text style={styles.subTitle}>
          {time_limit} min
        </Text>
      </View>
    </TouchableOpacity>
  )
}
