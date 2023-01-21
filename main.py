import discord
from discord.ext import commands
from commands import Commands

intents = discord.Intents.all()
TOKEN = "MTA2NjI0MDk4MDI0NTgxMTIwMQ.Gmf1Le.RfbZ_ujG6qt5NUbmUvhziuuxFFg7VD_oT9zATg"
# client = commands.Bot()

client = commands.Bot(command_prefix = '+', intents= intents)

client.add_cog(Commands(client))

# TODO: learn about cogs 

@client.event 
async def on_ready():
    print("The bot is now ready for use.")
    print("-----------------------------")

@client.command()
async def hello(ctx):
    print("received message")
    await ctx.send("hola")

client.run(TOKEN)


