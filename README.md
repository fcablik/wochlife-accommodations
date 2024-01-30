# Wochlife Hospitality/Accommodations System
### current version: 8.3.1
- !Disclaimer: This is still not a finished product as of 01/30/2024.
- Testing server: https://wochlife-booking-system-v8.fly.dev/

### About 
  Wochlife is a lightweight & solid Full-Stack Development Environment (built on-top-of the Epic-Stack) used to create high performance Web Applications. That's why I've also started using it and building on top of it to develop this accommodation system.

### Base Version's Stack & Decisions
  To get a break from 'analysis paralysis' right from the start, I had decided to start with the already throughout tested starting stack - The Epic Stack, developed by Kent C Dodds. The Epic Stack is an opinionated project starter, open-source - under the MIT license. It was used as a starter stack to get solid selection of technologies and tools, and to also ship faster. Even further on into advanced development phases, The Epic Stack is a great project reference to look up to. -Me, Filip Cablik

<br/>

### Tests
- user tests currently set-up for 'admin' permissions only as the base app doesn't allow user sign-up (onboarding) and user/users profile sections are existing user's permission access only


<br/><br/><br/>
### Deployed App

<!-- ! REMOVE: "// Temporary DEVelopment Phase" permission request if not in dev phase -->
# Deployment

When you first create an Epic Stack repo, it should take you through a series of
questions to get your app setup and deployed. However, we'll document the steps
here in case things don't go well for you or you decide to do it manually later.
Here they are!

## Deploying to Fly.io

Prior to your first deployment, you'll need to do a few things:

1. [Install Fly](https://fly.io/docs/getting-started/installing-flyctl/).

   > **Note**: Try `flyctl` instead of `fly` if the commands below won't work.

2. Sign up and log in to Fly:

   ```sh
   fly auth signup
   ```

   > **Note**: If you have more than one Fly account, ensure that you are signed
   > into the same account in the Fly CLI as you are in the browser. In your
   > terminal, run `fly auth whoami` and ensure the email matches the Fly
   > account signed into the browser.

3. Create two apps on Fly, one for staging and one for production:

   ```sh
   fly apps create [YOUR_APP_NAME]
   fly apps create [YOUR_APP_NAME]-staging
   ```

   > **Note**: Make sure this name matches the `app` set in your `fly.toml`
   > file. Otherwise, you will not be able to deploy.

4. Initialize Git.

   ```sh
   git init
   ```

- Create a new [GitHub Repository](https://repo.new), and then add it as the
  remote for your project. **Do not push your app yet!**

  ```sh
  git remote add origin <ORIGIN_URL>
  ```

5. Add secrets:

- Add a `FLY_API_TOKEN` to your GitHub repo. To do this, go to your user
  settings on Fly and create a new
  [token](https://web.fly.io/user/personal_access_tokens/new), then add it to
  [your repo secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
  with the name `FLY_API_TOKEN`.

- Add a `SESSION_SECRET`, `INTERNAL_COMMAND_TOKEN`, and `HONEYPOT_SECRET` to
  your fly app secrets, to do this you can run the following commands:

  ```sh
  fly secrets set SESSION_SECRET=$(openssl rand -hex 32) INTERNAL_COMMAND_TOKEN=$(openssl rand -hex 32) HONEYPOT_SECRET=$(openssl rand -hex 32) --app [YOUR_APP_NAME]
  fly secrets set SESSION_SECRET=$(openssl rand -hex 32) INTERNAL_COMMAND_TOKEN=$(openssl rand -hex 32) HONEYPOT_SECRET=$(openssl rand -hex 32) --app [YOUR_APP_NAME]-staging
  ```

  > **Note**: If you don't have openssl installed, you can also use
  > [1Password](https://1password.com/password-generator) to generate a random
  > secret, just replace `$(openssl rand -hex 32)` with the generated secret.

6. Create production database:

   Create a persistent volume for the sqlite database for both your staging and
   production environments. Run the following (feel free to change the GB size
   based on your needs and the region of your choice
   (`https://fly.io/docs/reference/regions/`). If you do change the region, make
   sure you change the `primary_region` in fly.toml as well):

   ```sh
   fly volumes create data --region ams --size 1 --app [YOUR_APP_NAME]
   fly volumes create data --region ams --size 1 --app [YOUR_APP_NAME]-staging
   ```

7. Attach Consul:

- Consul is a fly-managed service that manages your primary instance for data
  replication
  ([learn more about configuring consul](https://fly.io/docs/litefs/getting-started/#lease-configuration)).

  ```sh
  fly consul attach --app [YOUR_APP_NAME]
  fly consul attach --app [YOUR_APP_NAME]-staging
  ```

8. Commit!

   The Epic Stack comes with a GitHub Action that handles automatically
   deploying your app to production and staging environments.

   Now that everything is set up you can commit and push your changes to your
   repo. Every commit to your `main` branch will trigger a deployment to your
   production environment, and every commit to your `dev` branch will trigger a
   deployment to your staging environment.

---

### Optional: Email service setup

Find instructions for this optional step in [the email docs](./email.md).

### Optional: Error monitoring setup

Find instructions for this optional step in
[the error tracking docs](./monitoring.md).

### Optional: Connecting to your production database

Find instructions for this optional step in [the database docs](./database.md).

### Optional: Seeding Production

Find instructions for this optional step in [the database docs](./database.md).

## Deploying locally

If you'd like to deploy locally you definitely can. You need to (temporarily)
move the `Dockerfile` and the `.dockerignore` to the root of the project first.
Then you can run the deploy command:

```
mv ./other/Dockerfile Dockerfile
mv ./other/.dockerignore .dockerignore
fly deploy
```

Once it's done, move the files back:

```
mv Dockerfile ./other/Dockerfile
mv .dockerignore ./other/.dockerignore
```

You can keep the `Dockerfile` and `.dockerignore` in the root if you prefer,
just make sure to remove the move step from the `.github/workflows/deploy.yml`.

<br/>


#### fonts
  - main-use/using: Nunito Sans, Nunito Sans Fallback (Google Font)
  - consider: SF Pro (Apple Font), Adobe Clean (Adobe Font)

  - nunito - more circular like, but sf pro is more readable in small sizes

#### components
  - radix ui
  - sonner (https://sonner.emilkowal.ski/) (toast)

<br/>

### Tips In Development
  - work with db (updating) --> schema.prisma: adding new models (table) -> we need to issue a migration (npx prisma migrate dev (lose data-continue-   yes)+enter migration name)   ((WARNING) : old session is holding the old seed, so we need to clear the cookies/sessions in the browser (untill  fixed in epicstack itself))
  - migrating local db data to production app - "/prisma/seedin-data-to-production.pdf"
  - ! creating modules logic: Create whole modules with whole sections & each section's component/text will be displayed conditionally - inputed/ filled in ->display, otherwise don't

  - seeding production database - https://github.com/epicweb-dev/epic-stack/blob/main/docs/deployment.md#seeding-production

<br/>

### The Epic Stack
"This is an opinionated project starter and reference that allows teams to ship their ideas to production faster and on a more stable foundation based on the experience of Kent C. Dodds and contributors." -- Kent C. Dodds

- Download/Pull

  https://github.com/epicweb-dev/epic-stack

- Installing the latest epic-stack version:

  ```sh
  npx create-remix@latest --typescript --install --template epicweb-dev/epic-stack
  ```

- Later Deployment

  https://github.com/epicweb-dev/epic-stack/blob/main/docs/deployment.md
  https://www.youtube.com/watch?v=dWiSi4Ie53E

  - - fly.io: 
  https://community.fly.io/t/configuring-domain-names/12964
  https://fly.io/docs/app-guides/custom-domains-with-fly/
  
- License: MIT

<br/>

### Useful Project's Commands

#### mac rubbish files in project removal !
- "find ./ -name ".DS_Store" -print -delete"
  list of problems caused by these files
  - "Error: Cannot add empty string to PrefixLookupTrie"

#### project setup / start
- "npm run setup"
- "npm run dev"

#### prisma migrating db to new schema
- "npx prisma migrate dev"

#### prisma db live preview
- "npx prisma studio" (localhost:5555)

#### connecting to deployed fly's app's db
1. "fly proxy 5556:5555 --app [APP_NAME]"
2. "fly ssh console -C "npx prisma studio" --app [APP_NAME]"
  ("fly ssh console -C "npm run prisma:studio" --app [APP_NAME]")

#### deployment errors!
- prisma Error: P3009 (migrate found failed migrations in the target database, new migrations will not be applied. Read more about how to resolve migration issues in a production database: https://pris.ly/d/migrate-resolve)
    - this error appears most commonly when pushing new columns to a table that already has data in it
    - to prevent => add default values / or have 0 data in the changed tables (models)

<br/>

#### App's Admin Docs

#### fly.io
1. register to fly.io
2. input credit-card (for verification, this app's stack fits within the free tier) (fly.io is demanding only payments over $5/month, which will be very hard to get over with only 1VM image & server running)
3. authorize project's signup
3. setup project for deployment

#### resend.com
1. register web/app owner to: https://resend.com
2. validate mail/domain DNS of the contact form emails receiver: https://resend.com/domains (needs to be configured in domain's DNS settings)
3. optional: invite members to the resend.com app: https://resend.com/settings/team 
4. enjoy your 3,000/month free emails (100 emails / day)
  - upgrade option: 5,000 - 50,000 emails/month: $20/month

<br/>

## radix/ui components
  - "@radix-ui/react-checkbox": "^1.0.4",
  - "@radix-ui/react-dropdown-menu": "^2.0.5",
  - "@radix-ui/react-label": "^2.0.2",
  - "@radix-ui/react-slot": "^1.0.2",
  - "@radix-ui/react-toast": "^1.1.4",
  - "@radix-ui/react-tooltip": "^1.0.6",

## git syntaxes
  - "git log -2" <!-- shows not yet pushed commits and their info -->



## seeding production DB (from Kent)
--------------------------------- Manual Seeding --------------------------
-- Hey there, Kent here! This is how you can reliably seed your database with
-- some data. You edit the migration.sql file and that will handle it for you.
-- I determined this by running a minimal seed via
-- `MINIMAL_SEED=true npx prisma db seed` and then creating a sql dump via
-- `sqlite3 prisma/data.db .dump > seed.sql`. Then I grabbed the relevant bits
-- for the initial seed and put them here.

## custom notes for better development
  1. expressions
    - "&&" vs "? : null" -> && is not the best practice to use for other than boolean values, we can also convert e.g. "contacts.length" into "!!values.length", which negates twice and gets boolean value to evaluate the same as "values.length > 0 ?" would, but be careful, it's better not to use it with absolute non-boolean values and rather use "values.length ? "xyz" : null"

  2. prefetching routes on Links
```
    <>
      <Link /> {/* defaults to "none" */}
      <Link prefetch="none" />
      <Link prefetch="intent" />
      <Link prefetch="render" />
      <Link prefetch="viewport" />
    </>
```

  3. preventScrollReset
    - If you are using ```<ScrollRestoration>```, this lets you prevent the scroll position from being reset to the top of the window when the link is clicked.
    ```<Link to="?tab=one" preventScrollReset />```

  4. reloadDocument
    - Will use document navigation instead of client side routing when the link is clicked, the browser will handle the transition normally (as if it were an ```<a href>```).
    ```<Link to="/logout" reloadDocument />```
