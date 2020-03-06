
// Can be used to queue updates to a single destination with a specified delay by only calling the latest change after
// the delay has elapsed
export class SimpleDelayer {

    delayMs: number;
    timerStarted: boolean; // Has the timer started?
    restartTimer: boolean; // Restart timer needed?
    CurrentFunction: () => void;

    // These can be used to trigger state changes for things like disabling OK buttons when there is a call pending
    onCallPending: () => void; // Called when the state goes from not pending to pending (optional)
    onCallNoLongerPending: () => void; // Called when the state goes from pending to not pending (optional)

    constructor(
        delayMs: number,
        onCallPending?: () => void,
        onCallNoLongerPending?: () => void
    ) {
        this.delayMs=delayMs;
        this.timerStarted=false;
        this.restartTimer=false;
        this.ConditionalTriggerCall=this.ConditionalTriggerCall.bind(this);
        this.DelayedCall=this.DelayedCall.bind(this);
        this.ImmediateCall=this.ImmediateCall.bind(this);
        this.HasCallPending=this.HasCallPending.bind(this);
        this.onCallPending=onCallPending;
        this.onCallNoLongerPending=onCallNoLongerPending;
    }

    private ConditionalTriggerCall() {

		if (this.restartTimer) {
			// Restart the timer
			this.restartTimer = false;
			setTimeout(() => this.ConditionalTriggerCall(), this.delayMs);
		}
		else {
			// Done - call the function now the time has elapsed without any futher changes
            this.timerStarted = false;
            
            // ***(2) If the function member has been cleared it means it has already been called
            if(this.CurrentFunction) {
                this.CurrentFunction();
                this.CurrentFunction=null;

                if(this.onCallNoLongerPending) this.onCallNoLongerPending();
            }
		}
	};

    // Call the method with the specified delay. This overwrites a call which is already pending
    DelayedCall(f: () => void) {
        this.CurrentFunction=f;

        if (this.timerStarted) {
            // Function has been updated so start the timer again
            this.restartTimer = true;
            
		} else {
            if(this.onCallPending) this.onCallPending();
			this.timerStarted = true;
			setTimeout(() => this.ConditionalTriggerCall(), this.delayMs);
		}
    }

    // Call the pending function immediately (if there is one)
    ImmediateCall() {

        // It could be null if there's been no change called.
        if(this.CurrentFunction) {
            this.timerStarted = false;
            this.restartTimer=false;
            this.CurrentFunction();

            // ***(1) If there is currently a call pending, this will prevent it from calling the update function twice
            this.CurrentFunction=null;

            if(this.onCallNoLongerPending) this.onCallNoLongerPending();
        }
    }

    // Is there a function call pending?
    HasCallPending() {
        const rv=(this.CurrentFunction != null);
        return rv;
    }
};