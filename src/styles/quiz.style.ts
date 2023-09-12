import { StyleSheet } from "react-native";

import {
  COLORS,
  FONT_SIZE,
  SPACING,
  ROUNDED
} from "@/constants/theme";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: SPACING.xl,
    gap: SPACING.xs + 4
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    paddingHorizontal: SPACING.xl,
    gap: SPACING.md + 2
  },
  headerTitle: {
    color: COLORS.foreground,
    fontSize: FONT_SIZE.lg + 2,
    fontFamily: 'Raleway-Bold'
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.xl
  },
  optionLabelContainer: {
    width: 35,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.accent,
    borderRadius: ROUNDED.full
  },
  optionLabel: {
    color: COLORS.accent,
    fontSize: FONT_SIZE.lg - 2,
    fontFamily: 'Raleway-Bold'
  },
  option: {
    color: COLORS.foreground,
    fontSize: FONT_SIZE.lg - 2,
    fontFamily: 'Raleway-SemiBold'
  },
  footer: {
    gap: SPACING.md + 2,
    paddingHorizontal: SPACING.xl,
  },
  btnContainer: {
    flexDirection: 'row',
    gap: SPACING.sm
  },
  btnOutline: {
    flex: 1,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.xs,
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
    flex: 1,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.xs,
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
