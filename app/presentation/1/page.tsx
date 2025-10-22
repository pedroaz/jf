import { NavigationButtons } from '@/components/NavigationButtons';

export default function Presentation1() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <NavigationButtons nextHref="/presentation/2" />

      <div className="text-center">
        <h1 className="text-6xl font-bold mb-8">
          Dev Chapter Update - FIP
        </h1>
        <p className="text-2xl text-gray-600">
          22.10.2025
        </p>
      </div>
    </main>
  );
}
