import {
  StyleSheet
} from 'react-native';

import { 
  COLORS,
  FONT_SIZE,
  SPACING,
  ROUNDED 
} from '@/constants/theme';

const styles = StyleSheet.create({
  container: {
    gap: SPACING.sm,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    backgroundColor: COLORS.background,
    borderRadius: ROUNDED.lg
  },
  title: {
    color: COLORS.foreground,
    fontSize: FONT_SIZE.lg - 2,
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
});

export default styles;
