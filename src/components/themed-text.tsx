import { Platform, Text, type TextProps } from 'react-native';

import { Fonts, ThemeColor } from '@/constants/theme';

export type ThemedTextProps = TextProps & {
  type?: 'default' | 'title' | 'small' | 'smallBold' | 'subtitle' | 'link' | 'linkPrimary' | 'code';
  themeColor?: ThemeColor;
  className?: string;
};

const typeClasses: Record<string, string> = {
  default: 'text-base leading-6 font-medium',
  title: 'text-[48px] font-semibold leading-[52px]',
  subtitle: 'text-[32px] font-semibold leading-[44px]',
  small: 'text-sm leading-5 font-medium',
  smallBold: 'text-sm leading-5 font-bold',
  link: 'text-sm leading-[30px]',
  linkPrimary: 'text-sm leading-[30px] text-[#3c87f7]',
  code: 'text-xs',
};

const colorClasses: Record<ThemeColor, string> = {
  text: 'text-app-text dark:text-app-dark-text',
  textSecondary: 'text-app-text-secondary dark:text-app-dark-text-secondary',
  background: 'text-app-bg dark:text-app-dark-bg',
  backgroundElement: 'text-app-element dark:text-app-dark-element',
  backgroundSelected: 'text-app-selected dark:text-app-dark-selected',
};

export function ThemedText({
  style,
  type = 'default',
  themeColor = 'text',
  className,
  ...rest
}: ThemedTextProps) {
  const color = type === 'linkPrimary' ? '' : colorClasses[themeColor];
  const codeStyle =
    type === 'code'
      ? { fontFamily: Platform.select({ ios: Fonts?.mono, android: Fonts?.mono, web: Fonts?.mono }) }
      : undefined;

  return (
    <Text
      className={`${color} ${typeClasses[type]} ${className ?? ''}`.trim()}
      style={[codeStyle, style]}
      {...rest}
    />
  );
}
