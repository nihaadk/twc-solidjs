import { For } from "solid-js";

const randomize = () => Math.floor(Math.random() * 500);

const trends = [
  {
    category: "Sports",
    content: "Some team won something!",
    twcCount: randomize(),
  },
  {
    category: "Finance",
    content: "Bitcoin down again!",
    twcCount: randomize(),
  },
  {
    category: "PC & Games",
    content: "New Eincode game out!",
    twcCount: randomize(),
  },
  {
    category: "Economoy",
    content: "It;s goin well ...!",
    twcCount: randomize(),
  },
];

const TrendsSidebar = () => {
  return (
    <div class="bg-gray-800 overflow-hidden flex-it rounded-2xl">
      <div class="flex-it p-4">
        <span class="text-xl font-bold">Trends</span>
      </div>
      <For each={trends}>
        {(trend) => (
          <div class="trend-item">
            <div class="flex-it">
              <span class="text-gray-400 text-sm">{trend.content}</span>
              <span class="text-lg font-bold">{trend.category}</span>
              <span class="text-gray-400 text-sm">{trend.twcCount} twc's</span>
            </div>
          </div>
        )}
      </For>
    </div>
  );
};

export default TrendsSidebar;
