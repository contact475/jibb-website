export default function ThemeScript() {
  const themeScript = `
    (function() {
      document.documentElement.setAttribute('data-theme', 'light');
    })();
  `

  return (
    <script
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: themeScript }}
    />
  )
}
