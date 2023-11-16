import Accordion from '../components/accordion';

export default function AccordionPage() {
  const items = [
    {
      id: Math.random() * 100,
      label: 'Can I use React?',
      content: 'You can use React.',
    },
    {
      id: Math.random() * 100,
      label: 'Can I use Javascript?',
      content: 'You can use Javascript.',
    },
    {
      id: Math.random() * 100,
      label: 'Can I use CSS?',
      content: 'You can use CSS.',
    },
  ];

  return (
    <div>
      <Accordion items={items} />
    </div>
  );
}
