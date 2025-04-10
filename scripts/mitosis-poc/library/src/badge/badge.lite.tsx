import { Show } from '@builder.io/mitosis';

export interface BadgeProps {
  className?: string;
  children: any;
  size?: 'big';
  variation?: 'info' | 'success' | 'warn' | 'alert';
}

// export default function Badge(props: BadgeProps) {
//   const variation = props.variation;
//   const size = props.size;
//   const baseClass = 'ds-c-badge';
//   const variationClass = variation ? `ds-c-badge--${variation}` : '';
//   const sizeClass = size === 'big' ? 'ds-c-badge--big' : '';
//   const allClasses = [baseClass, variationClass, sizeClass, props.className].filter(Boolean).join(' ');

//   return (
//     <span class={allClasses}>
//       <Show when={variation}>
//         <span class="ds-u-visibility--screen-reader">{variation}: </span>
//       </Show>
//       {props.children}
//     </span>
//   );
// }

export default function Badge(props: BadgeProps) {
  return (
    <span
      className={[
        'ds-c-badge',
        props.variation ? `ds-c-badge--${props.variation}` : '',
        props.size === 'big' ? 'ds-c-badge--big' : '',
        props.className ?? '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <Show when={props.variation}>
        <span className="ds-u-visibility--screen-reader">{props.variation}:</span>
      </Show>
      {props.children}
    </span>
  );
}
