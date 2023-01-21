import discord
from discord.ext import commands

intents = discord.Intents().all()

client = commands.Bot(command_prefix = "+", intents=intents)

@client.event
async def on_message(message):
    if message.content.startswith("+hello"):
        await message.channel.send("hi")

client.run("MTA2NjI0MDk4MDI0NTgxMTIwMQ.Gmf1Le.RfbZ_ujG6qt5NUbmUvhziuuxFFg7VD_oT9zATg")