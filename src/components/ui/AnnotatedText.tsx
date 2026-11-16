import {useEffect, useRef, useState, type CSSProperties, type ReactNode} from 'react';

export type AnnotationVariant = 'wavy' | 'underline' | 'doubleUnderline' | 'dottedUnderline' | 'line' | 'arrow' | 'highlight' | 'circle' | 'box' | 'bracket' | 'strikethrough' | 'crossOut';

const marks: Record<AnnotationVariant, string[]> = {
  wavy: ['M2 35 Q8 30 14 35 T26 35 T38 35 T50 35 T62 35 T74 35 T86 35 T98 35'],
  underline: ['M2 35 Q48 39 98 33'],
  doubleUnderline: ['M2 33 Q49 36 98 32', 'M4 39 Q49 42 96 38'],
  dottedUnderline: ['M2 35 L98 35'],
  line: ['M2 34 L98 34'],
  arrow: ['M3 35 Q45 41 96 33', 'M86 29 L97 33 L90 40'],
  highlight: ['M2 25 Q48 22 98 24'],
  circle: ['M52 4 C-14 0 -12 41 49 41 C115 43 116 3 52 4'],
  box: ['M2 4 L98 5 L97 40 L3 39 Z'],
  bracket: ['M10 4 L2 4 L2 40 L10 40', 'M90 4 L98 4 L98 40 L90 40'],
  strikethrough: ['M1 22 L99 20'],
  crossOut: ['M2 4 L98 40', 'M2 40 L98 4'],
};

/** Decorative SVG stays out of accessible names and never intercepts a click. */
export function AnnotatedText({children, variant = 'underline', delay = 0, className = ''}: {
  children: ReactNode; variant?: AnnotationVariant; delay?: number; className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (!('IntersectionObserver' in window)) { setVisible(true); return; }
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) { setVisible(true); observer.disconnect(); }
    }, {threshold: 0.5});
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return <span ref={ref} className={`annotated-text annotation-${variant} ${visible ? 'annotation-visible' : ''} ${className}`} style={{'--annotation-delay': `${Math.max(0, delay)}s`} as CSSProperties}>
    <span className="annotation-word">{children}</span>
    <svg className="annotation-mark" viewBox="0 0 100 44" preserveAspectRatio="none" aria-hidden="true" focusable="false">
      {marks[variant].map((d, index) => <path key={index} d={d} pathLength={1} vectorEffect="non-scaling-stroke" />)}
    </svg>
  </span>;
}

/** Annotate one literal occurrence without changing the author's text. */
export function AnnotatedPhrase({text, keyword, variant}: {text: string; keyword: string; variant?: AnnotationVariant}) {
  const start = keyword ? text.toLocaleLowerCase().indexOf(keyword.toLocaleLowerCase()) : -1;
  if (start < 0) return <>{text}</>;
  return <>{text.slice(0, start)}<AnnotatedText variant={variant}>{text.slice(start, start + keyword.length)}</AnnotatedText>{text.slice(start + keyword.length)}</>;
}
