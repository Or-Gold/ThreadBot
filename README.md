# A Thread creation bot for managing bug-repots
To get it working, create a json file called 'config.json' at the `src` directory and add the following::
```json
{
    "token": "<YOUR_BOT_TOKEN>",
    "bug_channel": "<BUG_REPOTS_CHANNEL_NAME>",
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
