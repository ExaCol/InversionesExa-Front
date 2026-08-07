import { Picker } from '@expo/ui';

type Option<T extends string> = { label: string; value: T };

type ThemedSelectProps<T extends string> = {
  options: Option<T>[];
  value: T;
  onChange: (value: T) => void;
  enabled?: boolean;
};

export function ThemedSelect<T extends string>({
  options,
  value,
  onChange,
  enabled = true,
}: ThemedSelectProps<T>) {
  return (
    <Picker selectedValue={value} onValueChange={onChange} enabled={enabled} appearance="menu">
      {options.map((opt) => (
        <Picker.Item key={opt.value} label={opt.label} value={opt.value} />
      ))}
    </Picker>
  );
}