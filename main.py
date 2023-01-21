import discord
from discord.ext import commands
from commands import Commands
import misogynyModel
import cohere

intents = discord.Intents.all()
# client = commands.Bot()

client = commands.Bot(command_prefix = '+', intents= intents)

client.add_cog(Commands(client))

# TODO: learn about cogs 

@client.event 
async def on_ready():
    print("The bot is now ready for use.")
    print("-----------------------------")

@client.event
async def on_message(message):
    isTrue, confidence = misogynyModel.classifyMessage(message.content)
    await message.general.send(isTrue, confidence)

@client.command()
async def hello(ctx):
    print("received message")
    await ctx.send("hola")

with open("token.txt", "r", encoding="utf-8") as f:
    bottoken1 = f.read()

client.run(bottoken1)


