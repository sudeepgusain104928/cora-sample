import type { Leader } from '../../types'

/**
 * Props for the `LeaderCard` component.
 */
export interface LeaderCardProps extends Leader {}

/**
 * Portrait card for a CORA leadership team member.
 *
 * Renders inside a `<li>` to be placed in a grid `<ul>`.  Hovering scales the
 * portrait photo slightly and deepens the card shadow.
 *
 * @example
 * ```tsx
 * <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
 *   {leadership.map(person => <LeaderCard key={person.name} {...person} />)}
 * </ul>
 * ```
 */
export default function LeaderCard({ name, title, image }: LeaderCardProps) {
  return (
    <li className="group">
      <div className="overflow-hidden rounded-lg bg-cora-light shadow-sm ring-1 ring-gray-100 transition-shadow group-hover:shadow-lg">
        <div className="aspect-[3/4] overflow-hidden">
          <img
            src={image}
            alt={name}
            loading="lazy"
            className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="p-4">
          <h2 className="text-sm font-semibold text-cora-navy">{name}</h2>
          <p className="mt-1 text-sm font-medium leading-snug text-cora-blue">{title}</p>
        </div>
      </div>
    </li>
  )
}
