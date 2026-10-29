import { useId, useState } from 'react';
import { PRESETS, normalizeHex } from './brand-colors';
import { useBrand, type Theme } from './brand';

export function BrandControls() {
  const { color, mover, theme, setTheme, setColor, setMover } = useBrand();
  const [hex, setHex] = useState<string | null>(null);
  const id = useId();
  return (
    <div className="space-y-5">
      <div>
        <label htmlFor={`${id}-company`} className="mb-2 block text-sm font-medium">
          Company name
        </label>
        <input
          id={`${id}-company`}
          value={mover}
          maxLength={32}
          onChange={(event) => setMover(event.target.value)}
          className="h-11 w-full rounded-lg border border-line bg-card px-3 text-base"
        />
      </div>
      <fieldset>
        <legend className="mb-2 text-sm font-medium">Company color</legend>
        <div className="flex flex-wrap gap-2">
          {PRESETS.map((preset) => (
            <button
              key={preset.color}
              type="button"
              aria-label={`Use ${preset.label}`}
              aria-pressed={color === preset.color}
              title={preset.label}
              onClick={() => setColor(preset.color)}
              className={`flex size-11 items-center justify-center rounded-full border border-line ${color === preset.color ? 'ring-2 ring-ink ring-offset-2 ring-offset-card' : ''}`}
            >
              <span className="size-8 rounded-full" style={{ background: preset.color }} />
            </button>
          ))}
          <input
            type="color"
            value={color}
            onChange={(event) => setColor(event.target.value)}
            className="h-11 w-11 cursor-pointer rounded-lg border border-line bg-card p-1"
            aria-label="Pick a custom company color"
          />
        </div>
      </fieldset>
      <div className="flex items-center gap-3">
        <label htmlFor={`${id}-hex`} className="text-sm text-muted-fg">
          Hex color
        </label>
        <input
          id={`${id}-hex`}
          value={hex ?? color}
          spellCheck={false}
          maxLength={7}
          onBlur={() => setHex(null)}
          onChange={(event) => {
            setHex(event.target.value);
            const normalized = normalizeHex(event.target.value);
            if (normalized) setColor(normalized);
          }}
          className="h-11 w-28 rounded-lg border border-line bg-card px-3 font-mono text-sm"
        />
      </div>
      <details className="border-t border-line pt-3">
        <summary className="flex min-h-11 cursor-pointer items-center text-sm text-muted-fg">Page appearance</summary>
        <div className="mt-2 flex gap-2" role="group" aria-label="Page appearance">
          {(['light', 'dark', 'system'] as Theme[]).map((value) => (
            <button
              key={value}
              type="button"
              aria-pressed={theme === value}
              onClick={() => setTheme(value)}
              className={`min-h-11 flex-1 rounded-lg border border-line px-3 text-sm ${theme === value ? 'bg-primary text-primary-fg' : 'bg-card hover:bg-muted'}`}
            >
              {value === 'system' ? 'Automatic' : value === 'dark' ? 'Dark' : 'Light'}
            </button>
          ))}
        </div>
      </details>
    </div>
  );
}

export function BrandPanel() {
  const { color, ink } = useBrand();
  return (
    <>
      <div
        id="brand-settings"
        popover="auto"
        onToggle={(event) => {
          if (event.newState === 'open') event.currentTarget.querySelector('input')?.focus();
        }}
        className="brand-popover rounded-2xl border border-line bg-card p-5 text-ink shadow-[0_16px_40px_-16px_rgba(0,0,0,.4)]"
      >
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-lg font-semibold">Preview your brand</h2>
          <button
            type="button"
            popoverTarget="brand-settings"
            popoverTargetAction="hide"
            className="flex size-11 items-center justify-center rounded-lg hover:bg-muted"
            aria-label="Close brand preview"
          >
            <svg aria-hidden viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="m4 4 8 8m0-8-8 8" />
            </svg>
          </button>
        </div>
        <p className="mt-1 mb-5 text-sm leading-relaxed text-muted-fg">
          Add your company name and color. The sample reports and page will update as you try them.
        </p>
        <BrandControls />
      </div>
      <button
        type="button"
        popoverTarget="brand-settings"
        className="fixed right-4 bottom-4 z-50 flex h-12 items-center gap-2 rounded-full border border-line bg-card py-1 pr-4 pl-1.5 text-sm font-medium text-ink shadow-[0_8px_24px_-12px_rgba(0,0,0,.35)] sm:right-6 sm:bottom-6"
      >
        <span className="flex size-9 items-center justify-center rounded-full" style={{ background: color, color: ink }}>
          <svg
            aria-hidden
            viewBox="0 0 20 20"
            className="size-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 17c2.5 0 4-1.2 4-3.4 0-1.2-.9-2.1-2-2.1s-2 .9-2 2.1V17ZM7.4 11.6 16 3l1 1-8.6 8.6" />
          </svg>
        </span>
        Try your brand
      </button>
    </>
  );
}
