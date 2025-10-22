'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function InputPage() {
  const [name, setName] = useState('');
  const [idea, setIdea] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !idea.trim()) {
      alert('Please fill in both fields');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/inputs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, idea }),
      });

      if (response.ok) {
        setSubmitted(true);
        // Reset form after 3 seconds to allow another submission
        setTimeout(() => {
          setSubmitted(false);
          setName('');
          setIdea('');
        }, 3000);
      } else {
        alert('Failed to submit. Please try again.');
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert('Failed to submit. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <main className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <div className="text-6xl mb-4">✅</div>
          <h1 className="text-3xl font-bold text-bb-green">
            Thank you for your contribution!
          </h1>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <h1 className="text-4xl font-bold mb-2 text-center">
          Share Your Idea
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Contribute to the FIP project discussion
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-semibold mb-2"
            >
              Your Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-bb-blue focus:outline-none text-lg"
              placeholder="Enter your name"
              disabled={isSubmitting}
              required
            />
          </div>

          <div>
            <label
              htmlFor="idea"
              className="block text-sm font-semibold mb-2"
            >
              Your Idea
            </label>
            <textarea
              id="idea"
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-bb-blue focus:outline-none text-lg resize-none"
              placeholder="Share your idea..."
              rows={5}
              disabled={isSubmitting}
              required
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full px-6 py-4 bg-bb-yellow text-black font-bold text-lg rounded-lg hover:opacity-80 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Idea'}
          </button>
        </form>
      </div>
    </main>
  );
}
