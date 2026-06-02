export interface Service {
  id: string
  name: string
  slug: string
  description: string
  longDescription: string
  icon: string
  conditions: string[]
}

export const mockServices: Service[] = [
  {
    id: '1',
    name: 'Physical Therapy',
    slug: 'physical-therapy',
    description:
      'Evidence-based treatments to restore movement, reduce pain, and improve quality of life.',
    longDescription:
      'Our licensed physical therapists use the latest evidence-based techniques to help you recover from injury, surgery, or chronic conditions. We create personalised plans addressing your specific goals.',
    icon: '🦴',
    conditions: ['Post-surgical rehab', 'Sports injuries', 'Chronic pain', 'Balance disorders'],
  },
  {
    id: '2',
    name: 'Occupational Therapy',
    slug: 'occupational-therapy',
    description:
      'Helping patients regain independence in everyday activities after injury or illness.',
    longDescription:
      'Occupational therapists focus on restoring your ability to perform daily tasks — from dressing and cooking to returning to work — using adaptive strategies and therapeutic exercise.',
    icon: '🤝',
    conditions: ['Upper-limb rehabilitation', 'Fine motor skills', 'Cognitive rehab', 'Home modification'],
  },
  {
    id: '3',
    name: 'Pelvic Health',
    slug: 'pelvic-health',
    description:
      'Specialised care for pelvic floor dysfunction in both women and men.',
    longDescription:
      'Our pelvic health specialists treat a range of conditions through internal and external manual therapy, biofeedback, and therapeutic exercise in a compassionate, private setting.',
    icon: '💙',
    conditions: ['Incontinence', 'Pelvic pain', 'Postpartum recovery', 'Prenatal support'],
  },
  {
    id: '4',
    name: 'Sports Performance',
    slug: 'sports-performance',
    description:
      'Optimise athletic performance and prevent injury with sport-specific training.',
    longDescription:
      'From youth athletes to weekend warriors, our sports performance program combines biomechanical analysis, strength training, and movement efficiency coaching.',
    icon: '🏃',
    conditions: ['Injury prevention', 'Return-to-sport', 'Speed & agility', 'Sports-specific strength'],
  },
  {
    id: '5',
    name: 'TeleHealth',
    slug: 'telehealth',
    description:
      'Connect with your therapist from home via secure video appointments.',
    longDescription:
      'Receive the same high-quality care from the comfort of your home. Our HIPAA-compliant platform supports evaluation, exercise instruction, and progress review.',
    icon: '💻',
    conditions: ['Follow-up visits', 'Home exercise review', 'Remote consultations', 'Chronic condition management'],
  },
  {
    id: '6',
    name: 'Dry Needling',
    slug: 'dry-needling',
    description:
      'Target myofascial trigger points to relieve pain and restore muscle function.',
    longDescription:
      'Certified therapists insert fine monofilament needles into trigger points, releasing muscle tension and reducing referred pain patterns rapidly.',
    icon: '🩺',
    conditions: ['Trigger point pain', 'Muscle tightness', 'Headaches', 'Tendinopathies'],
  },
]
