import { FaStar } from 'react-icons/fa'

export function Rating({ rating = 4, count = 10 }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <FaStar
            key={i}
            className={i < rating ? 'text-yellow-400' : 'text-slate-300'}
            size={14}
          />
        ))}
      </div>
      <span className="text-sm text-slate-600">({count})</span>
    </div>
  )
}