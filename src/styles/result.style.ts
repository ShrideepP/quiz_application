import { StyleSheet } from "react-native";

import { 
  COLORS,
  SPACING,
  FONT_SIZE,
  ROUNDED
} from "@/constants/theme";

const styles = StyleSheet.create({
  headerTitle: {
    color: COLORS.background,
    fontSize: FONT_SIZE.base,
    fontFamily: 'Raleway-SemiBold',
    marginBottom: 10
  },
  container: {
    padding: SPACING.xl,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    width: '100%',
    alignItems: 'center',
    gap: SPACING.lg,
  },
  headline: {
    textAlign: 'center',
    color: COLORS.foreground,
    fontSize: FONT_SIZE.xl,
    fontFamily: 'Raleway-Bold',
  },
  btnPrimary: {
    width: '100%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.accent,
    borderRadius: ROUNDED.xl,
  },
  btnPrimaryText: {
    color: COLORS.background,
    fontSize: FONT_SIZE.base,
    fontFamily: 'Raleway-Medium'
  },
});

export default styles;
