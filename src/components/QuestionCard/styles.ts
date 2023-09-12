import { StyleSheet } from "react-native";

import { 
  COLORS, 
  FONT_SIZE, 
  SPACING, 
  ROUNDED 
} from "@/constants/theme";

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 'auto',
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    gap: SPACING.md,
    backgroundColor: COLORS.background,
    borderRadius: ROUNDED.md
  },
  title: {
    color: COLORS.foreground,
    fontSize: FONT_SIZE.base,
    fontFamily: 'Raleway-SemiBold'
  },
  btnContainer: {
    flexDirection: "row",
    gap: SPACING.sm
  },
  btnEdit: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.accent,
    borderRadius: ROUNDED.sm
  },
  btnDelete: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.destructive,
    borderRadius: ROUNDED.sm
  }
});

export default styles;
