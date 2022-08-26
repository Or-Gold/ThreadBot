# A Thread creation bot for managing bug-repots

To get it working, create a json file called 'config.json' at the `src` directory and add the following::

```json
{
	"token": "<YOUR_BOT_TOKEN>",
	"bugChannelId": "<BUG_REPOTS_CHANNEL_ID>",
	"clientId": "<BOT_CLIENT_ID>",
	"gitInfo": {
		"personalToken": "<PERSONAL_AUTHORIZATION_TOKEN>",
		"owner": "<REPO_OWNER>",
		"repo": "<REPO_NAME>"
	}
}
```

Then make sure you've got npm installed, and run the following commands:

```bash
npm install
npm run deploy
npm start
```

`npm run deploy` will deploy the application commands to the client specified by `token`.
You don't need to run this command on every launch, only when changing the command files.

## Message content intents

Discord changed the **Message Content Intent** to be privilaged, which means that it must be enabled via the Discord Developer Portal in your specific application.

In order to enable it, go to **Discord Developer Portal -> Application -> Bot**, Scroll down to "Privilaged Gateway Intents" and enable **Message content intent**.
If you don't do this your bot won't have access to the content of the messages sent in your guild, and it'll be utterly useless.

## Commands

The bot will automatically listen to messages and open threads for each message sent in `bugChannel`. The following commands are provided to help manage opened issue threads:

- `/issue <command>` - commands for managing issue threads
  - `close` - Close an issue.
  - `reopen` - Reopen a closed issue.
  - `rename <name>` - Rename an open issue. A name must be provided, and must be less than 100 characters long.
  - `github <title> <body>` - Port an issue to a github issue (Not implemented).
  - `repeated <original>` - Close an issue and mark it as repeated. The original issue must be provided.
- `/issues` - Lists all open issues (active threads).
