import styles from './ChipToggle.module.css';

interface ChipToggleGroupProps<T extends string> {
  options: readonly T[];
  value: T[];
  onChange: (value: T[]) => void;
}

export function ChipToggleGroup<T extends string>({ options, value, onChange }: ChipToggleGroupProps<T>) {
  const toggle = (option: T) => {
    onChange(value.includes(option) ? value.filter((v) => v !== option) : [...value, option]);
  };

  return (
    <div className={styles.wrap}>
      {options.map((option) => (
        <button
          key={option}
          type="button"
          className={[styles.chip, value.includes(option) && styles.chipActive].filter(Boolean).join(' ')}
          onClick={() => toggle(option)}
        >
          {option.replace(/_/g, ' ')}
        </button>
      ))}
    </div>
  );
}
