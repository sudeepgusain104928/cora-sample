import type { Meta, StoryObj } from '@storybook/react'
import IconInput from './IconInput'
import { SearchIcon, MapPinIcon, LocateIcon } from '@cora/ui'

const meta: Meta<typeof IconInput> = {
  title: 'UI/IconInput',
  component: IconInput,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof IconInput>

export const WithSearchIcon: Story = {
  args: {
    icon: <SearchIcon />,
    placeholder: 'Type of Therapy',
  },
}

export const WithTrailing: Story = {
  args: {
    icon: <MapPinIcon />,
    placeholder: 'City, State or Zip Code',
    trailing: (
      <button type="button" className="text-cora-teal hover:text-cora-blue">
        <LocateIcon />
      </button>
    ),
  },
}
