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
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    flex: 1,
    padding: SPACING.lg
  },
  contentContainer: {
    gap: SPACING.md
  },
  title: {
    color: COLORS.foreground,
    fontSize: FONT_SIZE.xl,
    fontFamily: 'Raleway-SemiBold'
  },
  subTitle: {
    color: COLORS.foreground,
    fontSize: FONT_SIZE.base,
    fontFamily: 'Raleway-SemiBold'
  },
  body: {
    color: COLORS.mutedForground,
    fontSize: FONT_SIZE.base,
    fontFamily: 'Raleway-Regular',
    lineHeight: 25
  },
  iconBox: {
    marginTop: SPACING.xs,
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm
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
  footer: {
    flexDirection: 'row',
    gap: SPACING.sm,
    paddingHorizontal: SPACING.lg
  },
  btnEdit: {
    flex: 1,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.accent,
    borderRadius: ROUNDED.xl,
  },
  btnDelete: {
    flex: 1,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.destructive,
    borderRadius: ROUNDED.xl,
  },
});

export default styles;
