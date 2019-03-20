# Deployment

## Automated (via Jenkins)

You can deploy `design-system` to Akamai Netstorage via an automated Jenkins pipeline.  You can find that job [here](https://cloudbeesjenkins.cms.gov/prod-master/job/wds/job/Design%20System/job/Deploy%20design-system/).  It is a multi-stage pipeline that executes the deploy in two stages:

1. The first child job builds `design-system`, creates a tarball from the resulting artifacts, then uploads the tarball to S3.
2. The second child job downloads the tarball from S3, expands it onto the node Jenkins is using for the deploy, then copies the files to Netstorage via `scp`.

The only parameter needed to initiate a deployment is the Git branch you'd like to deploy.  The default is set to `master` so if that is what you are deploying then you are just one click away.

NOTE: Your CBJ user will need to be a member of the `wd-user` group or you will be unable to see the linked job above.