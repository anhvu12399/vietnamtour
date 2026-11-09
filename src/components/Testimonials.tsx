export default function Testimonials() {
  const ideas = [
    'Plan time on the water in Ha Long Bay, with the cruise route and cabin confirmed in your proposal.',
    'Explore the highland scenery around Sa Pa at a walking pace suited to your fitness.',
    'Build a stay in Hoi An around its old town, food, crafts and nearby coast.',
    'Combine Hanoi neighbourhood walks with the museums and historical sites that interest you.',
    'Discuss a Mekong Delta visit with enough time for transfers and the activities you choose.',
  ];

  return (
    <section className="bg-white py-16 px-4 border-t border-[#e1e3e4]">
      <div className="container mx-auto max-w-4xl text-center flex flex-col items-center gap-8">
        <h2 className="font-serif text-3xl md:text-4xl text-ink font-light tracking-wide">
          Ideas for your journey
        </h2>

        <p className="max-w-2xl text-sm leading-relaxed text-ink/65">
          These are planning prompts, not traveller reviews or confirmed tour inclusions. Availability and details depend on your dates and the written proposal.
        </p>
        <div className="grid w-full max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ideas.map((idea) => (
            <p key={idea} className="border border-line bg-paper p-5 text-left font-serif text-base leading-relaxed text-ink">
              {idea}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
