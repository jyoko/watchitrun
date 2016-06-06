# WatchItRun

**NOTE:** Major overhaul in-progress, interface on gh-pages is leftover animation prototypes and most of the code here is getting replaced.

Everyone's seen slides of call stacks, variable storage, and such in introductory programming lectures, but I've never seen a good version operating on live code. That's the plan for WatchItRun.

I'm not trying to stick to strict semantics or match exactly how Javascript actually executes, that's what debuggers are for. The intended audience for this is teachers demonstrating program execution or students having trouble visualizing and tracking what is going on as a program runs, without the added complexity of real debuggers (that also don't tend to be as visual).

The HTML here is pilfered from a hard-coded demo I wrote to use as part of a lecture on functions and is going to be pretty heavily modified, I expect to have a demo interface ready soon, which will be hosted on the `gh-pages` branch and [visible here if I forget to update the README](https://jyoko.github.com/watchitrun).

## Tech Notes

* Related to ongoing rewrite:
* Input code is being transformed into state machines (currently w/ recast, looking to strip it down)
* Not continuation-based, only functions
* Execution VM will emit events to allow flexible UI
