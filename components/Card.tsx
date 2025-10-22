interface CardProps {
  title: string;
  description: string;
  variant?: 'yellow' | 'pink' | 'blue' | 'green';
}

export function Card({ title, description, variant = 'yellow' }: CardProps) {
  const variantClasses = {
    yellow: 'border-bb-yellow bg-bb-yellow/10',
    pink: 'border-bb-pink bg-bb-pink/10',
    blue: 'border-bb-blue bg-bb-blue/10',
    green: 'border-bb-green bg-bb-green/10',
  };

  return (
    <div
      className={`border-2 rounded-lg p-6 ${variantClasses[variant]} transition-all duration-300 hover:shadow-lg`}
    >
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-sm">{description}</p>
    </div>
  );
}
