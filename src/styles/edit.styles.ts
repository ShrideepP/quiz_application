import { StyleSheet } from "react-native";
import { 
  COLORS, 
  FONT_SIZE,
  SPACING,
  ROUNDED
} from "@/constants/theme"

const styles = StyleSheet.create({
  headerTitle: {
    color: COLORS.background,
    fontSize: FONT_SIZE.base,
    fontFamily: 'Raleway-SemiBold',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.lg,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  formContainer: {
    width: '100%',
    gap: SPACING.md - 2,
  },
  headline: {
    color: COLORS.foreground,
    fontSize: FONT_SIZE.lg + 2,
    fontFamily: 'Raleway-Bold',
    paddingHorizontal: SPACING.xs,
  },
  inputWrapper: {
    gap: SPACING.sm
  },
  inputField: {
    width: '100%',
    height: 50,
    paddingHorizontal: SPACING.md,
    color: COLORS.foreground,
    fontSize: FONT_SIZE.base,
    fontFamily: 'Raleway-Medium',
    backgroundColor: COLORS.background,
    borderRadius: ROUNDED.lg
  },
  errorText: {
    color: COLORS.destructive,
    fontSize: FONT_SIZE.sm,
    fontFamily: 'Raleway-Medium'
  },
  btnOutline: {
    width: '100%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.accent,
    borderRadius: ROUNDED.xl,
  },
  btnOutlineText: {
    color: COLORS.accent,
    fontSize: FONT_SIZE.base,
    fontFamily: 'Raleway-Medium'
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
