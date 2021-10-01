# RFC's

This folder contains RFC (Request for Comment) documents. A template can be found at `./_template.md`.

RFCs are useful when team feedback is required before making architecture or design decisions, or any topic that warrants discussion facilitated with documentation.

## Creating a new RFC

- Create a new branch for your RFC PR
- Copy the `_template.md` file to a new file that is prefixed with YYYY-MM & appropriately titled
- Fill out the template accordingly
- Submit the PR with the `[RFC]` PR title prefix and tag
- Commence discussion, adjusting the RFC based on feedback
- Once all questions defined in the RFC are satisfied, and PR is accepted, merge it

### RFC Status Options

- WIP: The author is still drafting the RFC and it’s not ready for review.
- Review: The Review label is used when the RFC is ready for comments and feedback.
- Approved: When the RFC is for the purpose of making a decision, the Approved label indicates that the decision has been made.
- Implemented: When the RFC is for the purpose of making a decision, the Implemented label indicates that the RFC’s proposal has been implemented.

## Cleaning up old RFCs

Keeping RFC documents around for historical purposes is generally a good idea, but it's inevitable that the documents in this folder will get stale over time.

Consider whether the content in the document should be migrated to a more permanent documentation location, or if it can safely be deleted (we have git history, after all).
