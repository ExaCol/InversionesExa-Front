import { View, type ViewProps } from 'react-native';

import { ThemeColor } from '@/constants/theme';

export type ThemedViewProps = ViewProps & {
  type?: ThemeColor;
  className?: string;
};

const bgClasses: Record<ThemeColor, string> = {
  background: 'bg-app-bg dark:bg-app-dark-bg',
  backgroundElement: 'bg-app-element dark:bg-app-dark-element',
  backgroundSelected: 'bg-app-selected dark:bg-app-dark-selected',
  text: 'bg-app-text dark:bg-app-dark-text',
  textSecondary: 'bg-app-text-secondary dark:bg-app-dark-text-secondary',
};

export function ThemedView({ style, type = 'background', className, ...otherProps }: ThemedViewProps) {
  return (
    <View
      className={`${bgClasses[type]} ${className ?? ''}`.trim()}
      style={style}
      {...otherProps}
    />
  );
}
