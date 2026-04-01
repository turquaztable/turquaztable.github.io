/**
 * IngredientChecklist.tsx
 * React island (client:load) - Checkable ingredient list for recipe detail pages.
 * Persists checked state only for the current session (no localStorage in Claude artifacts).
 * Checked items get a strikethrough + dimmed style.
 */
import { useState } from 'react';

interface Ingredient {
  amount?: string;
  unit?: string;
  name: string;
  notes?: string;
  _key?: string;
}

interface Props {
  ingredients: Ingredient[];
}

export default function IngredientChecklist({ ingredients }: Props) {
  const [checked, setChecked] = useState<Set<number>>(new Set());

  const toggle = (index: number) => {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  if (!ingredients?.length) {
    return (
      <p style={{
        fontFamily: 'var(--font-sans)',
        fontSize: 14,
        color: 'var(--text-light)',
      }}>
        No ingredients listed.
      </p>
    );
  }

  return (
    <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
      {ingredients.map((ing, i) => {
        const isChecked = checked.has(i);
        const label = [ing.amount, ing.unit, ing.name].filter(Boolean).join(' ');
        const notes = ing.notes;

        return (
          <li
            key={ing._key || i}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 12,
              padding: '10px 0',
              borderBottom: '1px solid var(--border)',
              cursor: 'pointer',
              opacity: isChecked ? 0.45 : 1,
              transition: 'opacity 0.2s ease',
            }}
            onClick={() => toggle(i)}
          >
            {/* Custom checkbox */}
            <span
              style={{
                width: 20,
                height: 20,
                flexShrink: 0,
                marginTop: 1,
                border: isChecked ? 'none' : '2px solid var(--border)',
                background: isChecked ? 'var(--green-deep)' : 'transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.15s ease',
              }}
              role="checkbox"
              aria-checked={isChecked}
              aria-label={`Mark ${label} as ${isChecked ? 'not gathered' : 'gathered'}`}
            >
              {isChecked && (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
            </span>

            {/* Ingredient text */}
            <span style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 15,
              lineHeight: 1.5,
              color: 'var(--text)',
              textDecoration: isChecked ? 'line-through' : 'none',
              textDecorationColor: 'var(--text-light)',
            }}>
              {ing.amount && (
                <strong style={{ fontWeight: 600 }}>{ing.amount} </strong>
              )}
              {ing.unit && (
                <span>{ing.unit} </span>
              )}
              <span>{ing.name}</span>
              {notes && (
                <span style={{
                  color: 'var(--text-light)',
                  fontStyle: 'italic',
                  marginLeft: 4,
                }}>
                  ({notes})
                </span>
              )}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
