
// Use javascript to query for information regarding the media in use
// Useful for making responsive UI's which that redraw based on the dimensions

// 'queryArray' are strings in the form '(max-width: 768px)'

// The return value is a an object containing functions:
// 
// 'Matches(mediaIndex)'
//		'mediaIndex' is an index into 'matchResultArray'
//		It's a good idea to hold the index values as an enum, so you can call for example:
//		enum DESKTOP = 1;
//		Matches(DESKTOP)
//
// 'FirstMatching()'
//		Return the index of the first matching item
export type MatchMediaResult = {
	Matches: (mediaIndex: number) => boolean;
	FirstMatching: () => number;
};

type FirstMatching = {
    _: number;
};

// 'delayMs' means how long to wait before triggering a status change. you might want to use this to prevent multiple
// media changes in quick succession
export const MatchMedia = (
	window: any,
	queryArray: string[],
	OnMediaChange: () => void,
    delayMs: number
): MatchMediaResult => {

	// This is the array that holds the media matches
	let matchResultArray = new Array(queryArray.length);

	// A variable reference to hold the first index which matches the query list
	// In javascript you can't set non-object variables by reference, hence the object
	let firstMatching: FirstMatching = {
		_: null
	};

	// A function to update the first matching index
	const UpdateFirstMatching = () => {
		firstMatching._ = -1;
		for (let i = 0; i < matchResultArray.length; ++i) {
			if (matchResultArray[i].matches) {
				//console.log(`First matching index is ${i}.`);
				firstMatching._  = i;
				break;
			}
		}
	};

	// Delaying media change helper
	let delayMediaChange = {
		timerStarted: false,
		restartTimer: false
	};

	// Called to either trigger the change, or delay once again
	const ConditionalTriggerUpdate = () => {

		if (delayMediaChange.restartTimer) {
			// Restart the timer
			delayMediaChange.restartTimer = false;
			setTimeout(ConditionalTriggerUpdate, delayMs);
		}
		else {
			// Done - trigger the change
			delayMediaChange.timerStarted = false;
			// Invalid the first matching item
			firstMatching._ = null;
			OnMediaChange();
		}
	};

	// A function which is called when the media changes
	const InternalOnMediaChange = () => {

		// If the timer is already started, re-run once again
		if (delayMediaChange.timerStarted) {
			delayMediaChange.restartTimer = true;
		} else {
			delayMediaChange.timerStarted = true;
			setTimeout(ConditionalTriggerUpdate,delayMs);
		}
	};

	// Initialise the media matches
	for (let i = 0; i < queryArray.length; ++i) {
		matchResultArray[i] = window.matchMedia(queryArray[i]);

		// Listen for changes
		matchResultArray[i].addListener(() => {
			InternalOnMediaChange();
		});
	}

	const Matches = (mediaIndex: number) => {
		return matchResultArray[mediaIndex].matches;
	};

	const FirstMatching = () => {
		if (firstMatching._ === null) {
			UpdateFirstMatching();
		}
		return firstMatching._;
	};

	return {
		Matches: Matches,
		FirstMatching: FirstMatching,
	};
};

export const MatchFixedMedia = (mediaIndex: number): MatchMediaResult => {
	return {
		Matches: (iterIndex) => mediaIndex === iterIndex,
		FirstMatching: () => mediaIndex,
	};
};