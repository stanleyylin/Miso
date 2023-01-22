import discord
from discord.ext import commands
from commands import Commands
import misogynyModel
import cohere

intents = discord.Intents.all()
# client = commands.Bot()

client = discord.Client(intents= intents)

client = commands.Bot(command_prefix = '+', intents= intents)

# TODO: learn about cogs 

@client.event 
async def on_ready():
    print("The bot is now ready for use.")
    print("-----------------------------")

@client.event
async def on_message(message):
    if message.author.bot:
        return
    problemList = misogynyModel.classifyMessage(message.content)
    await message.channel.send(str(problemList[0]) + ", " + str(problemList[1]) + "%")
    await message.channel.send(str(problemList[2]) + ", " + str(problemList[3]) + "%")

@client.command()
async def hello(ctx):
    print("received message")
    await ctx.send("hola")

with open("token.txt", "r", encoding="utf-8") as f:
    bottoken1 = f.read()

client.run(bottoken1)