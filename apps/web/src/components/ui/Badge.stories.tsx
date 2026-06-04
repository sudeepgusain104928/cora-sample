import type { Meta, StoryObj } from '@storybook/react'
import Badge from './Badge'

const meta: Meta<typeof Badge> = {
  title: 'UI/Badge',
  component: Badge,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Badge>

export const Patient: Story = {
  args: { role: 'patient' },
}

export const Administrator: Story = {
  args: { role: 'admin' },
}
