
// Can be used to queue updates to a single destination with a specified delay by only calling the latest change after
// the delay has elapsed
export class SimpleDelayer {

    delayMs: number;
    timerStarted: boolean; // Has the timer started?
    restartTimer: boolean; // Restart timer needed?
    CurrentFunction: () => void;

    constructor(delayMs: number) {
        this.delayMs=delayMs;
        this.timerStarted=false;
        this.restartTimer=false;
        this.ConditionalTriggerCall=this.ConditionalTriggerCall.bind(this);
        this.DelayedCall=this.DelayedCall.bind(this);
        this.ImmediateCall=this.ImmediateCall.bind(this);
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
            }
		}
	};

    DelayedCall(f: () => void) {
        this.CurrentFunction=f;

        if (this.timerStarted) {
            // Function has been updated so start the timer again
			this.restartTimer = true;
		} else {
			this.timerStarted = true;
			setTimeout(() => this.ConditionalTriggerCall(), this.delayMs);
		}
    }

    ImmediateCall() {

        // It could be null if there's been no change called.
        if(this.CurrentFunction) {
            this.timerStarted = false;
            this.restartTimer=false;
            this.CurrentFunction();

            // ***(1) If there is currently a call pending, this will prevent it from calling the update function twice
            this.CurrentFunction=null;
        }
    }
};