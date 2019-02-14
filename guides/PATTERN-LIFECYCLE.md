# Pattern lifecycle

## Becoming a design system pattern

When considering what to do with a proposed pattern, there are several questions the team should answer first. The decision tree below outlines those questions to be answered and the various outcomes:

![Pattern proposal decision tree](https://github.com/CMSgov/design-system/blob/master/.github/images/pattern-decision-tree.png?raw=true)

## Proposing new patterns

When a new pattern is created, it’s worth asking if it's a one-off use case or something that can be used on other sites. New patterns come at a cost in terms of additional code, maintenance, documentation, and increased cognitive load on users. Care should therefore be taken when adding patterns to the design system.

Our pattern proposal process is largely based on those by the [US Web Design Standards](https://github.com/18F/web-design-standards/wiki/Contribution-Guidelines%3A-Design). Our process follows the stages below:

### Proposal

Open a new [GitHub issue](https://github.com/cmsgov/design-system/issues) for the pattern being proposed. The issue should cover the following points:

- Identify the user need the pattern solves
- Explain why the submitted pattern is the best choice (including its advantages over alternative patterns).
- Include original design files; if an original file can't be provided, include a rendering of the design: a wireframe, mockup, or prototype.
- Describe any primary or secondary research that supports this pattern. This description should include the research methods used, description of participants, and links to supporting documentation, including interview protocols, prototype(s) used, and so on.

### Review

After a pattern is proposed, it undergoes a [heuristic evaluation](https://en.wikipedia.org/wiki/Heuristic_evaluation) by a team member. This review is to determine whether the contribution needs small fixes, visual improvements, or whether to reject it.

During this stage, the team will also look for secondary research — other research supporting or refuting the pattern — and link this research to the proposal.

Depending on the outcome of the evaluation, revisions may be requested before moving the pattern to alpha. If the pattern is good to go as is, it's moved to alpha. If the pattern doesn’t pass the assessment, the reviewer will reject it and close the issue.

The criteria used in heuristic reviews is as follows:

- Usability (Is the pattern responsive? Is the interaction flow clearly documented?)
- Accessibility (Is the pattern accessible to all intended audiences?)
- Visual design (Is the contribution consistent with our visual style?)

### Validation

After a pattern has passed review, a member of the team will create a prototype of the pattern (unless one was already submitted). Next, they’ll write the first draft of documentation, after which they’ll insert the pattern code into other configurations with the design system to test its adaptability. Finally, a team member will either move the pattern as-is to beta; ask for revisions; or, in some cases, reject the pattern and close the issue.

### Beta testing

Once a pattern has passed validation, it's made available in beta as part of the design system. The team will be collecting feedback on the pattern based on usage in real-world products with hard-to-serve populations.

During this phase, the team will have completed writing the documentation for the pattern. After gathering feedback from external teams, we’ll ask for revisions (or make any revisions ourselves) and move the pattern to "recommended"; or we’ll reject the pattern and close the issue.

When a pattern is moved to recommended, it becomes a stable part of the design system and the core team will conduct ongoing maintenance of the pattern (bug fixes, minor enhancements, and so on).

## Amending existing patterns

Elements of the design system can and should be amended for a number of reasons: bug fixes, new features, visual design tweaks, performance and accessibility improvements, best practice updates, etc.

Amendment proposals should follow the same Proposal/Review/Validation process as outlined above. During the Review step, in addition to the standard review criteria, the team will also consider whether the amendment introduces the [wrong abstraction](https://www.sandimetz.com/blog/2016/1/20/the-wrong-abstraction?duplication) or results in an over abundance of variations — keeping in mind that more options and variations results in increased maintenance and cognitive load on users.

## Retiring old patterns

As technology changes, certain UI patterns will become less relevant or may be replaced by better patterns. As we become aware of such changes, we’ll remove patterns from the library.  To avoid pulling the rug out from under people relying on those patterns in their projects, deprecated patterns will remain within the codebase for at least a month after deprecation. The patterns will also be marked as deprecated in the documentation and in the developer's console when used in a project.

----

#### Credits

- [US Web Design Standards](https://github.com/18F/web-design-standards/wiki/Contribution-Guidelines%3A-Design)
- [Atomic Design](http://atomicdesign.bradfrost.com/chapter-5/)
- [Inayaili de León Persson](https://design.canonical.com/2016/07/getting-vanilla-ready-for-v1-the-roadmap/)
