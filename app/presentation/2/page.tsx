import { NavigationButtons } from '@/components/NavigationButtons';

export default function Presentation2() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <NavigationButtons nextHref="/presentation/extra" backHref="/presentation/1" />

      <div className="text-center max-w-2xl mx-auto px-4">
        <h1 className="text-5xl font-bold mb-8">
          Sorry Maike
        </h1>
        <p className="text-2xl mb-6">
          I didn&apos;t use the PowerPoint template this time...
        </p>
        <p className="text-xl text-gray-600 mb-4">
          But check out the new PPT template on confluence:
        </p>
        <a
          href="#"
          className="text-bb-blue underline text-xl hover:text-bb-pink transition-colors"
        >
          New PPT Template Link
        </a>
        <div className="mt-8 text-sm text-gray-500">
          (@TODO: Add Maike&apos;s photo here)
        </div>
      </div>
    </main>
  );
}
