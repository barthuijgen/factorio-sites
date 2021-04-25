import Router from "next/router";

export function addPreserveScrollListeners() {
  if (typeof window === "undefined") return;

  const _window = (window as unknown) as { _pop_state_pos: { x: number; y: number } | null };
  const debug = process.env.NODE_ENV === "development";

  Router.events.on("routeChangeStart", () => {
    // Store scroll location in history on route changes
    const pos = { x: window.pageXOffset, y: window.pageYOffset };
    if (debug) console.log("store pos", pos, "in", window.history.state);
    window.history.replaceState({ ...window.history.state, _pos: pos }, "");
  });

  Router.events.on("routeChangeComplete", () => {
    // If a pop state (back navigation) happened, restore scroll position
    if (_window._pop_state_pos) {
      const pos = _window._pop_state_pos;
      setTimeout(() => {
        if (debug) console.log("popstate restore scrollTo", pos.x, pos.y);
        window.scrollTo(pos.x, pos.y);
      }, 50);
      _window._pop_state_pos = null;
    }
  });

  window.addEventListener("popstate", (event) => {
    if (debug) console.log("popstate", event.state);
    _window._pop_state_pos = event.state._pos || null;
  });
}
