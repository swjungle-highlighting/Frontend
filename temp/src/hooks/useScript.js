// useScript 공유하기 버튼을 만들 떄 가져온 스크립트
/* https://usehooks.com/useScript/ 이 후크를 사용하면 외부 스크립트를 동적으로 로드하고 로드된 시간을 알 수 있습니다. 
이는 타사 라이브러리(Stripe, Google Analytics 등)와 상호 작용해야 하고 모든 페이지 요청에 대해 문서 헤드에 포함하기보다 
필요할 때 스크립트를 로드하려는 경우에 유용합니다. */

import { useState, useEffect } from "react";

function useScript(src) {
	// Keep track of script status ("idle", "loading", "ready", "error")
	const [status, setStatus] = useState(src ? "loading" : "idle");

	useEffect(
		() => {
			// Allow falsy src value if waiting on other data needed for
			// constructing the script URL passed to this hook.
			if (!src) {
				setStatus("idle");
				return;
			}

			// Fetch existing script element by src
			// It may have been added by another intance of this hook
			let script = document.querySelector(`script[src="${src}"]`);

			if (!script) {
				// Create script
				script = document.createElement("script");
				script.src = src;
				script.async = true;
				script.setAttribute("data-status", "loading");
				// Add script to document body
				document.body.appendChild(script);

				// Store status in attribute on script
				// This can be read by other instances of this hook
				const setAttributeFromEvent = (event) => {
					script.setAttribute(
						"data-status",
						event.type === "load" ? "ready" : "error"
					);
				};

				script.addEventListener("load", setAttributeFromEvent);
				script.addEventListener("error", setAttributeFromEvent);
			} else {
				// Grab existing script status from attribute and set to state.
				setStatus(script.getAttribute("data-status"));
			}

			// Script event handler to update status in state
			// Note: Even if the script already exists we still need to add
			// event handlers to update the state for *this* hook instance.
			const setStateFromEvent = (event) => {
				setStatus(event.type === "load" ? "ready" : "error");
			};

			// Add event listeners
			script.addEventListener("load", setStateFromEvent);
			script.addEventListener("error", setStateFromEvent);

			// Remove event listeners on cleanup
			return () => {
				if (script) {
					script.removeEventListener("load", setStateFromEvent);
					script.removeEventListener("error", setStateFromEvent);
				}
			};
		},
		[src] // Only re-run effect if script src changes
	);

	return status;
}

export { useScript };
