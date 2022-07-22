# A Thread creation bot for managing bug-repots
To get it working, create a json file called 'config.json' at the `src` directory and add the following::
```json
{
    "token": "<YOUR_BOT_TOKEN>",
    "bugChannel": "<BUG_REPOTS_CHANNEL_NAME>",
    "clientId": "<BOT_CLIENT_ID>"
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

# Commands
The bot will automatically listen to messages and open threads for each message sent in `bugChannel`. The following commands are provided to help manage opened issue threads:
- `/issue <command>` - commands for managing issue threads
	* `close` - Close an issue.
	* `reopen` - Reopen a closed issue.
	* `rename <name>` - Rename an open issue.
	* `github` - Port this issue to a github issue (Not implemented).
	* `repeated <original>` - Close an issue and mark it as repeated. The original issue must be provided. 

- `/issues` - Lists all open issues (active threads).
