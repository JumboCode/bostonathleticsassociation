# JumboCode Boston Athletics Association Fall 2016


1. About
========
We are the JumboCode team working on a check in system for the Boston Athletics Association (BAA) for Fall 2016 at Tufts University.

2. Members
========
* Jenna Kubiak
* Dani Kupfer
* Ian Luo
* Ryan Osgood
* Spencer Perry
* Julia Grace
* Michael Morisi
* Andrew Hoiberg

3. Branching (IMPORTANT!)
========
For this project, we will maintain two branches, `master` and `dev`. The master branch will contain working production-ready code at all times. Do not commit directly to master! (unless it's small). Instead commit to `dev` and when it's ready to go, merge it into master. Please fork other development branches as needed (fork it from dev)

* To checkout dev: `git fetch && git checkout dev`
* To commit: `git add --all && git commit -m "Meaningful message here" && git push origin dev`
* Merge to master: `git checkout master && git merge dev && git push origin master`
* When you only wanna merge certain commits: `git checkout master && git cherry-pick COMMIT-HASH && git push origin master`



