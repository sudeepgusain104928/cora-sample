import type { Meta, StoryObj } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import IconInput from './IconInput'
import { SearchIcon, MapPinIcon, LocateIcon } from '../../icons'

const meta = {
  title: 'UI/IconInput',
  component: IconInput,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  decorators: [(Story) => <div className="w-80"><Story /></div>],
  argTypes: {
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof IconInput>

export default meta
type Story = StoryObj<typeof meta>

export const SearchField: Story = {
  args: {
    icon: <SearchIcon />,
    placeholder: 'Type of Therapy',
    'aria-label': 'Type of Therapy',
  },
}

export const LocationWithAction: Story = {
  name: 'With trailing action',
  args: {
    icon: <MapPinIcon />,
    placeholder: 'City, State or Zip Code',
    'aria-label': 'City, State or Zip Code',
    trailing: (
      <button
        type="button"
        aria-label="Use my location"
        onClick={action('use my location')}
        className="text-cora-teal hover:text-cora-blue"
      >
        <LocateIcon />
      </button>
    ),
  },
}

export const Disabled: Story = {
  args: {
    icon: <SearchIcon />,
    placeholder: 'Unavailable',
    disabled: true,
  },
}
