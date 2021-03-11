type Tag = { value: string; label: string; category: string };

export const TAGS: Tag[] = [
  { value: "belt/balancer", label: "Balancer", category: "Belt" },
  { value: "belt/prioritizer", label: "Prioritizer", category: "Belt" },
  { value: "belt/tap", label: "Tap", category: "Belt" },

  { value: "circuit/indicator", label: "circuit indicator", category: "Circuit" },
  { value: "circuit/counter", label: "circuit counter", category: "Circuit" },

  { value: "state/early_game", label: "Early game", category: "State" },
  { value: "state/mid_game", label: "Mid game", category: "State" },
  { value: "state/late_game", label: "Late game", category: "State" },
  // { value: "meta/beaconized", label: "Beaconized", category: "Meta" },
  { value: "meta/compact", label: "Compact", category: "Meta" },
  { value: "meta/marathon", label: "Marathon", category: "Meta" },
  { value: "meta/inputs_are_marked", label: "Inputs are marked", category: "Meta" },

  { value: "mods/modded", label: "Modded", category: "Mods" },

  // { value: "power/nuclear", label: "power nuclear", category: "power" },
  // { value: "power/solar", label: "power solar", category: "power" },
  // { value: "power/steam", label: "power steam", category: "power" },
  // { value: "power/accumulator", label: "power accumulator", category: "power" },

  // { value: "oil processing", label: "oil processing", category: "" },
  // { value: "coal liquification", label: "coal liquification", category: "" },

  { value: "train/loading_station", label: "Loading station", category: "Train" },
  { value: "train/unloading_station", label: "Unloading station", category: "Train" },
  { value: "train/pax", label: "Pax", category: "Train" },
  { value: "train/intersection", label: "Intersection", category: "Train" },
  { value: "train/stacker", label: "Stacker", category: "Train" },
  { value: "train/track", label: "Track", category: "Train" },
  { value: "train/LHD", label: "Left hand drive", category: "Train" },
  { value: "train/RHD", label: "Right hand drive", category: "Train" },
];

export const TAGS_BY_KEY = TAGS.reduce((tags, tag) => {
  tags[tag.value] = tag;
  return tags;
}, {} as Record<string, Tag>);
