import { StyleSheet } from "react-native";

import {
  COLORS,
  FONT_SIZE,
  SPACING,
  ROUNDED
} from "@/constants/theme"

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    paddingVertical: SPACING.lg
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  contentContainer: {
    gap: SPACING.md - 2
  },
  questionText: {
    color: COLORS.foreground,
    fontSize: FONT_SIZE.xl,
    fontFamily: 'Raleway-Bold'
  },
  optionContainer: {
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  optionLabel: {
    width: 35,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.accent,
    borderRadius: ROUNDED.full
  },
  optionLabelText: {
    color: COLORS.accent,
    fontSize: FONT_SIZE.lg,
    fontFamily: 'Raleway-Bold'
  },
  optionText: {
    color: COLORS.foreground,
    fontSize: FONT_SIZE.base,
    fontFamily: 'Raleway-SemiBold'
  }
})

export default styles
