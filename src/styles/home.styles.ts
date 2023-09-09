import { StyleSheet } from "react-native";
import { 
  COLORS, 
  FONT_SIZE,
  SPACING,
  ROUNDED
} from "@/constants/theme"

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center', 
    padding: SPACING.lg,
    gap: SPACING.lg, 
  },
  contentContainer: {
    gap: SPACING.sm, 
  },
  headline: { 
    color: COLORS.foreground,
    fontSize: FONT_SIZE.xl, 
    textAlign: 'center',
    fontFamily: 'Raleway-Bold' 
  },
  subHeadline: {
    color: COLORS.foreground,
    fontSize: FONT_SIZE.lg, 
    textAlign: 'center',
    fontFamily: 'Raleway-SemiBold' 
  },
  btnGroup: {
    gap: SPACING.sm, 
  },
  btnContainer: {
    flexDirection: 'row',
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