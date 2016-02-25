# WatchItRun

Everyone's seen slides of call stacks, variable storage, and such in introductory programming lectures, but I've never seen a good version operating on live code. That's the plan for WatchItRun.

I'm not trying to stick to strict semantics or match exactly how Javascript actually executes, that's what debuggers are for. The intended audience for this is teachers demonstrating program execution or students having trouble visualizing and tracking what is going on as a program runs, without the added complexity of real debuggers (that also don't tend to be as visual).

The HTML here is pilfered from a hard-coded demo I wrote to use as part of a lecture on functions and is going to be pretty heavily modified, I expect to have a demo interface ready soon, which will be hosted on the `gh-pages` branch and [visible here if I forget to update the README](https://jyoko.github.com/watchitrun).

Quick tech notes:

* Using Esprima, so theoretically will work on any ESTree-compatible AST (execution aside)
* Trying to avoid hooking into a full interpreter with some creative EVALing
* Display being done with jQuery ATM, might slap them in React components because that's hip, right?
