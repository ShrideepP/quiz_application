import { StyleSheet } from "react-native";
import { SPACING } from "@/constants/theme"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: SPACING.md,
    padding: SPACING.lg,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
});

export default styles;
