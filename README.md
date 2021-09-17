# dbwebb-bot

Discord bot for BTH Webbprogrammering

## Instructions

Create a `.env` file in the root of the project directory and specify the following values:

```txt
BOT_PREFIX="<YOUR_PREFIX>"
BOT_TOKEN="<YOUR_DISCORD_BOT_TOKEN>"
```

Build and run the application:

```bash
npm install
npm run dev
```

## Step by Step Guide

### Create a Discord Bot

1. Open [Discord Developer Portal](https://discord.com/developers) and sign in if needed.

2. Click the **Applications** sidebar menu-item and then click on the **New Application** button.

3. Give your application a name and then click the **Create** button.

4. Click the **Bot** sidebar menu-item and then click the **Add Bot** button.

### Set the Bot Token

1. Click the **Copy** button in the **TOKEN** section to copy your Bot's token to your clipboard. \
***NOTE!*** *Keep your token safe, don't share it!*

2. Replace `<YOUR_DISCORD_BOT_TOKEN>` in the `.env` file with the token that you just copied.

### Invite the Bot

1. Click the **OAuth2** sidebar menu-item.
    * Leave the **SELECT REDIRECT URL** field blank.
    * Check the following boxes under **SCOPES**:
        * Send Messages
        * Manage Embeds
        * Embed Links
        * Read Message History
        * View Channels
    * Click the **Copy** button at the bottom of the **SCOPES** form.

2. Open the copied link in a browser and add the bot to your Discord server.

### Interact with the Bot

Build and run the application and then type `!ping` in the Discord server. The Bot should reply with `pong`.
